import { useState } from "react";
const Pantry = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    if (newItem.trim() !== "") {
      setItems([...items, newItem]);
      setNewItem("");
    }
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return(
    <div>
      <h2>Pantry</h2>
          <p>Add and manage your pantry items to generate recipes based on what you have.</p>
      <h3>Pantry Inventory</h3>
      <div>
        <input
          type="text"
          placeholder="Enter item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)} />
        <button onClick={addItem}>Add Item</button>
        </div>
        <div>
            {items.length === 0 ? (
              <p>No items in the pantry.</p>
            ) : (
              items.map((item, index) => (
                <div key={index}>
                  <button onClick={() => removeItem(index)}>X</button>
                  <span>{item}</span>
                </div>
              ))
            )}
          </div>
    </div>
  );
};

export default Pantry;