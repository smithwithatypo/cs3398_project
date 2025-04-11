import { addItemToList, removeItemFromList } from "./profileUtils";

describe("Profile list management", () => {
  test("adds a new item to the list", () => {
    const current = ["Tofu"];
    const result = addItemToList(current, "Mushrooms");
    expect(result).toEqual(["Tofu", "Mushrooms"]);
  });

  test("ignores empty or whitespace-only input", () => {
    const current = ["Lentils"];
    const result = addItemToList(current, "   ");
    expect(result).toEqual(["Lentils"]);
  });

  test("removes an item by index", () => {
    const current = ["Eggs", "Spinach", "Cheese"];
    const result = removeItemFromList(current, 1);
    expect(result).toEqual(["Eggs", "Cheese"]);
  });
});
