import { Pinecone, PineconeRecord } from "@pinecone-database/pinecone";
import { downloadFromS3 } from "./s3-server";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import {
  Document,
  RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter";

import md5 from "md5";
import { convertToASCII } from "./utils";
import { getEmbedding } from "./embeddings";
let pinecone: Pinecone | null = null;

export const getPinecone = async () => {
  if (!pinecone) {
    pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
      environment: process.env.PINECONE_ENVIRONMENT!,
    });
  }

  return pinecone;
};

type PDFpage = {
  metadata: {
    loc: {
      pageNumber: number;
    };
  };
  pageContent: string;
};

export async function loadS3IntoPinecone(fileKey: string) {
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
  const namespace = convertToASCII(fileKey);
  const vectors = await Promise.all(
    docs.flat().map((doc) => embedDoc(doc, namespace)),
  );
  console.log("Loaded vectors", vectors);
  const client = await getPinecone();
  const pineconeIndex = client.index("alpaca");

  console.log("Uploading to Pinecone...");

  await pineconeIndex.upsert(vectors).catch((e) => {
    console.error(e);
  });
  console.log("Uploaded to Pinecone");
  return docs[0];
}

async function embedDoc(doc: Document, namespace: string) {
  try {
    const embedding = await getEmbedding(doc.pageContent);
    const hash = md5(doc.pageContent);
    return {
      id: hash,
      values: embedding,
      metadata: {
        text: doc.metadata.text,
        pageNumber: doc.metadata.pageNumber,
        __filename: namespace,
      },
    } as PineconeRecord;
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
    new Document({
      pageContent,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        text: truncateStringByBytes(pageContent, 36000),
      },
    }),
  ]);
  return docs;
}
