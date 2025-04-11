import axios from "axios";

export const generateRecipeFromText = async (textPrompt) => {
  const response = await axios.post("/api/ai/generate-recipe-text", {
    textPrompt,
  });
  return response.data;
};
