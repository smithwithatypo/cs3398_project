let pantryItems = [];

const getAllItems = async () => pantryItems;

const addItem = async (item) => {
    pantryItems.push(item);
    return pantryItems;
};