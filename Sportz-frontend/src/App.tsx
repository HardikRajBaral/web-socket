import {useState} from "react";
import MatchCard from "../components/MatchCard.tsx";
import type {Match} from "../types.ts";

const matches: Match[] = [
  {
    id: 1,
    sport: "football",
    homeTeam: "Home Team ",
    awayTeam: "Away Team ",
    status: "live",
    startTime: new Date().toISOString(),
    endTime: null,
    homeScore: 2,
    awayScore: 1,
    createdAt: new Date().toISOString(),
  },
];

export default function App() {
  const [activeMatchId, setActiveMatchId] = useState<number | string | null>(null);

  const watchMatch = (id: number | string) => {
    setActiveMatchId(id);
  };

  const unwatchMatch = () => {
    setActiveMatchId(null);
  };

  return (
      <main className={'min-h-full m-12'}>
          {/* header*/}
         <div className={'w-full bg-yellow-400 p-4 flex justify-between items-center shadow-lg rounded-2xl'}>
             <div>
                 <h1 className={'text-4xl text-left mt-4 font-bold'}>Welcome to the Sportz.</h1>
                 <p className={'text-md text-gray-500 text-left p-2'}>Catch every moment with live scores, match insights, and real-time commentary across multiple sports and competitions.</p>
             </div>
             <div className={'h-10 flex items-center bg-white border border-gray-600 rounded-md px-4 gap-2 shadow-md'}>
                 <div className={` w-3 h-3 rounded-full border border-black bg-green-400`} />
                 <span className={'text-md font-light'}>Live</span>
             </div>

          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matches.map((someMatch) => (
                  <MatchCard
                      key={someMatch.id}
                      match={someMatch}
                      isActive={activeMatchId === someMatch.id}
                      onWatch={watchMatch}
                      onUnwatch={unwatchMatch}
                     />
                 ))}
          </div>
      </main>
  )
}

