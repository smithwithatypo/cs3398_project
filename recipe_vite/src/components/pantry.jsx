import { useState, useEffect } from 'react';
import axios from 'axios';

const Pantry = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [newQuantity, setNewQuantity] = useState(1);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    fetchPantryItems();
  }, []);

  const fetchPantryItems = async () => {
    try {
      const response = await axios.get('/api/ai/pantry');
      if (response.data.success) {
        setItems(response.data.data);
        const initialQuantities = {};
        response.data.data.forEach((item, index) => {
          // keeps existing quantities if there, otherwise defaults to 1
          initialQuantities[index] = quantities[index] || 1;
        });
        setQuantities(initialQuantities);
      }
    } catch (error) {
      console.error('Error fetching pantry items:', error);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;

    try {
      const response = await axios.post('/api/ai/pantry', { item: newItem });
      if (response.data.success) {
        const updatedItems = response.data.data;
        setItems(response.data.data);
        setQuantities(prev => ({
          ...prev,
          [updatedItems.length - 1]: newQuantity
        }));
        setNewItem('');
        setNewQuantity(1);
      }
    } catch (error) {
      console.error('Error adding pantry item:', error);
    }
  };

  const handleRemoveItem = async (index) => {
    try {
      const response = await axios.delete(`/api/ai/pantry/${index}`);
      if (response.data.success) {
        setItems(response.data.data);
        const newQuantities = {};
        Object.entries(quantities).forEach(([idx, qty]) => {
          const numIdx = parseInt(idx);
          if (numIdx < index) {
            newQuantities[numIdx] = qty;
          } else if (numIdx > index) {
            newQuantities[numIdx - 1] = qty;
          }
        });
        setQuantities(newQuantities);
      }
    } catch (error) {
      console.error('Error removing pantry item:', error);
    }
  };

  const handleQuantityChange = (index, newValue) => {
    // Update quantity locally (not sent to backend)
    setQuantities(prev => ({
      ...prev,
      [index]: Math.max(1, parseInt(newValue) || 1)
    }));
  };

  return (
    <div className="min-h-screen bg-[#f5f5dc] flex flex-col items-center p-8">
      {/* Page Header */}
      <div className="bg-[#d9b75e] shadow-md rounded-lg p-6 w-full max-w-lg text-center">
        <h2 className="text-2xl font-bold mb-4 text-[#1e2d3d]">My Pantry</h2>
        <p className="text-[#1e2d3d]">Add or remove ingredients to keep your pantry updated.</p>
      </div>

      {/* Input Section */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg mt-6">
        <form onSubmit={handleAddItem} className="flex gap-3">
          <input
            type="text"
            placeholder="Enter an ingredient..."
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e2d3d]"
          />
          <div className="flex items-center">
            <div className="inline-flex shadow-sm rounded-md overflow-hidden">
              <button 
                type="button"
                onClick={() => setNewQuantity(prev => Math.max(1, prev - 1))}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-2 focus:outline-none transition-colors"
              >
                <span className="font-medium">-</span>
              </button>
              <div className="px-2 py-2 text-center bg-white border-y border-gray-300 w-10 flex items-center justify-center">
                <span className="font-medium text-gray-700">{newQuantity}</span>
              </div>
              <button 
                type="button"
                onClick={() => setNewQuantity(prev => prev + 1)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-2 focus:outline-none transition-colors"
              >
                <span className="font-medium">+</span>
              </button>
            </div>
          </div>
          <button type="submit" className="bg-[#1e2d3d] hover:bg-[#16232e] text-white font-bold py-2 px-4 rounded-md transition-colors">
            Add
          </button>
        </form>
      </div>

      {/* Pantry Items List */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg mt-6">
        <h3 className="text-lg font-semibold mb-2 text-[#1e2d3d]">Current Ingredients</h3>
        {items.length === 0 ? (
          <p className="text-gray-500">No ingredients added yet.</p>
        ) : (
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-[#d0ded5] border border-gray-300 px-4 py-3 rounded-md shadow-sm"
              >
                <div className="flex items-center">
                  <span className="text-[#1e2d3d] font-medium">{item}</span>
                  
                  <div className="ml-4 inline-flex shadow-sm rounded-md overflow-hidden">
                    <button 
                      type="button"
                      onClick={() => handleQuantityChange(index, quantities[index] - 1)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 focus:outline-none transition-colors text-sm"
                    >
                      -
                    </button>
                    <div className="px-2 py-1 text-center bg-white border-y border-gray-300 w-8 flex items-center justify-center">
                      <span className="font-medium text-gray-700 text-sm">{quantities[index] || 1}</span>
                    </div>
                    <button 
                      type="button"
                      onClick={() => handleQuantityChange(index, quantities[index] + 1)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 focus:outline-none transition-colors text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(index)}
                  className="bg-[#1e2d3d] hover:bg-[#16232e] text-white font-bold py-1 px-3 rounded-md text-sm transition-colors"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Pantry;
