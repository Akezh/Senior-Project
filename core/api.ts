import axios from "axios";
import { useEffect, useMemo } from "react";

import useLocalStorage from "../src/hooks/useLocalStorage";
import { API_URL } from "./config";
import {
  AddProblemPayloadDTO,
  AddTrackPayloadDTO,
  CommonResponseDTO,
  GetProblemByIdResponseDTO,
  GetTrackByIdResponseDTO,
  GetTracksResponseDTO,
  LoginPayloadDTO,
  LoginResponseDTO,
  RegisterPayloadDTO,
  RegisterResponseDTO,
} from "./types";

export const useAPIService = () => {
  const [token, setToken] = useLocalStorage("access_token", "");

  useEffect(() => {
    if (window) {
      const accessToken = window.localStorage.getItem("access_token");
      setToken(accessToken || "");
    }
  }, [setToken]);

  const config = useMemo(() => {
    const headers: Record<string, string> = { ContentType: "application/json" };

    if (token.startsWith("ey")) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
  }, [token]);

  const login = async (data: LoginPayloadDTO) => {
    try {
      const response = await axios.post<LoginResponseDTO>(
        `${API_URL}/auth/authenticate`,
        data
      );
      setToken(response.data.token);
      return response.data;
    } catch (error) {
      console.log("Error occured: ", error);
    }
  };

  const register = async (data: RegisterPayloadDTO) => {
    try {
      const response = await axios.post<RegisterResponseDTO>(
        `${API_URL}/auth/register`,
        data,
        config
      );
      setToken(response.data.token);
      return response.data;
    } catch (error) {
      console.log("Error occurred when signing up: ", error);
    }
  };

  const addProblem = async (data: AddProblemPayloadDTO) => {
    try {
      const response = await axios.post<CommonResponseDTO>(
        `${API_URL}/auth/problem`,
        data,
        config
      );
      return response.data;
    } catch (error) {
      console.log("Error occurred when adding a problem: ", error);
    }
  };

  const getProblemById = async (id: number) => {
    try {
      const response = await axios.get<GetProblemByIdResponseDTO>(
        `${API_URL}/problem/${id}`,
        config
      );
      return response.data;
    } catch (error) {
      console.log("Error occured when getting problem with id: ", error);
    }
  };

  const addTrack = async (data: AddTrackPayloadDTO) => {
    try {
      const response = await axios.post<CommonResponseDTO>(
        `${API_URL}/auth/track`,
        data,
        config
      );
      return response.data;
    } catch (error) {
      console.log("Error occurred when adding a track: ", error);
    }
  };

  const getTrackById = async (id: number) => {
    try {
      const response = await axios.get<GetTrackByIdResponseDTO>(
        `${API_URL}/track/${id}`,
        config
      );
      return response.data;
    } catch (error) {
      console.log("Error occured when getting track with id: ", error);
    }
  };

  const getTracks = async () => {
    try {
      const response = await axios.get<GetTracksResponseDTO>(
        `${API_URL}/track`,
        config
      );
      return response.data;
    } catch (error) {
      console.log("Error occured when getting tracks: ", error);
    }
  };

  return {
    login,
    register,
    addProblem,
    getProblemById,
    addTrack,
    getTrackById,
    getTracks,
  };
};
