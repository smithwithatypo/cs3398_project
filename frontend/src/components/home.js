import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css"; // Import the CSS file for styling

const Home = () => {
  const navigate = useNavigate(); // React Router navigation hook

  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="header">
        <h1>Recipe Generator</h1>
      </header>

      {/* How it Works Section */}
      <section className="how-it-works">
        <h2>How it works:</h2>
        <p>
          Bacon ipsum dolor amet tri-tip cow capicola, strip steak prosciutto
          andouille venison pork belly salami bacon jowl ham hock leberkas. Jowl
          turducken boudin cupim ground round ball tip filet mignon frankfurter
          beef t-bone.
        </p>
        <button className="start-button" onClick={() => navigate("/pantry")}>
          Start Here!
        </button>
      </section>
    </div>
  );
};

export default Home;
