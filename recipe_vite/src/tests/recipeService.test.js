import axios from "axios";
import { generateRecipeFromText } from "./recipeService";

jest.mock("axios");

describe("generateRecipeFromText", () => {
  test("returns recipe string on success", async () => {
    const mockResponse = {
      data: {
        success: true,
        data: "# Grilled Cheese\n\n## Ingredients\n- Bread\n- Cheese\n\n## Instructions\n1. Toast it!",
      },
    };

    axios.post.mockResolvedValueOnce(mockResponse);

    const result = await generateRecipeFromText("Grilled cheese sandwich");
    expect(result.success).toBe(true);
    expect(result.data).toContain("# Grilled Cheese");
  });

  test("throws or returns error on failure", async () => {
    axios.post.mockRejectedValueOnce(new Error("Network error"));

    await expect(generateRecipeFromText("Grilled cheese")).rejects.toThrow("Network error");
  });
});
