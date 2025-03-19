import { useState, useEffect } from 'react';
import axios from 'axios';
import './pantry.css';

const Pantry = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    fetchPantryItems();
  }, []);

  const fetchPantryItems = async () => {
    try {
      const response = await axios.get('/api/ai/pantry');
      if (response.data.success) {
        setItems(response.data.data);
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
        setItems(response.data.data);
        setNewItem('');
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
      }
    } catch (error) {
      console.error('Error removing pantry item:', error);
    }
  };

  return (
    <div className="pantry-container">
      <h2>My Pantry</h2>
      
      <form onSubmit={handleAddItem} className="add-item-form">
        <input 
          type="text" 
          value={newItem} 
          onChange={(e) => setNewItem(e.target.value)} 
          placeholder="Add an ingredient..."
        />
        <button type="submit">Add</button>
      </form>
      
      <div className="pantry-items">
        <h3>Current Ingredients:</h3>
        {items.length === 0 ? (
          <p>No ingredients added yet.</p>
        ) : (
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                {item}
                <button onClick={() => handleRemoveItem(index)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Pantry;
