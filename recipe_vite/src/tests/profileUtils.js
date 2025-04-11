export const addItemToList = (list, item) => {
    if (!item.trim()) return list;
    return [...list, item];
  };
  
  export const removeItemFromList = (list, index) => {
    return list.filter((_, i) => i !== index);
  };
  