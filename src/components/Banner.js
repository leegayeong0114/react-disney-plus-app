import React, { useEffect, useState } from 'react'
import axiosInstance from '../api/axios'
import requests from '../api/request'
import './Banner.css'
import { styled } from 'styled-components'

const Banner = () => {

  const [movie, setMovie] = useState([])
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {

    // 현재 상영중인 영화 정보 리스트 가져오기
    const response = await axiosInstance.get(requests.fetchNowPlaying)

    // 영화 리스트 중 랜덤으로 영화 id 하나 가져오기
    const movieId = response.data.results[Math.floor(Math.random() * response.data.results.length)].id

    // 랜덤 영화 상세 정보 가져오기
    const { data: movieDetail } = await axiosInstance.get(`movie/${movieId}`, {
      params: {
        append_to_response: 'videos' // 비디오 정보 포함
      }
    })

    setMovie(movieDetail)
  }

  const truncate = (str, n) => {
    return str?.length > n ? str.substring(0, n) + '...' : str
  }

  if(isClicked) {
    return (
      <>
        <Container>
          <HomeContainer>
            <Iframe
              src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
              width={640}
              height={360}
              // frameBorder={0}
              allow="autoplay; fullscreen"
            ></Iframe>
          </HomeContainer>
        </Container>
        <button onClick={() => setIsClicked(false)}>
          X
        </button>
      </>
    )
  } else {
    return (
      <header
        className="banner"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
          backgroundPosition: 'top center',
          backgroundSize: 'cover'
        }}
      >
        <div className="banner__contents">
          <h1 className="banner__title">
            { movie.title || movie.name || movie.original_name }
          </h1>
          <div className="banner__buttons">
            { movie?.videos?.results[0]?.key && 
              <button
                className="banner__button play"
                onClick={() => setIsClicked(true)}
              >
                Play
              </button>
            }
          </div>
          <h1 className="banner__description">
            { truncate(movie?.overview, 100) }
          </h1>
        </div>
        <div className="banner__fadeBottom"></div>
      </header>
    )
  }

}

export default Banner

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`

const HomeContainer = styled.div`
  width: 100%;
  height: 100vh;
`

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.65;
  border: none;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`