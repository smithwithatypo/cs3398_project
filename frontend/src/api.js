import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const BASE_URL = process.env.BASE_URL;

const api = axios.create({
    baseURL: BASE_URL
  });


export default api;