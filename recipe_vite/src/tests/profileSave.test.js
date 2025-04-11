import { saveProfile } from "./profileSave";

describe("saveProfile", () => {
  test("logs the correct profile object", () => {
    const profile = {
      name: "Taylor",
      expertiseLevel: "Intermediate Cook",
      dietaryRestrictions: ["Gluten-Free"],
      favoritedMeals: ["Chili"],
    };

    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    const result = saveProfile(profile);

    expect(consoleSpy).toHaveBeenCalledWith("Saved profile data:", profile);
    expect(result).toBe(true);

    consoleSpy.mockRestore();
  });
});
