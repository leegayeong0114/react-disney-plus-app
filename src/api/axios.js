import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: '9095bf41789c46ba8dc11cc65f753059',
    language: 'ko-KR'
  }
})

export default instance