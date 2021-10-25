import React, { useEffect , useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import { MainPage } from "./Components/mainComponents";
import NetflixSection from "./Components/NetflixSection";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./Components/Login";
import { firebase } from './firebaseAuth.js' ;
import { signUp } from './redux/userAuth' ;
import { useDispatch , useSelector } from 'react-redux' ;
import Home from './Components/Home' ;
import SearchResults from './Components/SearchResults' ;
//100 , 300 , 400 , 500 , 700 ;

const App = () => {
  const dispatch = useDispatch() ;
  const reduxUser = useSelector(state => state.user) ;
  const [ userData , setUserData ] = useState({})
  console.log('redux uiser' , reduxUser)
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if ( user ) {
        dispatch(signUp({
          name: user.displayName ,
          email: user.email ,
          photoURL : user.photoURL
        }))
        setUserData(user)
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

        {userData.hasOwnProperty("displayName") &&
          <Route path="/browse">
            <SearchResults />
          </Route>
        }
        <Route path="/">
        
        { !userData.hasOwnProperty("displayName") ?
            <>
              <div className="main-page">
                <Navbar />
                <MainPage />
              </div>
              <NetflixSection />
            </>
              :
              <Home />
            }
          </Route>

      </Switch>
      {/*<div className="app">
         if the user is NOT signed in [/signUp]

      </div>*/}
    </Router>
  );
};

export default App;
