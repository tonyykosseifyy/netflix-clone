import React, { useEffect , useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import { MainPage } from "./Components/mainComponents";
import NetflixSection from "./Components/NetflixSection";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./Components/Login";
import { firebase } from './firebaseAuth.js' ;
import { signUp } from './redux/userAuth' ;
import { useDispatch } from 'react-redux' ;
//100 , 300 , 400 , 500 , 700 ;

const App = () => {
  const dispatch = useDispatch() ;
  const user = firebase.auth().currentUser ;

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if ( user ) {
        dispatch(signUp({
          name: user.displayName ,
          email: user.email ,
          photoURL : user.photoURL
        }))

        console.log('here we have a user' , user)
      } else {
        console.log('we dont have a user')
      }
    })
  },[])
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>

        { user ?
          <Route path="/">
            <div className="main-page">
              <Navbar />
              <MainPage />
            </div>
            <NetflixSection />
          </Route>
        : <Route path="/">
          <div className="main-page">
            <Navbar />
            <MainPage />
          </div>
        </Route>
      }
      </Switch>
      {/*<div className="app">
         if the user is NOT signed in [/signUp]

      </div>*/}
    </Router>
  );
};

export default App;
