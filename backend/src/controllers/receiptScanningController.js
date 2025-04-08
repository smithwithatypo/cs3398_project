import { ReceiptScanningService } from '../services/receiptScanningService.js';
import multer from 'multer';

// Set up multer for memory storage (files won't be saved to disk)
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB max file size
    },
    fileFilter: (req, file, cb) => {
        // Accept only image files
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'), false);
        }
    }
});

const ReceiptScanningController = {
    // Middleware for file upload
    uploadMiddleware: upload.single('image'),
    
    // Controller method to handle receipt scanning
    async scanReceipt(req, res) {
        try {
            // Check if file exists
            if (!req.file) {
                return res.status(400).json({ 
                    success: false, 
                    error: "No image file provided" 
                });
            }
            
            console.log("Processing receipt image...");
            
            try {
                // Process the image using the service
                const foodItems = await ReceiptScanningService.extractFoodItemsFromReceipt(req.file);
                
                console.log("Receipt scanning successful");
                console.log("Food items extracted:", foodItems);
                
                // Return the extracted food items
                return res.status(200).json({ 
                    success: true, 
                    data: foodItems 
                });
            } catch (serviceError) {
                console.error('Error in ReceiptScanningService:', serviceError);
                // Return a more specific error message based on the error
                let errorMessage = "Failed to process receipt image with AI service.";
                
                if (serviceError.message.includes('Invalid response format')) {
                    errorMessage = "Unable to recognize food items in the receipt. Please try a clearer image or add items manually.";
                } else if (serviceError.message.includes('Could not find any food items')) {
                    errorMessage = "No food items were detected in this receipt. Try another image or add items manually.";
                }
                
                return res.status(500).json({ 
                    success: false, 
                    error: errorMessage 
                });
            }
        } catch (error) {
            console.error('Error in ReceiptScanningController:', error);
            return res.status(500).json({ 
                success: false, 
                error: "Failed to scan receipt image." 
            });
        }
    }
};

export { ReceiptScanningController };