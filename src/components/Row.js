import React, { useCallback, useEffect, useState } from 'react'
import axiosInstance from '../api/axios'
import './Row.css'
import MovieModal from './MovieModal'

const Row = ({ title, id, fetchUrl}) => {

  const [movies, setMovies] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [movieSelected, setMovieSelected] = useState({})

  /**
   * memoization - 연산의 결괏값을 메모리에 저장해 두고 이전 값과 결과가 동일할 때 재사용하는 기법
   * useCallback - 컴포넌트가 리렌더링 될 때 함수가 다시 생성되지 않도록 memoization 해줌
   * fetchUrl이 바뀌었을 때만 함수가 재생성되도록 함
   */
  const fetchMovieData = useCallback( async () => {
    const response = await axiosInstance.get(fetchUrl)
    setMovies(response.data.results)
  }, [fetchUrl])

  useEffect(() => {
    fetchMovieData()
  }, [fetchMovieData])

  const handleClick = (movie) => {
    setModalOpen(true)
    setMovieSelected(movie)
  }

  return (
    <div>
      <h2>{title}</h2>
      <div className="slider">
        <div className="slider__arrow-left">
        <span 
            className="arrow"
            onClick={() => {
              document.getElementById(id).scrollLeft -= window.innerWidth - 80
            }}
          >
            {"<"}
          </span>
        </div>

        <div id={id} className="row__posters">
          {
            movies.map(movie => (
              <img 
                key={movie.id}
                className="row__poster"
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                alt={movie.name}
                onClick={() => handleClick(movie)}
              />
            ))
          }
        </div>

        <div className="slider__arrow-right">
          <span 
            className="arrow"
            onClick={() => {
              document.getElementById(id).scrollLeft += window.innerWidth - 80
            }}
          >
            {">"}
          </span>
        </div>
      </div>

      {
        modalOpen && 
          <MovieModal 
            {...movieSelected}
            setModalOpen={setModalOpen}
          />
      }
    </div>
  )
}

export default Row
