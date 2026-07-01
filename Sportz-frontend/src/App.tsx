import MatchCard from "../components/MatchCard.tsx";
import type {Match} from "../types.ts";

const someMatch: Match = {
  id: 1,
  sport: "football",
  homeTeam: "Home Team",
  awayTeam: "Away Team",
  status: "live",
  startTime: new Date().toISOString(),
  endTime: null,
  homeScore: 2,
  awayScore: 1,
  createdAt: new Date().toISOString(),
};

function App() {
  return (
      <>
          <h1>Welcome to the Sportz          </h1>
          <p>Catch every moment with live scores, match insights, and real-time commentary across multiple sports and competitions.</p>

          <MatchCard
              match={someMatch}
              isActive={false}
              onWatch={(id) => console.log(id)}
              onUnwatch={(id) => console.log(id)}
          />
      </>
  )
}

export default App
