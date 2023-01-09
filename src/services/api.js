import axios from "axios";

//BaseURL: https://api.themoviedb.org/3/
//URL API: /movie/now_playing?api_key=1dfa62bb1b83007161dcee66d24b55b8

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

export default api;
