// import logo from './assets/logo.svg';
import { useState } from "react";
import "./App.css";
import Navbar from "./shared/navbar/navbar";
import Home from "./components/home";
import Pantry from "./components/pantry";

const App = () => {
  const [page, setPage] = useState("home");
  return (
    <div className="App">
      <Navbar setPage ={setPage} />
      {page === "home" &&  <Home />}
      {page === "pantry" && <Pantry />}
    </div>
  );
};

export default App;
