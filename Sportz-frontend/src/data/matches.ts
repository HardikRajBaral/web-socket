import type { Match } from "../../types.ts";

const now = Date.now();

export const matchesPayload: Match[] = [
  {
    id: 101,
    sport: "football",
    homeTeam: "Manchester City",
    awayTeam: "Arsenal",
    status: "live",
    startTime: new Date(now - 55 * 60 * 1000).toISOString(),
    endTime: null,
    homeScore: 2,
    awayScore: 1,
    createdAt: new Date(now - 70 * 60 * 1000).toISOString(),
  },
  {
    id: 102,
    sport: "cricket",
    homeTeam: "India",
    awayTeam: "Australia",
    status: "scheduled",
    startTime: new Date(now + 35 * 60 * 1000).toISOString(),
    endTime: null,
    homeScore: 0,
    awayScore: 0,
    createdAt: new Date(now - 6 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 103,
    sport: "basketball",
    homeTeam: "Lakers",
    awayTeam: "Celtics",
    status: "finished",
    startTime: new Date(now - 3 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(now - 40 * 60 * 1000).toISOString(),
    homeScore: 112,
    awayScore: 108,
    createdAt: new Date(now - 4 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 104,
    sport: "tennis",
    homeTeam: "Carlos Alcaraz",
    awayTeam: "Novak Djokovic",
    status: "live",
    startTime: new Date(now - 28 * 60 * 1000).toISOString(),
    endTime: null,
    homeScore: 1,
    awayScore: 1,
    createdAt: new Date(now - 60 * 60 * 1000).toISOString(),
  },
];
