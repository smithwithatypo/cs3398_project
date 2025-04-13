import { PantryScanningService } from '../services/pantryScanningService.js';
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

const PantryScanningController = {
    // Middleware for file upload
    uploadMiddleware: upload.single('image'),
    
    // Controller method to handle pantry scanning
    async scanPantry(req, res) {
        try {
            // Check if file exists
            if (!req.file) {
                return res.status(400).json({ 
                    success: false, 
                    error: "No image file provided" 
                });
            }
            
            console.log("Processing pantry image...");
            
            try {
                // Process the image using the service
                const foodItems = await PantryScanningService.identifyFoodItemsInPantry(req.file);
                
                console.log("Pantry scanning successful");
                console.log("Food items identified:", foodItems);
                
                // Return the identified food items
                return res.status(200).json({ 
                    success: true, 
                    data: foodItems 
                });
            } catch (serviceError) {
                console.error('Error in PantryScanningService:', serviceError);
                // Return a more specific error message based on the error
                let errorMessage = "Failed to process pantry image with AI service.";
                
                if (serviceError.message.includes('Invalid response format')) {
                    errorMessage = "Unable to recognize food items in your pantry. Please try a clearer image or add items manually.";
                } else if (serviceError.message.includes('Could not find any food items')) {
                    errorMessage = "No food items were detected in this image. Try another photo with better lighting or add items manually.";
                }
                
                return res.status(500).json({ 
                    success: false, 
                    error: errorMessage 
                });
            }
        } catch (error) {
            console.error('Error in PantryScanningController:', error);
            return res.status(500).json({ 
                success: false, 
                error: "Failed to scan pantry image." 
            });
        }
    }
};

export { PantryScanningController };