import { useState } from "react";
import "./pantry.css"; 

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
        <div className="how-it-works">
          <h2> Your Pantry</h2>
          <h4> How it works: </h4>
          <p> Update your pantry by adding or removing items to generate personalized recipes just for you!</p>
        </div>
        <div className="recipe-card">
          <h3>Pantry Inventory </h3>
          <form className="input-container">
            <input
              type="text"
              placeholder="Enter item"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
            />
            <button className="start-button" type = "submit"> Save Pantry</button>
          </form>
          <div className="pantry-items">
            {items.length === 0 ? (
              <p> No items currently in pantry.</p>
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
