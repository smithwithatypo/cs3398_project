import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h2>Welcome to the Recipe Generator</h2>
      <button onClick={() => navigate("/pantry")}>Go to Pantry</button>
    </div>
  );
};

export default Home;