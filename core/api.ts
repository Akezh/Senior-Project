import axios from "axios";
import { useMemo } from "react";

import { useRoleProvider } from "../providers";
import { API_URL } from "./config";
import {
  AddProblemPayloadDTO,
  AddProblemToTrackPayloadDTO,
  AddTrackPayloadDTO,
  CommonResponseDTO,
  GetAllProblemsDTO,
  GetProblemByIdResponseDTO,
  GetTrackByIdResponseDTO,
  GetTracksResponseDTO,
  LoginPayloadDTO,
  LoginResponseDTO,
  RegisterPayloadDTO,
  RegisterResponseDTO,
} from "./types";

export const useAPIService = () => {
  const { state } = useRoleProvider();

  const config = useMemo(() => {
    const headers: Record<string, string> = { ContentType: "application/json" };

    if (state.token.startsWith("ey")) {
      headers["Authorization"] = `Bearer ${state.token}`;
    }

    return headers;
  }, [state]);

  const login = async (data: LoginPayloadDTO) => {
    try {
      const response = await axios.post(`${API_URL}/auth/authenticate`, data);
      return response.data;
    } catch (error) {
      console.log("Error occured: ", error);
    }
  };

  const register = async (data: RegisterPayloadDTO) => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/register`,
        data,
        config
      );
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

  const addProblemToTrack = async (data: AddProblemToTrackPayloadDTO) => {
    try {
      const response = await axios.post<CommonResponseDTO>(
        `${API_URL}/track/problem`,
        data,
        config
      );
      return response.data;
    } catch (error) {
      console.log("Error occurred when adding a problem: ", error);
    }
  };

  const deleteProblemFromTrack = async (data: AddProblemToTrackPayloadDTO) => {
    try {
      const response = await axios.post<CommonResponseDTO>(
        `${API_URL}/track/${data.trackId}/problem/${data.problemId}/delete`,
        {},
        config
      );
      return response.data;
    } catch (error) {
      console.log("Error occurred when adding a problem: ", error);
    }
  };

  const getAllProblems = async () => {
    try {
      const response = await axios.get<GetAllProblemsDTO>(
        `${API_URL}/problem`,
        config
      );
      return response.data;
    } catch (error) {
      console.log("Error occured when getting problem with id: ", error);
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
    addProblemToTrack,
    deleteProblemFromTrack,
    getAllProblems,
    getProblemById,
    addTrack,
    getTrackById,
    getTracks,
  };
};
