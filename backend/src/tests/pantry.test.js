import { describe, test, expect, vi, beforeEach } from 'vitest';
import { pantryService } from '../services/pantryItemsService.js';

describe("Pantry Service", () => {
  beforeEach(async () => {
    const items = await pantryService.getAllItems();
    for (let i = items.length - 1; i >= 0; i--) {
      await pantryService.removeItem(i);
    }
  });
});
