import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axiosInstance from '../../api/axios'
import requests from '../../api/request'

const SearchPage = () => {

  const [searchResults, setSearchResults] = useState([])

  const useQuery = () => {
    return new URLSearchParams(useLocation().search /** ?q=spider */)
  }

  let query = useQuery()
  let searchTerm = query.get('q')

  useEffect(() => {
    if(searchTerm) {
      fetchSearchMovie(searchTerm)
    }
  }, [searchTerm])
  
  const fetchSearchMovie = async (searchTerm) => {
    try {
      const response = await axiosInstance.get(requests.fetchSearchMovies + searchTerm)
      setSearchResults(response.data.results)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      {
        searchResults.map((movie, index) => (
          <h3 key={index}>{movie.name}</h3>
        ))
      }
    </div>
  )
}

export default SearchPage
