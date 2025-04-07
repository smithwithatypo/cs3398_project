import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Pantry = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [newQuantity, setNewQuantity] = useState(1);
  const [quantities, setQuantities] = useState(() => {
    const savedQuantities = localStorage.getItem('quantities');
    return savedQuantities ? JSON.parse(savedQuantities) : {};
  });
  
  // Scanning states (shared between receipt and pantry scanning)
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState('');
  const [extractedItems, setExtractedItems] = useState([]);
  const [showExtractedItems, setShowExtractedItems] = useState(false);
  
  // File input references and states
  const receiptFileInputRef = useRef(null);
  const pantryFileInputRef = useRef(null);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [selectedPantryImage, setSelectedPantryImage] = useState(null);
  
  // Track which scanner is active
  const [activeScanner, setActiveScanner] = useState(''); // 'receipt' or 'pantry'

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
        const initialQuantities = {};
        response.data.data.forEach((item, index) => {
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
        setItems(updatedItems);
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
    if (newValue < 1) {
      handleRemoveItem(index);
    } else {
      setQuantities(prev => ({
        ...prev,
        [index]: newValue
      }));
    }
  };
  
  // File selection handlers
  const handleReceiptFileChange = (event) => {
    setSelectedReceipt(event.target.files[0]);
    setSelectedPantryImage(null);
    setScanError('');
    setExtractedItems([]);
    setShowExtractedItems(false);
    setActiveScanner('receipt');
  };
  
  const handlePantryImageChange = (event) => {
    setSelectedPantryImage(event.target.files[0]);
    setSelectedReceipt(null);
    setScanError('');
    setExtractedItems([]);
    setShowExtractedItems(false);
    setActiveScanner('pantry');
  };
  
  // Scanning handlers
  const handleScanReceipt = async () => {
    if (!selectedReceipt) {
      setScanError("Please select a receipt image first");
      return;
    }

    setIsScanning(true);
    setScanError('');
    setExtractedItems([]);
    setShowExtractedItems(false);

    const formData = new FormData();
    formData.append("image", selectedReceipt);

    try {
      console.log("Uploading receipt image...");
      const response = await axios.post("/api/ai/scan-receipt", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      if (response.data.success) {
        console.log("Receipt scanned successfully:", response.data.data);
        if (response.data.data && response.data.data.length > 0) {
          setExtractedItems(response.data.data);
          setShowExtractedItems(true);
        } else {
          setScanError("No food items were found in this receipt. Try a clearer image or add items manually.");
        }
      } else {
        setScanError(response.data.error || "Failed to scan receipt");
      }
    } catch (error) {
      console.error("Error scanning receipt:", error);
      
      // Extract error message from API response if available
      const errorMessage = error.response?.data?.error || "Something went wrong. Please try again.";
      setScanError(errorMessage);
      
      // If scan fails, reset the file input to allow retry with a different image
      if (receiptFileInputRef.current) {
        receiptFileInputRef.current.value = "";
      }
      setSelectedReceipt(null);
    }

    setIsScanning(false);
  };
  
  const handleScanPantry = async () => {
    if (!selectedPantryImage) {
      setScanError("Please select a pantry image first");
      return;
    }

    setIsScanning(true);
    setScanError('');
    setExtractedItems([]);
    setShowExtractedItems(false);

    const formData = new FormData();
    formData.append("image", selectedPantryImage);

    try {
      console.log("Uploading pantry image...");
      const response = await axios.post("/api/ai/scan-pantry", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      if (response.data.success) {
        console.log("Pantry scanned successfully:", response.data.data);
        if (response.data.data && response.data.data.length > 0) {
          setExtractedItems(response.data.data);
          setShowExtractedItems(true);
        } else {
          setScanError("No food items were found in your pantry image. Try a photo with better lighting or add items manually.");
        }
      } else {
        setScanError(response.data.error || "Failed to scan pantry");
      }
    } catch (error) {
      console.error("Error scanning pantry:", error);
      
      // Extract error message from API response if available
      const errorMessage = error.response?.data?.error || "Something went wrong. Please try again.";
      setScanError(errorMessage);
      
      // If scan fails, reset the file input to allow retry with a different image
      if (pantryFileInputRef.current) {
        pantryFileInputRef.current.value = "";
      }
      setSelectedPantryImage(null);
    }

    setIsScanning(false);
  };
  
  const handleAddExtractedItems = async () => {
    if (extractedItems.length === 0) return;
    
    try {
      // Add each extracted item to the pantry
      for (const item of extractedItems) {
        await axios.post('/api/ai/pantry', { item });
      }
      
      // Refresh pantry items
      await fetchPantryItems();
      
      // Reset scan states
      resetScanStates();
    } catch (error) {
      console.error('Error adding extracted items:', error);
    }
  };
  
  const resetScanStates = () => {
    setSelectedReceipt(null);
    setSelectedPantryImage(null);
    setExtractedItems([]);
    setShowExtractedItems(false);
    setScanError('');
    setActiveScanner('');
    
    // Reset file inputs
    if (receiptFileInputRef.current) {
      receiptFileInputRef.current.value = "";
    }
    if (pantryFileInputRef.current) {
      pantryFileInputRef.current.value = "";
    }
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
              <div className="px-2 py-2 text-center bg-white w-10 flex items-center justify-center">
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
      
      {/* Scanning Section */}
      <div className="bg-[#d0ded5] shadow-md rounded-lg p-6 w-full max-w-lg mt-6 text-center">
              <h2 className="text-2xl font-bold mb-4 text-[#1e2d3d]">Scan Features</h2>
              <p className="text-[#1e2d3d] mb-4">
                Upload a photo to automatically add food items to your pantry.
              </p>
        
        {/* Scan Option Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <button 
            className={`px-4 py-2 rounded-md font-medium transition-colors ${activeScanner === 'receipt' ? 'bg-[#1e2d3d] text-white' : 'bg-white text-[#1e2d3d] border border-[#1e2d3d]'}`}
            onClick={() => {
              setActiveScanner('receipt');
              setSelectedPantryImage(null);
              setScanError('');
              setExtractedItems([]);
              setShowExtractedItems(false);
              if (pantryFileInputRef.current) {
                pantryFileInputRef.current.value = "";
              }
            }}
          >
            Scan Receipt
          </button>
          
          <button 
            className={`px-4 py-2 rounded-md font-medium transition-colors ${activeScanner === 'pantry' ? 'bg-[#1e2d3d] text-white' : 'bg-white text-[#1e2d3d] border border-[#1e2d3d]'}`}
            onClick={() => {
              setActiveScanner('pantry');
              setSelectedReceipt(null);
              setScanError('');
              setExtractedItems([]);
              setShowExtractedItems(false);
              if (receiptFileInputRef.current) {
                receiptFileInputRef.current.value = "";
              }
            }}
          >
            Scan Pantry
          </button>
        </div>
        
        <div className="flex flex-col items-center">
          {/* Receipt Scanning UI */}
          {activeScanner === 'receipt' && (
            <>
              <p className="text-[#1e2d3d] mb-4">
                Upload a photo of your grocery receipt to automatically add food items to your pantry.
              </p>
              <label className="flex flex-col items-center px-4 py-2 bg-white text-[#1e2d3d] rounded-lg shadow-md tracking-wide border border-[#1e2d3d] cursor-pointer hover:bg-gray-100">
                <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span className="mt-2 text-base leading-normal">Select receipt photo</span>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleReceiptFileChange}
                  ref={receiptFileInputRef}
                />
              </label>
              
              {selectedReceipt && (
                <div className="mt-3 text-center">
                  <p className="text-sm text-[#1e2d3d]">{selectedReceipt.name}</p>
                  <div className="mt-2">
                    <button
                      className={`bg-[#1e2d3d] hover:bg-[#16232e] text-white font-bold py-2 px-4 rounded-md ${isScanning ? "opacity-50 cursor-not-allowed" : ""}`}
                      onClick={handleScanReceipt}
                      disabled={isScanning}
                    >
                      {isScanning ? "Scanning..." : "Scan Receipt"}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
          
              {selectedPantryImage && (
          {/* Pantry Scanning UI */}
          {activeScanner === 'pantry' && (
            <>
              <p className="text-[#1e2d3d] mb-4">
                Take a photo of your pantry or refrigerator to automatically identify food items.
              </p>
              <label className="flex flex-col items-center px-4 py-2 bg-white text-[#1e2d3d] rounded-lg shadow-md tracking-wide border border-[#1e2d3d] cursor-pointer hover:bg-gray-100">
                <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span className="mt-2 text-base leading-normal">Select pantry photo</span>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handlePantryImageChange}
                  ref={pantryFileInputRef}
                />
              </label>
              
              {selectedPantryImage && (
                <div className="mt-3 text-center">
                  <p className="text-sm text-[#1e2d3d]">{selectedPantryImage.name}</p>
                  <div className="mt-2">
                    <button
                      className={`bg-[#1e2d3d] hover:bg-[#16232e] text-white font-bold py-2 px-4 rounded-md ${isScanning ? "opacity-50 cursor-not-allowed" : ""}`}
                      onClick={handleScanPantry}
                      disabled={isScanning}
                    >
                      {isScanning ? "Scanning..." : "Scan Pantry"}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
          
          {isScanning && (
            <div className="mt-4 flex flex-col items-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1e2d3d]"></div>
              <p className="mt-2 text-[#1e2d3d]">Analyzing...</p>
            </div>
          )}
          
          {scanError && (
            <div className="mt-4">
              <p className="text-red-500">{scanError}</p>
              <button 
                className="mt-2 text-[#1e2d3d] underline hover:text-[#16232e]"
                onClick={() => {
                  setScanError('');
                  if (activeScanner === 'receipt' && receiptFileInputRef.current) {
                    receiptFileInputRef.current.value = "";
                    setSelectedReceipt(null);
                  } else if (activeScanner === 'pantry' && pantryFileInputRef.current) {
                    pantryFileInputRef.current.value = "";
                    setSelectedPantryImage(null);
                  }
                }}
              >
                Try a different image
              </button>
            </div>
          )}
          
          {/* Extracted Items Display */}
          {showExtractedItems && extractedItems.length > 0 && (
            <div className="mt-4 w-full">
              <div className="bg-white p-4 rounded-md shadow-sm">
                <h4 className="font-semibold mb-2 text-[#1e2d3d]">Food Items Found:</h4>
                <ul className="list-disc pl-6 mb-4 max-h-32 overflow-y-auto">
                  {extractedItems.map((item, index) => (
                    <li key={index} className="text-[#1e2d3d] text-left">{item}</li>
                  ))}
                </ul>
                <div className="flex gap-2">
                  <button
                    className="bg-[#1e2d3d] hover:bg-[#16232e] text-white font-bold py-2 px-4 rounded-md"
                    onClick={handleAddExtractedItems}
                  >
                    Add All to Pantry
                  </button>
                  <button
                    className="bg-white hover:bg-gray-100 text-[#1e2d3d] font-bold py-2 px-4 rounded-md border border-[#1e2d3d]"
                    onClick={resetScanStates}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {isScanning && (
            <div className="mt-4 flex flex-col items-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1e2d3d]"></div>
              <p className="mt-2 text-[#1e2d3d]">Analyzing...</p>
            </div>
          )}
          
          {scanError && (
            <div className="mt-4">
              <p className="text-red-500">{scanError}</p>
              <button 
                className="mt-2 text-[#1e2d3d] underline hover:text-[#16232e]"
                onClick={() => {
                  setScanError('');
                  if (activeScanner === 'receipt' && receiptFileInputRef.current) {
                    receiptFileInputRef.current.value = "";
                    setSelectedReceipt(null);
                  } else if (activeScanner === 'pantry' && pantryFileInputRef.current) {
                    pantryFileInputRef.current.value = "";
                    setSelectedPantryImage(null);
                  }
                }}
              >
                Try a different image
              </button>
            </div>
          )}
          
          {/* Extracted Items Display */}
          {showExtractedItems && extractedItems.length > 0 && (
            <div className="mt-4 w-full">
              <div className="bg-white p-4 rounded-md shadow-sm">
                <h4 className="font-semibold mb-2 text-[#1e2d3d]">Food Items Found:</h4>
                <ul className="list-disc pl-6 mb-4 max-h-32 overflow-y-auto">
                  {extractedItems.map((item, index) => (
                    <li key={index} className="text-[#1e2d3d] text-left">{item}</li>
                  ))}
                </ul>
                <div className="flex gap-2">
                  <button
                    className="bg-[#1e2d3d] hover:bg-[#16232e] text-white font-bold py-2 px-4 rounded-md"
                    onClick={handleAddExtractedItems}
                  >
                    Add All to Pantry
                  </button>
                  <button
                    className="bg-white hover:bg-gray-100 text-[#1e2d3d] font-bold py-2 px-4 rounded-md border border-[#1e2d3d]"
                    onClick={resetScanStates}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {scanError && (
            <div className="mt-4">
              <p className="text-red-500">{scanError}</p>
              <button 
                className="mt-2 text-[#1e2d3d] underline hover:text-[#16232e]"
                onClick={() => {
                  setScanError('');
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                  setSelectedReceipt(null);
                }}
              >
                Try a different image
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Pantry Items List */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg mt-6">
        {/* Header with "Current Ingredients" and info icon */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-[#1e2d3d]">Current Ingredients</h3>
          <div className="relative inline-block group">
            <div className="rounded-full border border-bg-gray-500 w-6 h-6 flex items-center justify-center text-gray-500 cursor-pointer">
              i
            </div>
            <div className="absolute right-0 top-full mt-2 w-max bg-gray-800 text-white text-sm p-2 rounded-md opacity-0 group-hover:opacity-[0.85] transition-opacity z-10 pointer-events-none">
                To remove an item from your pantry, click the '-' button until the quantity is reduced to 0.
            </div>
          </div>
        </div>

        {items.length === 0 ? (
          <p className="text-gray-500">No ingredients added yet.</p>
        ) : (
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-[#d0ded5] border border-gray-300 px-4 py-3 rounded-md shadow-sm"
              >
                <span className="text-[#1e2d3d] font-medium mr-4">{item}</span>
                <div className="inline-flex shadow-sm rounded-md overflow-hidden">
                  <button 
                    type="button"
                    onClick={() => handleQuantityChange(index, (quantities[index] || 1) - 1)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 focus:outline-none transition-colors text-sm"
                  >
                    <span className="font-medium">-</span>
                  </button>
                  <div className="px-2 py-1 text-center bg-white w-10 flex items-center justify-center">
                    <span className="font-medium text-gray-700 text-sm">{quantities[index] || 1}</span>
                  </div>
                  <button 
                    type="button"
                    onClick={() => handleQuantityChange(index, (quantities[index] || 1) + 1)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 focus:outline-none transition-colors text-sm"
                  >
                    <span className="font-medium">+</span>
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