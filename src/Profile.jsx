import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Profile = ({user, lastFiveMovies}) => {

    //console.log(lastFiveMovies);

    const [bio, setBio] = useState(user.bio);
    //const lastFiveMovies = location?.state?.lastFiveMovies || [];

    console.log(lastFiveMovies);

    const handleBioChange = (event) => {
      setBio(event.target.value);
    };

    const handleUpdateClick = async () => {
        //updateBio(user.email, bio); // send the updated bio to the server

        console.log("test");

        var email = user.email;
        var bioVal = bio;

        // Make a request to our server's API endpoint to fetch the list of similar movies
        //const response = await axios.get(`http://localhost:9000/update/${bioVal}/${email}`);
        const response = await axios.get(`https://mysql-reeltalk.herokuapp.com/update/${bioVal}/${email}`);

        
        
        // Set the state to display the list of similar movies
        //setMovies(response.data);
        const repBio = response.data.userUpdate.bio;
        const repMessage = response.data;

        user.bio = repBio;
      };


    const logout = () => {
        localStorage.removeItem("user");
        window.location.reload();
      };


  return (
    <div className="my-component">
        <div className='blur-body'>
            <div className="navbar">
                <h1 className='nav-title'>REELTALK</h1>
                <Link to={{
                    pathname: "/home",
                    state: {
                    user: user
                    }
                }}>Home</Link>
                <Link to={{
                    pathname: "/profile",
                    state: {
                    user: user
                    }
                }}>My Profile</Link>
                <a onClick={logout}>Logout</a>
            </div>
        <div className="profile-welcome">
            <h1>Welcome to your profile, {user.given_name}!</h1>
            <p>Your email address is {user.email}.</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", paddingLeft: "7%" }}>
            <img src={user.picture} alt="Profile" style={{ height: 80, marginRight: 20, borderRadius: "15px", borderStyle: "solid", borderWidth: "2px", borderColor: "rgba(255, 255, 255, 0.701)" }} />
            <h1 style={{color: "whitesmoke"}}>{user.given_name} {user.family_name}</h1>
        </div >
        <div style={{paddingLeft: "7%", paddingTop: "40px", display: "block"}}>
            <label>
                <h2 style={{color: "whitesmoke"}}>Edit bio:</h2>
                <textarea style={{ resize: 'none', width: "60%", height: "10vh", opacity: "95%", borderRadius: "8px", color: "white", backgroundColor: "#ffffff1f" }} value={bio} onChange={handleBioChange} />
            </label>
        </div>
        <button className="bio-button" style={{ margin: "10px", marginLeft: '7%' }} onClick={handleUpdateClick}>Update Bio</button>
      
        <h2>Last 5 movies clicked:</h2>

          <div className="movies-container">
            {/* {lastFiveMovies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <a href={`https://www.themoviedb.org/movie/${movie.id}`} target="_blank" rel="noopener noreferrer">
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} poster`} />
                </a>
                
                <p style={{color: "whitesmoke", textAlign: "center"}}>{movie.title}</p>
              </div>
            ))} */}
          </div>
      </div>
    </div>
  );
};

export default Profile;
