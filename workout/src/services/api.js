import axios from 'axios'

//BASE URL: https://api.themoviedb.org/3/
// URL: /movie/now_playing?api_key=058339bb21a2c42f14979fd8151aeccf&language=pt-BR

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/'
})

export default api;