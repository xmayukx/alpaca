import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HF_TOKEN);

const getHfEmbedding = async (text: string) => {
  try {
    const response = await hf.featureExtraction({
      model: "sentence-transformers/all-MiniLM-L6-v2",
      inputs: text.replace(/\n/g, " "),
    });
    console.log(response);
    return response as number[];
  } catch (error) {
    console.log(error);
    throw new Error("Error in getHfEmbedding");
  }
};

export default getHfEmbedding;
