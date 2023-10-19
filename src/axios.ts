import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:5000', // Replace with your backend URL
})

// instance.interceptors.request.use((config) => {
// 	config.headers.Authorization = window.localStorage.getItem("token");
// 	return config;
// });

export default instance
