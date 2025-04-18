import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './pantry.css'; // Make sure this includes .fade-in styles

const Pantry = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [newQuantity, setNewQuantity] = useState(1);
  const [quantities, setQuantities] = useState(() => {
    const saved = localStorage.getItem('quantities');
    return saved ? JSON.parse(saved) : {};
  });

  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState('');
  const [extractedItems, setExtractedItems] = useState([]);
  const [showExtractedItems, setShowExtractedItems] = useState(false);
  const [activeScanner, setActiveScanner] = useState('');

  const receiptFileInputRef = useRef(null);
  const pantryFileInputRef = useRef(null);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [selectedPantryImage, setSelectedPantryImage] = useState(null);

  useEffect(() => {
    fetchPantryItems();
  }, []);

  useEffect(() => {
    localStorage.setItem('quantities', JSON.stringify(quantities));
  }, [quantities]);

  const fetchPantryItems = async () => {
    try {
      const response = await axios.get('/api/ai/pantry');
      if (response.data.success) {
        setItems(response.data.data);
        const newQuantities = {};
        response.data.data.forEach((item, index) => {
          newQuantities[index] = quantities[index] || 1;
        });
        setQuantities(newQuantities);
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
        setItems(updatedItems);
        setQuantities(prev => ({ ...prev, [updatedItems.length - 1]: newQuantity }));
        setNewItem('');
        setNewQuantity(1);
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleRemoveItem = async (index) => {
    try {
      const response = await axios.delete(`/api/ai/pantry/${index}`);
      if (response.data.success) {
        setItems(response.data.data);
        const newQuantities = {};
        Object.entries(quantities).forEach(([idx, qty]) => {
          const i = parseInt(idx);
          if (i < index) newQuantities[i] = qty;
          else if (i > index) newQuantities[i - 1] = qty;
        });
        setQuantities(newQuantities);
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleQuantityChange = (index, val) => {
    if (val < 1) handleRemoveItem(index);
    else setQuantities(prev => ({ ...prev, [index]: val }));
  };

  const handleFileChange = (event, type) => {
    const file = event.target.files[0];
    setScanError('');
    setExtractedItems([]);
    setShowExtractedItems(false);
    setActiveScanner(type);
    if (type === 'receipt') {
      setSelectedReceipt(file);
      setSelectedPantryImage(null);
    } else {
      setSelectedPantryImage(file);
      setSelectedReceipt(null);
    }
  };

  const handleScan = async (type) => {
    const file = type === 'receipt' ? selectedReceipt : selectedPantryImage;
    const endpoint = type === 'receipt' ? "/api/ai/scan-receipt" : "/api/ai/scan-pantry";

    if (!file) {
      setScanError("Please select an image first");
      return;
    }

    setIsScanning(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        const itemsFound = res.data.data;
        if (itemsFound.length > 0) {
          setExtractedItems(itemsFound);
          setShowExtractedItems(true);
        } else {
          setScanError("No items found. Try a clearer photo.");
        }
      } else {
        setScanError(res.data.error || "Failed to scan image");
      }
    } catch (err) {
      console.error(err);
      setScanError(err.response?.data?.error || "Something went wrong.");
    }

    setIsScanning(false);
  };

  const handleAddExtractedItems = async () => {
    try {
      for (const item of extractedItems) {
        await axios.post('/api/ai/pantry', { item });
      }
      await fetchPantryItems();
      resetScan();
    } catch (err) {
      console.error("Error adding items:", err);
    }
  };

  const resetScan = () => {
    setSelectedPantryImage(null);
    setSelectedReceipt(null);
    setExtractedItems([]);
    setShowExtractedItems(false);
    setScanError('');
    setActiveScanner('');
    if (receiptFileInputRef.current) receiptFileInputRef.current.value = "";
    if (pantryFileInputRef.current) pantryFileInputRef.current.value = "";
  };

  return (
    <div className="fade-in min-h-screen bg-[#f5f5dc] flex flex-col items-center p-8">
      <div className="bg-[#d9b75e] rounded-lg p-6 w-full max-w-lg text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-2xl font-bold mb-4 text-[#1e2d3d]">My Pantry</h2>
        <p className="text-[#1e2d3d]">Add or scan ingredients into your pantry.</p>
      </div>

      <form onSubmit={handleAddItem} className="bg-white rounded-lg shadow-md p-6 w-full max-w-lg mt-6 flex gap-3 hover:shadow-xl transition-shadow duration-300">
        <input
          type="text"
          placeholder="Ingredient"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e2d3d]"
        />
        <button
          type="submit"
          className="bg-[#1e2d3d] hover:bg-[#16232e] text-white font-bold py-2 px-4 rounded-md"
        >
          Add
        </button>
      </form>

      <div className="bg-[#d0ded5] rounded-lg p-6 w-full max-w-lg mt-6 text-center shadow-md hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-2xl font-bold text-[#1e2d3d]">Scan Ingredients</h2>
        <p className="text-[#1e2d3d] mb-4">Upload a receipt or pantry image.</p>
        <div className="flex gap-4 justify-center mb-4">
          <button
            onClick={() => setActiveScanner("receipt")}
            className={`px-4 py-2 rounded-md ${activeScanner === "receipt" ? "bg-[#1e2d3d] text-white" : "bg-white text-[#1e2d3d] border"}`}
          >
            Scan Receipt
          </button>
          <button
            onClick={() => setActiveScanner("pantry")}
            className={`px-4 py-2 rounded-md ${activeScanner === "pantry" ? "bg-[#1e2d3d] text-white" : "bg-white text-[#1e2d3d] border"}`}
          >
            Scan Pantry
          </button>
        </div>

        {activeScanner && (
          <>
            <input
              type="file"
              accept="image/*"
              ref={activeScanner === "receipt" ? receiptFileInputRef : pantryFileInputRef}
              onChange={(e) => handleFileChange(e, activeScanner)}
              className="mb-2"
            />
            <button
              onClick={() => handleScan(activeScanner)}
              disabled={isScanning}
              className={`bg-[#1e2d3d] text-white py-2 px-4 rounded-md ${isScanning ? "opacity-50 cursor-not-allowed" : "hover:bg-[#16232e]"}`}
            >
              {isScanning ? "Scanning..." : "Scan Image"}
            </button>
          </>
        )}

        {scanError && <p className="mt-2 text-red-500">{scanError}</p>}

        {showExtractedItems && (
          <div className="mt-4 bg-white p-4 rounded-md shadow">
            <h4 className="font-semibold text-[#1e2d3d] mb-2">Found Items:</h4>
            <ul className="text-left list-disc pl-4 mb-4">
              {extractedItems.map((item, i) => (
                <li key={i} className="text-[#1e2d3d]">{item}</li>
              ))}
            </ul>
            <button
              onClick={handleAddExtractedItems}
              className="bg-[#1e2d3d] text-white py-2 px-4 rounded-md hover:bg-[#16232e] mr-2"
            >
              Add All
            </button>
            <button
              onClick={resetScan}
              className="text-[#1e2d3d] border border-[#1e2d3d] py-2 px-4 rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg mt-6 hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-lg font-semibold text-[#1e2d3d] mb-4">Current Ingredients</h3>
        {items.length === 0 ? (
          <p className="text-gray-500">No items yet.</p>
        ) : (
          <ul className="space-y-2">
            {items.map((item, i) => (
              <li
                key={i}
                className="flex justify-between items-center bg-[#d0ded5] px-4 py-3 rounded-md shadow-sm"
              >
                <span className="text-[#1e2d3d] font-medium">{item}</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(i, (quantities[i] || 1) - 1)}
                    className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    -
                  </button>
                  <span>{quantities[i] || 1}</span>
                  <button
                    onClick={() => handleQuantityChange(i, (quantities[i] || 1) + 1)}
                    className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Pantry;
