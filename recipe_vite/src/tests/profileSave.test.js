import { saveProfile } from "./profileSave";

describe("saveProfile", () => {
  test("logs the correct profile object", () => {
    const profile = {
      name: "Test User",
      expertise: "Intermediate",
      dietaryRestrictions: ["Vegetarian"],
      favoriteMeals: ["Tofu Stir Fry"]
    };

    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    
    const result = saveProfile(profile);
    
    expect(consoleSpy).toHaveBeenCalledWith("Saving profile:", profile);
    expect(result).toEqual(profile);

    consoleSpy.mockRestore();
  });
});
