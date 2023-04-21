export type LoginPayloadDTO = {
  email: string;
  password: string;
};

export type LoginResponseDTO = {
  username: string;
  fullname: string;
  email: string;
  token: string;
};

export type RegisterPayloadDTO = {
  fullname: string;
  email: string;
  password: string;
  userType: string;
};

export type RegisterResponseDTO = {
  token: string;
};

export type AddProblemPayloadDTO = {
  title: string;
  category: string;
  difficulty: string;
  description: string;
  solution: string;
  testCases: string;
};

export type AddProblemToTrackPayloadDTO = {
  trackId: string;
  problemId: string;
};

export type CommonResponseDTO = {
  message: string;
};

export type GetAllProblemsDTO = Array<{
  id: number | string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  statement: string;
  solution: string;
}>;

export type GetProblemByIdResponseDTO = {
  id: number;
  title: string;
  category: string;
  difficulty: string;
  description: string;
  solution: string;
  testCases: string;
};

export type AddTrackPayloadDTO = {
  title: string;
  description: string;
  category: string;
  numberOfProblems: number;
};

export type GetTrackByIdResponseDTO = {
  id: number;
  title: string;
  category: string;
  difficulty: string;
  description: string;
  solution: string;
  testCases: string;
};

export type GetTracksResponseDTO = Array<{
  id: number;
  title: string;
  description: string;
  category: string;
  numberOfProblems: number;
}>;
