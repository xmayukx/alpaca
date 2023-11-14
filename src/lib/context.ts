import { Pinecone } from "@pinecone-database/pinecone";
import { convertToASCII } from "./utils";
import { getEmbedding } from "./embeddings";

export async function getMatchFromEmbedding(
  embeddings: number[],
  fileKey: string,
) {
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
    environment: process.env.PINECONE_ENVIRONMENT!,
  });
  const index = await pinecone.index("alpaca");

  try {
    const namespace = convertToASCII(fileKey);
    const queryResult = await index.query({
      topK: 3,
      vector: embeddings,
      includeMetadata: true,
      includeValues: true,
    });
    console.log("queryResult: ", queryResult);
    return queryResult.matches || [];
  } catch (error) {
    console.log("error querying embeddings", error);
    throw error;
  }
}
export async function getContext(query: string, namespace: string) {
  const queryEmbedding = await getEmbedding(query);
  const matches = await getMatchFromEmbedding(queryEmbedding, namespace);
  const qualifyDocs = matches.filter(
    (match) => match.score && match.score > 0.7,
  );
  console.log("qualifyDocs: ", qualifyDocs);
  type Metadata = {
    text: string;
    pageNumber: number;
    __filename: string;
  };

  let docs = qualifyDocs.map((match) => (match.metadata as Metadata).text);
  console.log("docs: ", docs);
  return docs.join("\n").substring(0, 3000);
}
