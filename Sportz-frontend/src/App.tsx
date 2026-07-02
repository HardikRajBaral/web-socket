import {useMemo, useState} from "react";
import MatchCard from "../components/MatchCard.tsx";
import LiveFeed from "../components/LiveFeed.tsx";
import { commentaryPayload } from "./data/commentary.ts";
import { matchesPayload } from "./data/matches.ts";


export default function App() {
  const [activeMatchId, setActiveMatchId] = useState<number | string | null>(null);

  const activeMessages = useMemo(() => {
    if (activeMatchId === null) {
      return [];
    }

    const normalizedId = Number(activeMatchId);
    return commentaryPayload
      .filter((message) => message.matchId === normalizedId)
      .sort((a, b) => b.sequence - a.sequence);
  }, [activeMatchId]);

  const watchMatch = (id: number | string) => {
    setActiveMatchId(id);
  };

  const unwatchMatch = () => {
    setActiveMatchId(null);
  };

  return (
        <main className={'h-screen w-full max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-8 flex flex-col'}>
          {/* header*/}
         <div className={'w-full shrink-0 bg-yellow-400 p-4 md:p-6 flex flex-col md:flex-row justify-between md:items-center gap-4 shadow-lg rounded-2xl'}>
             <div>
             <h1 className={'text-3xl md:text-4xl text-left font-bold'}>Welcome to the Sportz.</h1>
             <p className={'text-sm md:text-base text-gray-600 text-left mt-2'}>Catch every moment with live scores, match insights, and real-time commentary across multiple sports and competitions.</p>
             </div>
           <div className={'h-10 shrink-0 flex items-center bg-white border border-gray-600 rounded-md px-4 gap-2 shadow-md'}>
                 <div className={` w-3 h-3 rounded-full border border-black bg-green-400`} />
                 <span className={'text-md font-light'}>Live</span>
             </div>

          </div>
          <div className={'mt-6 grid flex-1 min-h-0 grid-cols-1 xl:grid-cols-5 gap-4 items-start'}>
          <div className="xl:col-span-3 min-h-0 xl:overflow-y-auto xl:pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-fr pb-1">
                  {matchesPayload.map((someMatch) => (
                    <MatchCard
                        key={someMatch.id}
                        match={someMatch}
                        isActive={activeMatchId === someMatch.id}
                        onWatch={watchMatch}
                        onUnwatch={unwatchMatch}
                       />
                  ))}
            </div>
          </div>
          <div className={'w-full xl:col-span-2 xl:h-full xl:min-h-0'}>
            <div className={'xl:sticky xl:top-0 xl:h-full'}>
              <LiveFeed messages={activeMessages} isActive={!!activeMatchId} isLoading={false} />
            </div>
          </div>
          </div>
      </main>
  )
}

