import pantryService from '../services/pantryItemsService.js';

const PantryController = {
    async getPantryItems(req, res){
        try {
            const items = await pantryService.getAllItems();
            res.status(200).json({ success: true, data: items });
        } catch (error) {
            console.error('Error in getPantryItems:', error);
            res.status(500).json({ success: false, error: "Failed to fetch pantry items." });
        }
    },
    async addPantryItem(req, res) {
        try {
            const { item } = req.body;
            if (!item) {
                return res.status(400).json({ success: false, error: "Item name is required" });
            }
            const items = await pantryService.addItem(item);
            res.status(200).json({ success: true, data: items });
        } catch (error) {
            console.error('Error in addPantryItem:', error);
            res.status(500).json({ success: false, error: "Failed to add pantry item." });
        }
    },
    async removePantryItem(req, res){
        // DELETE
    },
}

export {PantryController}; 
