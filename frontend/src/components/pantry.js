import { useState } from "react";
const Pantry = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  return(
    <div>
      <h2>Pantry</h2>
          <p>Add and manage your pantry items to generate recipes based on what you have.</p>
    </div>
  );
};

export default Pantry;