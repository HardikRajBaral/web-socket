import {useState} from "react";
import MatchCard from "../components/MatchCard.tsx";
import type {Commentary, Match} from "../types.ts";
import LiveFeed from "../components/LiveFeed.tsx";

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
   {
    id: 1,
    sport: "football",
    homeTeam: "Home Team 2 ",
    awayTeam: "Away Team 2 ",
    status: "live",
    startTime: new Date().toISOString(),
    endTime: null,
    homeScore: 2,
    awayScore: 1,
    createdAt: new Date().toISOString(),
  },

];

const messages: Commentary[] = [
  {
    id: 1,
    matchId: 1,
    createdAt: new Date().toISOString(),
    minute: 12,
    sequence: 1,
    period: '1st Half',
    eventType: 'Goal',
    actor: 'Erling Haaland',
    team: 'Man City',
    message: 'Haaland finishes a low cross from the left flank into the bottom corner!',
    metadata: { xg: 0.42, distance: '6yd', bodyPart: 'right foot' },
    tags: ['goal', 'highlight'],
  },
  {
    id: 2,
    matchId: 1,
    createdAt: new Date(Date.now() - 60_000).toISOString(),
    minute: 1,
    sequence: 0,
    period: '1st Half',
    eventType: 'Kickoff',
    actor: null,
    team: null,
    message: 'The match is underway at the Etihad.',
    metadata: null,
    tags: null,
  },
  {
    id: 3,
    matchId: 1,
    createdAt: new Date(Date.now() - 120_000).toISOString(),
    minute: 8,
    sequence: 2,
    period: '1st Half',
    eventType: 'Substitution',
    actor: null,
    team: 'Arsenal',
    message: 'Injury delay — medical staff on the pitch.',
    metadata: null,
    tags: null,
  },
  {
    id: 4,
    matchId: 1,
    createdAt: new Date(Date.now() - 180_000).toISOString(),
    minute: 0,
    sequence: 3,
    period: '1st Half',
    eventType: 'Info',
    actor: null,
    team: null,
    message: 'Commentary feed connected.',
    metadata: null,
    tags: null,
  },
  {
    id: 5,
    matchId: 1,
    createdAt: new Date(Date.now() - 240_000).toISOString(),
    minute: 34,
    sequence: 4,
    period: '1st Half',
    eventType: 'Shot',
    actor: 'Bukayo Saka',
    team: 'Arsenal',
    message: 'Saka cuts inside and curls one just over the bar.',
    metadata: { xg: 0.18, onTarget: false },
    tags: [],
  },
  {
    id: 6,
    matchId: 1,
    createdAt: new Date(Date.now() - 300_000).toISOString(),
    minute: 45,
    sequence: 5,
    period: '1st Half',
    eventType: 'Card',
    actor: 'Declan Rice',
    team: 'Arsenal',
    message: 'Yellow card shown for a late challenge.',
    metadata: null,
    tags: ['card', 'foul'],
  },
  {
    id: 7,
    matchId: 1,
    createdAt: new Date(Date.now() - 90_000).toISOString(),
    minute: 46,
    sequence: 6,
    period: '2nd Half',
    eventType: 'Kickoff',
    actor: null,
    team: null,
    message: 'Second half is underway.',
    metadata: null,
    tags: null,
  },
  {
    id: 8,
    matchId: 1,
    createdAt: new Date(Date.now() - 30_000).toISOString(),
    minute: 78,
    sequence: 7,
    period: '2nd Half',
    eventType: 'VAR',
    actor: 'Referee',
    team: null,
    message: 'VAR review in progress for a potential penalty after a coming-together in the box — this could take a few minutes to resolve.',
    metadata: { reviewType: 'penalty', duration: '2m 40s' },
    tags: ['var', 'review', 'penalty', 'controversial'],
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
          <div className={'flex gap-4 mt-12'}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4  w-3/5 ">
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
          <div className={'w-2/5 shrink-0 '}>
            <LiveFeed messages={messages} isActive={!!activeMatchId} isLoading={false} />
          </div>
          </div>
      </main>
  )
}

