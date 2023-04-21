// Landing.jsx
import React from "react";
import { Link } from "react-router-dom";
import './LandingScreen.css';

const Landing = () => {
  return (
    <>
      <div className="landing-screen-container">
        <div className="landing-container">
            <div className="landing-form-container">

              <h1 className='landing-title-style'>Welcome to REELTALK</h1>
              <p className='subtitle-style'>Discover your next favorite movie</p>

              <div className="button-container">
                <Link
                  to="/signup"
                  className="signup-button"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="login-button"
                >
                  Login
                </Link>
              {/* </main> */}
              </div>
                <p className="copyright-style">Version 1.0 | April 2023</p>
            </div>
        </div>
      </div>
    </>
  );
};

export default Landing;