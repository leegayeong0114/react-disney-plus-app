import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import requests from '../../api/request'
import '../SearchPage/SearchPage.css'
import { useDebounce } from '../../hooks/useDebounce'
import MovieModal from '../../components/MovieModal'

const SearchPage = () => {

  const [searchResults, setSearchResults] = useState([])

  const [modalOpen, setModalOpen] = useState(false)
  const [movieSelected, setMovieSelected] = useState({})

  const navigate = useNavigate()

  const useQuery = () => {
    return new URLSearchParams(useLocation().search /** ?q=spider */)
  }

  let query = useQuery()
  const searchTerm = query.get('q')
  const debounceSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    if(debounceSearchTerm) {
      fetchSearchMovie(debounceSearchTerm)
    }
  }, [debounceSearchTerm])
  
  const fetchSearchMovie = async (searchTerm) => {
    try {
      const response = await axiosInstance.get(requests.fetchSearchMovies + searchTerm)
      setSearchResults(response.data.results)
    } catch (error) {
      console.log(error)
    }
  }

  const handleClick = (movie) => {
    setModalOpen(true)
    setMovieSelected(movie)
  }

  if(searchResults.length > 0) {
    return (
      <>
        <section className="search-container">
        {
          searchResults.map(movie => {
            if(movie.backdrop_path !== null && movie.media_type !== 'person') {
              const movieImageUrl = `http://image.tmdb.org/t/p/w500${movie.backdrop_path}`
              return (
                <div className="movie" key={movie.id}>
                  {/* <div className="movie__column-poster" onClick={() => navigate(`/${movie.id}`)}> */}
                  <div className="movie__column-poster" onClick={() => handleClick(movie)}>
                    <img 
                      src={movieImageUrl}
                      alt="movie"
                      className="movie__poster"
                    />
                  </div>
                </div>
              )
            }
          })
        }
        </section>
        
        {
          modalOpen && 
          <MovieModal 
            {...movieSelected}
            setModalOpen={setModalOpen}
          />
        }
      </>
    )
  } else {
    return (
      <section className="no-results">
        <div className="no-results__text">
          <p>
            찾고자 하는 검색어 "{searchTerm}" 에 맞는 영화가 없습니다.
          </p>
        </div>
      </section>
    )
  }

}

export default SearchPage
