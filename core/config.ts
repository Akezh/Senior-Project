import axios from "axios";

export const API_URL = "http://34.88.155.240:8080/api/v1";
// export const API_URL = "https://2ad9-178-91-253-103.ngrok-free.app/api/v1";

export const axiosApi = axios.create({ baseURL: API_URL });
