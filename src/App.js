import React, { useState, useEffect } from 'react';
import {
  MDBContainer, MDBRow, MDBBtn, MDBCard, MDBCardBody, MDBInput,
  MDBCol, MDBListGroup, MDBListGroupItem, MDBIcon
} from "mdbreact";
import './App.css';
function App() {
  //states 
  const SEARCH_API = "http://www.omdbapi.com/?s=ram&apikey=abd7655b"
  const [movies, setMovies] = useState([]);
  const [nominatedMovies, setNominatedMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {

  }, [])

  //handle search submit 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchTerm)
    if (searchTerm) {
      fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=abd7655b`)
        .then((res) => res.json())
        .then((data) => { setMovies(data.Search) })
      console.log(movies)
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
    }
  }
  //handle  remove Nominations
  const handleRemoveNominations = (id) => {
    console.log(id)
    const filteredMovie = nominatedMovies.filter(m => m.imdbID !== id)

    setNominatedMovies(filteredMovie)
  }


  return (
    <React.Fragment>
  
    <div className="movie_container" >
      <MDBContainer>
        <MDBRow>
          <MDBCol >
            <MDBCard>
              <MDBCardBody>
                <form onSubmit={handleSubmit}>
                  <p className="h4">The shoppies</p>
                  <MDBInput label="Search Moives" outline icon="search" onChange={handleChange} />
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        <MDBRow className="mt-5">
          <MDBCol md='6'>
            <MDBCard>
              <MDBCardBody className="card_main_container">
                
                  <h1>Result from  your search </h1>
                  <br></br>
                  {movies && movies.map((movie) => (

                    <div className="card_container" key={movie.imdbID}>
                      <div className="image_container">
                        <img src={movie.Poster} />
                      </div>
                      <div className="card_content">
                      <div className="card_content_box">
                        <p>{movie.Title}</p>
                        <MDBBtn gradient="aqua" className="card_btn" onClick={() => handleNominations(movie.imdbID)}>
                          Nominate<MDBIcon icon="magic" className="ml-1" />
                        </MDBBtn>
                      
                    </div></div></div>
                  ))}

             
              </MDBCardBody>
            </MDBCard>

          </MDBCol>
          <MDBCol md='6'>
          <MDBCard>
              <MDBCardBody className="card_main_container">
                <div>
                  <h1>&#10024;Nominations&#10024;</h1>
                  </div>
                  <br></br>
                  <br></br>
                  {nominatedMovies && nominatedMovies.map((movie) => (

                    <div className="card_container"  key={movie.imdbID}>
                      <div className="image_container">
                        <img src={movie.Poster} />
                      </div>
                      <div className="card_content">
                      <div className="card_content_box">
                        <p>{movie.Title}</p>
                        <MDBBtn  gradient="peach" className="card_btn" onClick={() => handleRemoveNominations(movie.imdbID)}>
                          Remove<MDBIcon icon="times" className="ml-1" />
                        </MDBBtn>
                        </div></div>
                      
                      
                    </div>
                  ))}

             
              </MDBCardBody>
            </MDBCard>

          </MDBCol>
        </MDBRow>
      </MDBContainer>


    </div><div className="bg-image"></div>
    </React.Fragment>
  );
}

export default App;
