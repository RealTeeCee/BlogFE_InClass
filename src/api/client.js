import axios from "axios";

const apiURL = axios.create({
  baseURL: "http://localhost:8080/",
  withCredentials: true,
  auth: { username: "user", password: "password" },
});

export default apiURL;
