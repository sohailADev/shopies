import React, { useState } from 'react';
import {
  MDBContainer, MDBRow, MDBBtn, MDBCard, MDBCardBody, MDBInput,
  MDBCol,MDBIcon,  MDBAlert
} from "mdbreact";
import './App.css';
import BackgroundImagePage from './Background'



function App() {
  //states 
  const SEARCH_API = "http://www.omdbapi.com/?s=ram&apikey=abd7655b"
  const [movies, setMovies] = useState([]);
  const [nominatedMovies, setNominatedMovies] = useState([]);
  const [nominatedCounter, setNominatedCounter] = useState(0);
  const [searchTerm, setSearchTerm] = useState(""); 

  //handle search submit 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=abd7655b`)
        .then((res) => res.json())
        .then((data) => { setMovies(data.Search) })
      setSearchTerm('');
    }
  }
  //handle on change search
  const handleChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  }
  //handle Nominations
  const handleNominations = (id) => {
    const filteredMovie = movies.find(m => m.imdbID === id)
    const found = nominatedMovies.find(m => m.imdbID === filteredMovie.imdbID)
    //check if already nominated
    if (found === undefined) {
      setNominatedMovies(nominatedMovies => [...nominatedMovies, filteredMovie])
      setNominatedCounter(nominatedCounter + 1)
    }
  }
  //handle  remove Nominations
  const handleRemoveNominations = (id) => {
    const filteredMovie = nominatedMovies.filter(m => m.imdbID !== id)
    setNominatedCounter(nominatedCounter - 1)
    setNominatedMovies(filteredMovie)
  }
  const enabled = nominatedCounter >= 5;
  return (
    <React.Fragment>
      <div className="movie_container" >
        <MDBContainer fluid>
          <MDBRow className="mt-3">
            <MDBCol >
              <MDBCard >
                <MDBCardBody>
                  <form onSubmit={handleSubmit}>
                    <p className="h4">The shoppies</p>
                    <MDBInput type="text" className="form-control" icon="search" onChange={handleChange} />
                  </form>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
          <MDBRow className="mt-3"><MDBCol md='4'></MDBCol><MDBCol md='3' className="nomination_alert">
            {enabled && <MDBAlert fade in color="danger" ><h4 className="alert-heading">Holy guacamole!</h4>You have 5 nominations !!!</MDBAlert>}
          </MDBCol><MDBCol md='4'></MDBCol></MDBRow>
          <MDBRow className="mt-3">
            <MDBCol md='8'>
              <MDBCard className="nomi_card">
                <p className="h1 text-center mb-4">Result from  your search</p>
                <MDBCardBody className="card_main_container">
                  {movies && movies.map((movie) => (
                    <div className="card_container" key={movie.imdbID}>
                      <div className="image_container">
                        <img src={movie.Poster} />
                      </div>
                      <div className="card_content">
                        <div className="card_content_box">
                          <p>{movie.Title}</p>
                          <p>Year:{movie.Year}</p>
                          <MDBBtn gradient="aqua" disabled={enabled} className="card_btn" onClick={() => handleNominations(movie.imdbID)}>
                            Nominate<MDBIcon icon="magic" className="ml-1" />
                          </MDBBtn>
                        </div>
                      </div>
                    </div>
                  ))}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol md='4'>
              <MDBCard className="nomi_card">
                <p className="h1 text-center mb-4">&#10024;Nominations&#10024;</p>
                <MDBCardBody className="card_main_container">
                  {nominatedMovies && nominatedMovies.map((movie) => (
                    <div className="card_container" key={movie.imdbID}>
                      <div className="image_container"><img src={movie.Poster} /></div>
                      <div className="card_content">
                        <div className="card_content_box">
                          <p>{movie.Title}</p>
                          <p>Year:{movie.Year}</p>
                          <MDBBtn gradient="peach" className="card_btn" onClick={() => handleRemoveNominations(movie.imdbID)}>
                            Remove<MDBIcon icon="times" className="ml-1" /></MDBBtn>
                        </div>
                      </div>
                    </div>
                  ))}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
      <BackgroundImagePage />
    </React.Fragment>
  );
}

export default App;
