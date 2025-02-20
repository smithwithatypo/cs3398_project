import React from "react";
import "./home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="how-it-works">
        <h2>How it works:</h2>
        <p>
          Bacon ipsum dolor amet tri-tip cow capicola, strip steak prosciutto
          andouille venison pork belly salami bacon jowl ham hock leberkas. Jowl
          turducken boudin cupim ground round ball tip filet mignon frankfurter
          beef t-bone.
        </p>
        <button className="start-button">Start Here!</button>
      </div>
    </div>
  );
};

export default Home;
