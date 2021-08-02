import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import { MainPage } from './Components/mainComponents' ;


//100 , 300 , 400 , 500 , 700 ;

const App = () => {
  return (
    <div className="app">
      <div className="main-page">
        <Navbar />
        <MainPage />
      </div>
    </div>
  );
};

export default App;
