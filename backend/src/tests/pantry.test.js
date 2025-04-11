import { describe, test, expect, vi, beforeEach } from 'vitest';
import pantryService from "../services/pantryItemsService.js";
import { PantryController } from '../controllers/pantryItemsController.js';

describe("Pantry Service", () => {
  beforeEach(async () => {
    const items = await pantryService.getAllItems();
    for (let i = items.length - 1; i >= 0; i--) {
      await pantryService.removeItem(i);
    }
  });

  test("adds an item to the pantry list", async () => {
    const result = await pantryService.addItem("Cereal");
    expect(result).toEqual(["Cereal"]);
  });

  test("removes an item by index", async () => {
    await pantryService.addItem("Apple");
    await pantryService.addItem("Blueberries");
    const result = await pantryService.removeItem(0);
    expect(result).toEqual(["Blueberries"]);
  });

});

describe("Pantry Controller", () => {
    test("responds with pantry list after adding item", async () => {
      const req = { body: { item: "Bread" } };
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };
    });
  });
  