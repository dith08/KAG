import axios from "axios";

const api = axios.create({
  baseURL: "https://kag.rplrus.com",
  headers: {
    'Authorization': `Bearer ${localStorage.getItem("token")}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export default api;
