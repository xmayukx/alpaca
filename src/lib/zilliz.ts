import { MilvusClient } from "@zilliz/milvus2-sdk-node";
import { downloadFromS3 } from "./s3-server";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { Pinecone, PineconeRecord } from "@pinecone-database/pinecone";
import {
  Document,
  RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter";
import { convertToASCII } from "./utils";
import { getEmbedding } from "./embeddings";
import md5 from "md5";

export const getZilliz = async () => {
  const address = process.env.ZILLIZ_API_URL!;
  const token = process.env.ZILLIZ_API_KEY;

  const client = new MilvusClient({ address, token });
  return client;
};

type PDFpage = {
  metadata: {
    loc: {
      pageNumber: number;
    };
  };
  pageContent: string;
};

export async function loadS3IntoZilliz(fileKey: string) {
  console.log("Loading S3 into file system");
  if (!fileKey) {
    throw new Error("fileKey is not defined");
  }
  const fileName = await downloadFromS3(fileKey);
  if (!fileName) {
    throw new Error("could not download from s3");
  }
  console.log("Loading PDF...");
  const loader = new PDFLoader(fileName);
  const pages = (await loader.load()) as PDFpage[];
  console.log("Loaded PDF");
  const docs = await Promise.all(pages.map(prepareDoc));
  console.log("Loaded docs", docs);
  const vectors = await Promise.all(docs.flat().map(embedDoc));
  console.log("Loaded vectors", vectors);
  const namespace = convertToASCII(fileKey);
  const client = await getZilliz();
  console.log("Uploading to Zilliz...");
  const isUploaded = await client.insert({
    collection_name: namespace,
    data: vectors,
  });
  if (isUploaded.status.error_code === "Success") {
    console.log("Uploaded to Zilliz");
    return docs[0];
  } else {
    console.log("Failed to upload to Zilliz");
    return null;
  }
}

async function embedDoc(doc: Document) {
  try {
    const embedding = await getEmbedding(doc.pageContent);
    const hash = md5(doc.pageContent);

    return {
      id: hash,
      values: embedding,
      metadata: {
        text: doc.metadata.text,
        pageNumber: doc.metadata.pageNumber,
      },
    };
  } catch (error) {
    console.error(error);
    throw new Error("Could not embed doc ");
  }
}

export const truncateStringByBytes = (str: string, bytes: number) => {
  const enc = new TextEncoder();
  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
};

async function prepareDoc(page: PDFpage) {
  let { pageContent, metadata } = page;
  pageContent = pageContent.replace(/\n/g, "");
  const splitter = new RecursiveCharacterTextSplitter();
  const docs = await splitter.splitDocuments([
    {
      pageContent,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        text: truncateStringByBytes(pageContent, 36000),
      },
    },
  ]);
  return docs;
}
