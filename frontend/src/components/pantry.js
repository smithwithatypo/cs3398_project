import { useState } from "react";
import "./pantry.css"; // Import the CSS file

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

  return (
    <div className="home-container">
      <div className="pantry-layout">
        {/* How It Works Section */}
        <div className="how-it-works">
          <h2> Your Pantry</h2>
          <h4> How it works: </h4>
          <p>Add and manage your pantry items to generate recipes based on what you have.</p>
        </div>

        {/* Pantry Inventory Section */}
        <div className="recipe-card">
          <h3>Pantry Inventory</h3>
          <div className="input-container">
            <input
              type="text"
              placeholder="Enter item"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
            />
            <button className="start-button" onClick={addItem}>Add Item</button>
          </div>

          {/* Pantry Items List */}
          <div className="pantry-items">
            {items.length === 0 ? (
              <p>No items in the pantry.</p>
            ) : (
              items.map((item, index) => (
                <div key={index} className="pantry-item">
                  <button className="remove-button" onClick={() => removeItem(index)}>X</button>
                  <span>{item}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pantry;
