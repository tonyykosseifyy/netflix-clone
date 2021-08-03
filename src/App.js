import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import { MainPage } from './Components/mainComponents' ;
import NetflixSection from './Components/NetflixSection' ;

//100 , 300 , 400 , 500 , 700 ;

const App = () => {
  return (
    <div className="app">
      <div className="main-page">
        <Navbar />
        <MainPage />
      </div>
      <NetflixSection />
    </div>
  );
};

export default App;
