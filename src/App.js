import React, {Component, useEffect} from 'react';
// import React, {useEffect} from 'react';
import { useState } from 'react';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import { Home, Landing, Login, Signup} from "../src";
import Profile from "./Profile";






const App = () => {
  const [apiResponse, setApiResponse] = useState("");
  const [user, setUser] = useState({});

  // useEffect(() => {
  //   callAPI();
  // }, []);


  useEffect(() => {
    
    //callAPI();

    const theUser = localStorage.getItem("user");

    if (theUser && !theUser.includes("undefined")) {
      setUser(JSON.parse(theUser));
    }
  }, []);


  // function callAPI() {
  //   fetch("http://localhost:9000/testAPI")
  //     .then(res => res.text())
  //     .then(res => setApiResponse(res));
  // }

  return (
    // <div className="App">
    //   <p className="App-intro">{apiResponse}</p>
    //   {/* this will need to be changed */}
    //   <LoginScreen />
    //   <SearchScreen/>
    // </div>

    <BrowserRouter>
      <Routes>
      <Route
          path="/"
          element={user?.email ? <Navigate to="/home" /> : <Landing />}
        />
        <Route
          path="/signup"
          element={user?.email ? <Navigate to="/home" /> : <Signup />}
        />
        <Route
          path="/login"
          element={user?.email ? <Navigate to="/home" /> : <Login />}
        />
        <Route
          path="/home"
          element={user?.email ? <Home user={user} /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={user?.email ? <Profile user={user} /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

