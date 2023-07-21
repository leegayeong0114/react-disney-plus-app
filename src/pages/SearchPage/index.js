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
      console.log(searchTerm)
    }
  }, [searchTerm])
  
  const fetchSearchMovie = async (searchTerm) => {
    const response = await axiosInstance.get(requests.fetchTrending)
  }

  return (
    <div>
      SearchPage
    </div>
  )
}

export default SearchPage
