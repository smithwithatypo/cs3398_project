import { describe, test, expect, vi } from "vitest";

// Mock the whole recipeService module
vi.mock("./recipeService.js", () => ({
    generateRecipeFromText: vi.fn(() =>
      Promise.resolve("Here's a recipe for Tofu Stir Fry with garlic and ginger.")
    ),
  }));  

import { generateRecipeFromText } from "./recipeService.js";

describe("generateRecipeFromText", () => {
  test("returns a recipe string based on a text prompt", async () => {
    const systemPrompt = "You are a chef.";
    const prompt = "Make a tofu stir fry";

    const result = await generateRecipeFromText(systemPrompt, prompt);

    expect(result).toContain("Tofu Stir Fry");
  });
});
