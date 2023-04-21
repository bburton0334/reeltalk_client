// Home.jsx
import React, { useState } from "react";
import axios from "axios";
import "./HomeScreen.css";
import { Link } from 'react-router-dom';


const Home = ({ user }) => {

  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [className, setClassName] = useState("my-component");
  const [lastFiveMovies, setLastFiveMovies] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Make a request to our server's API endpoint to fetch the list of similar movies
    //const response = await axios.get(`http://localhost:9000/movie/${searchTerm}`);
    const response = await axios.get(`https://mysql-reeltalk.herokuapp.com/movie/${searchTerm}`);
    
    // Set the state to display the list of similar movies
    setMovies(response.data);

    if (className != "my-component-2"){
      // change css class for background image to fully cover page
      setClassName("my-component-2");
    }

  };

  const handleMovieClick = (movie) => {
    const { id, title, poster_path } = movie;
    const clickedMovie = { id, title, poster_path };
    const updatedMovies = [clickedMovie, ...lastFiveMovies.slice(0, 4)];
    setLastFiveMovies(updatedMovies);
    console.log(lastFiveMovies);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  return (
    <div className={className}>
      <div className='blur-body'>
        <div className="navbar">
          <h1 className='nav-title'>REELTALK</h1>
          <a href="#">Home</a>
          <Link to={{
            pathname: "/profile",
            state: {
              user: user,
            },
            lastFiveMovies: lastFiveMovies
          }}>My Profile</Link>
          <a onClick={logout}>Logout</a>
        </div>


        <h1 style={{color:"whitesmoke", textAlign: "center", paddingTop: "40px"}}>Welcome, {user?.given_name}</h1>

        <p style={{color:"whitesmoke", textAlign: "center"}}>
          You are viewing this page because you are logged in or you just signed
          up
        </p>

      
        <form onSubmit={handleSubmit}>
          <div className="home-search-container">
            <input type="text" value={searchTerm} onChange={handleChange} placeholder="Search a movie title to get back suggested movies" />
            <button type="submit">Search</button>
          </div>
        </form>
        {movies.length > 0 && (
          <div className="movies-container">
            {movies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <a href={`https://www.themoviedb.org/movie/${movie.id}`} onClick={() => handleMovieClick(movie)} target="_blank" rel="noopener noreferrer">
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} poster`} />
                </a>
                
                <p style={{color: "whitesmoke", textAlign: "center"}}>{movie.title}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Home;