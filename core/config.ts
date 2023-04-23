import axios from "axios";

export const API_URL = "http://158.160.1.84:8080/api/v1";
// export const API_URL = "https://26c4-87-255-216-103.ngrok-free.app/api/v1";

export const axiosApi = axios.create({ baseURL: API_URL });
