export type IsoDateTimeString = string;

export type MatchStatus = "scheduled" | "live" | "finished";

export type SportCategory = string;

export interface Match {
  id: number;
  sport: SportCategory;
  homeTeam: string;
  awayTeam: string;
  status: MatchStatus;
  startTime: IsoDateTimeString;
  endTime: IsoDateTimeString | null;
  homeScore: number;
  awayScore: number;
  createdAt: IsoDateTimeString;
}

export interface Commentary {
  id: number;
  matchId: number;
  minute: number;
  sequence: number;
  period: string;
  eventType: string;
  actor: string | null;
  team: string | null;
  message: string;
  metadata: Record<string, unknown> | null;
  tags: string[] | null;
  createdAt: IsoDateTimeString;
}

export interface ApiResponse<T> {
  data: T;
}

export interface ApiErrorResponse {
  error: string;
  details?: unknown;
  detail?: unknown;
}
