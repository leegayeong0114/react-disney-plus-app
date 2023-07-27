import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../api/axios'

const DetailPage = () => {

  const [movie, setMovie] = useState({})

  let { movieId } = useParams() // 라우팅할 때 정의해준 이름으로 가져온다.
  // let movieId = useParams().movieId 
  
  useEffect(() => {

    const fetchMovieData = async () => {
      const response = await axiosInstance.get(`/movie/${movieId}`)
      setMovie(response.data)
    }
    
    fetchMovieData()
  }, [movieId])

  if(!movie) return null

  return (
    <section>
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt="poster-img"
        className="modal__poster-img"
      />
    </section>
  )
}

export default DetailPage
