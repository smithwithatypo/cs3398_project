//const PantryController = require("../services/pantryItemsService");

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
        // POST
    },
    async removePantryItem(req, res){
        // DELETE
    },
}

export {PantryController}; 
