import { DishIdentificationService } from '../services/dishIdentificationService.js';
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

const DishIdentificationController = {
    // Middleware for file upload
    uploadMiddleware: upload.single('image'),
    
    // Controller method to handle dish identification
    async identifyDish(req, res) {
        try {
            // Check if file exists
            if (!req.file) {
                return res.status(400).json({ 
                    success: false, 
                    error: "No image file provided" 
                });
            }
            
            console.log("Processing image for dish identification...");
            
            try {
                // Process the image using the service
                const result = await DishIdentificationService.identifyDishFromImage(req.file);
                
                console.log("Dish identification successful");
                console.log("Result:", result.substring(0, 100) + "..."); // Log just the beginning
                
                // Return the identification result
                return res.status(200).json({ 
                    success: true, 
                    data: result 
                });
            } catch (serviceError) {
                console.error('Error in DishIdentificationService:', serviceError);
                return res.status(500).json({ 
                    success: false, 
                    error: "Failed to process image with AI service." 
                });
            }
        } catch (error) {
            console.error('Error in DishIdentificationController:', error);
            return res.status(500).json({ 
                success: false, 
                error: "Failed to identify dish from image." 
            });
        }
    }
};

export { DishIdentificationController };