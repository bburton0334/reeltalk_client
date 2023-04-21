// Signup.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "./hooks/useFetch";

// https://developers.google.com/identity/gsi/web/reference/js-reference

const SignUp = () => {

  const { handleGoogle, loading, error } = useFetch(
    "https://mysql-reeltalk.herokuapp.com/signup"
  );

  // const { handleGoogle, loading, error } = useFetch(
  //   "http://localhost:9000/signup"
  // );

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogle,
      });

      google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
        // type: "standard",
        theme: "filled_black",
        size: "large",
        text: "continue_with",
        shape: "square",
      });

      // google.accounts.id.prompt()
    }
  }, [handleGoogle]);

  return (
    <>
      <nav className="nav-go-back">
        <Link to="/" className="go-back-button">← Go Back</Link>
      </nav>

      <div className="screen-container">
        <div className="landing-container">
            <div className="landing-form-container">

              <h1 className='title-style'>Register with REELTALK</h1>
              <p className='subtitle-style'>Continue by registering with Google</p>

              <div className="google-container">
                {error && <p style={{ color: "red" }}>{error}</p>}
                {loading ? (
                  <div>Loading....</div>
                ) : (
                  <div id="signUpDiv" data-text="signup_with"></div>
                )}
              </div>
                <p className="copyright-style">Version 1.0 | April 2023</p>
            </div>
        </div>
      </div>



    </>
  );
};

export default SignUp;