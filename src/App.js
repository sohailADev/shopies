import React, { useState, useEffect } from 'react';
import {
  MDBContainer, MDBRow, MDBBtn, MDBCard, MDBCardBody, MDBInput,
  MDBCardImage, MDBCardTitle, MDBCardText, MDBCol
  , MDBListGroup, MDBListGroupItem, MDBContaine, MDBIcon
} from "mdbreact";
import './App.css';
import Movie from './Movie'
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
    const found = nominatedMovies.find(m =>m.imdbID === filteredMovie.imdbID)
    //check if already nominated
    if(found === undefined)
    {
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
              <MDBCardBody>
                <MDBListGroup style={{ width: "22rem" }}>
                  <p>Result from  your search </p>
                  {movies && movies.map((movie) => (
                    <MDBListGroupItem key={movie.imdbID}>
                      {movie.Title}
                      <MDBBtn outline color="secondary" size="sm" onClick={() => handleNominations(movie.imdbID)}>
                        Nominate<MDBIcon icon="magic" className="ml-1" />
                      </MDBBtn>
                    </MDBListGroupItem>

                  ))}

                </MDBListGroup>`
              </MDBCardBody>
            </MDBCard>

          </MDBCol>
          <MDBCol md='6'>
            <MDBCard>
              <MDBCardBody>
                <MDBListGroup style={{ width: "22rem" }}>
                  <p>Nominations</p>
                  {nominatedMovies && nominatedMovies.map((movie) => (
                    <MDBListGroupItem key={movie.imdbID} >
                      {movie.Title}
                      <MDBBtn outline color="secondary" size="sm" onClick={() => handleRemoveNominations(movie.imdbID)}>
                        Remove
                      </MDBBtn>
                    </MDBListGroupItem>
                  ))}

                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>


    </div>
  );
}

export default App;
