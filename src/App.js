import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import { MainPage } from "./Components/mainComponents";
import NetflixSection from "./Components/NetflixSection";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./Components/Login";
//100 , 300 , 400 , 500 , 700 ;

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>

        <Route path="/">
          <div className="main-page">
            <Navbar />
            <MainPage />
          </div>
          <NetflixSection />
        </Route>
      </Switch>
      {/*<div className="app">
         if the user is NOT signed in [/signUp] 
        
      </div>*/}
    </Router>
  );
};

export default App;
