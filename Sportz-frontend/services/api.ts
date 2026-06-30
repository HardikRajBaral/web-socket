import type {ApiResponse, Commentary, Match} from "../types.ts";

const DEFAULT_API_BASE_URL = "http://localhost:8000";
const DEFAULT_WS_BASE_URL = "ws://localhost:8000/ws";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;
export const WS_BASE_URL =
  import.meta.env.VITE_WS_BASE_URL || DEFAULT_WS_BASE_URL;

export const MAX_RECONNECT_DELAY = 30000;//30s
export const INITIAL_RECONNECT_DELAY = 1000;//1s


export const fetchMatches = async (limit = 50): Promise<Match[]> => {
  const matchResponse = await fetch(`${API_BASE_URL}/matches?limit=${limit}`);

  if (!matchResponse.ok) {
    throw new Error(
      `API error: ${matchResponse.status} ${matchResponse.statusText}`,
    );
  }

  const response = (await matchResponse.json()) as ApiResponse<Match[]>;
  return response.data;
};


export const fetchComments = async (
  matchId: number | string,
  limit = 100,
): Promise<Commentary[]> => {
  const comments = await fetch(
    `${API_BASE_URL}/matches/${matchId}/commentary?limit=${limit}`,
  );

  if (!comments.ok) {
    throw new Error(
      `API error: ${comments.status} ${comments.statusText}`,
    );
  }

  const response = (await comments.json()) as ApiResponse<Commentary[]>;
  return response.data;
};
