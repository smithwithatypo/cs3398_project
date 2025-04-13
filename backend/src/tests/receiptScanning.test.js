// First, mock OpenAI before importing anything else
import { vi, describe, test, expect, beforeEach } from 'vitest';

// Mock OpenAI module
vi.mock('openai', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      chat: {
        completions: {
          create: vi.fn().mockResolvedValue({
            choices: [
              {
                message: {
                  content: '{"foodItems": ["apples", "milk", "bread"]}'
                }
              }
            ]
          })
        }
      }
    }))
  };
});

// Now import the rest
import { ReceiptScanningService } from '../src/services/receiptScanningService.js';
import { ReceiptScanningController } from '../src/controllers/receiptScanningController.js';

// Only testing the controller
describe("Receipt Scanning Controller", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("returns food items after successful scanning", async () => {
    // Mock request with file
    const req = { 
      file: {
        originalname: 'receipt.jpg',
        buffer: Buffer.from('sample-image-data')
      }
    };
    
    // Mock response object
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };
    
    // Mock the service to return food items
    vi.spyOn(ReceiptScanningService, 'extractFoodItemsFromReceipt')
      .mockResolvedValue(["apples", "milk", "bread"]);
    
    // Call the controller
    await ReceiptScanningController.scanReceipt(req, res);
    
    // Verify the response
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: ["apples", "milk", "bread"]
    });
  });

  test("returns error when no image file is provided", async () => {
    // Mock request with no file
    const req = { file: null };
    
    // Mock response object
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };
    
    // Call the controller
    await ReceiptScanningController.scanReceipt(req, res);
    
    // Verify the response
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: "No image file provided"
    });
  });

  test("handles service errors appropriately", async () => {
    // Mock request with file
    const req = { 
      file: {
        originalname: 'receipt.jpg',
        buffer: Buffer.from('sample-image-data')
      }
    };
    
    // Mock response object
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };
    
    // Mock the service to throw a specific error
    vi.spyOn(ReceiptScanningService, 'extractFoodItemsFromReceipt')
      .mockRejectedValue(new Error("Could not find any food items"));
    
    // Call the controller
    await ReceiptScanningController.scanReceipt(req, res);
    
    // Verify the response
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: "No food items were detected in this receipt. Try another image or add items manually."
    });
  });
});