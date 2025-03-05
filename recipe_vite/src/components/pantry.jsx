import { useState } from "react";

const Pantry = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.trim() !== "") {
      try {
        const response = await fetch("/api/pantry", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ item: newItem }),
        });
        if (!response.ok) {
          setItems([...items, newItem]);
          setNewItem("");
        } else {
          console.error("Failed to add item");
        }
      } catch (error) {
        console.error("Error adding item:", error);
      }
    }
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col items-center justify-center p-10">
      <div className="flex flex-col items-center gap-8">
        
        {/* How it Works */}
        <div className="bg-how-it-works-bg p-6 max-w-sm text-left rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">Your Pantry</h2>
          <h4 className="text-lg font-semibold mb-2">How it works:</h4>
          <p className="text-base text-gray-800">
            Update your pantry by adding or removing items to generate personalized recipes just for you!
          </p>
        </div>

        {/* Pantry Inventory */}
        <div className="bg-recipe-card-bg p-5 w-80 rounded-lg shadow-md text-left">
          <h3 className="text-lg font-bold mb-4">Pantry Inventory</h3>

          {/* Form */}
          <form className="flex gap-2 mb-4" onSubmit={addItem}>
            <input
              type="text"
              placeholder="Enter item"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              required
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="bg-button-bg hover:bg-button-hover text-white text-sm px-4 py-2 rounded-md"
            >
              Save Pantry
            </button>
          </form>

          {/* Pantry Items */}
          <div className="bg-white p-3 rounded-md shadow">
            {items.length === 0 ? (
              <p className="text-gray-600">No items currently in pantry.</p>
            ) : (
              items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-start gap-3 py-2 border-b border-gray-300"
                >
                  <button
                    onClick={() => removeItem(index)}
                    className="bg-red-500 hover:bg-red-700 text-white text-xs px-2 py-1 rounded-md"
                  >
                    X
                  </button>
                  <span className="text-sm">{item}</span>
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
