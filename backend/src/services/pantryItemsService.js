let pantryItems = [];

const getAllItems = async () => pantryItems;

const addItem = async (item) => {
    pantryItems.push(item);
    return pantryItems;
};

const removeItem = async (index) => {
    if (index >= 0 && index < pantryItems.length) {
        pantryItems.splice(index, 1);
    }
    return pantryItems;
};

export default { getAllItems, addItem, removeItem};