import { OpenAIApi, Configuration } from "openai-edge";

export const runtime = "edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export const openai = new OpenAIApi(config);

export async function getEmbedding(text: string) {
  try {
    const response = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: text.replace(/\n/g, " "),
    });
    const result = await response.json();
    console.log(result);
    return result.data[0].embedding as number[];
  } catch (error) {
    console.log(error);
    throw new Error("Error in getEmbedding");
  }
}
