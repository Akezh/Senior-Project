import axios from "axios";

export const API_URL = "http://158.160.1.84/api/v1";

export const axiosApi = axios.create({ baseURL: API_URL });
