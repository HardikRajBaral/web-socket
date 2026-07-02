import type {Match} from "../types.ts";

interface MatchCardProps {
    match: Match;
    isActive: boolean;
    onWatch: (id: string | number) => void;
    onUnwatch: (id: string | number) => void;
}


export default function MatchCard({match,isActive,onWatch,onUnwatch}: MatchCardProps) {
    const status = (match.status).toLowerCase()
    const isLive = status === "live";
    const  matchId = match.id;

    const actionLabel=(()=>{
        if(isLive){
            return isActive ? 'Watching Live' : "Watch Live"
        }
        if(status === 'finished'){
            return isActive? 'Viewing Recap': 'View Recap'
        }
        return isActive? 'Viewing match' : 'Watch Match'
    })()
    return (
        <div className={'bg-yellow-200 w-full max-w-md p-4 rounded-2xl shadow-md'}>
                <div className={'flex justify-between items-center gap-4 p-2'}>
                    <span className={'inline-flex items-center px-3 py-1 rounded-full bg-linear-to-r from-emerald-700 to-teal-700 text-white text-xs font-semibold uppercase tracking-wide shadow-sm border border-white/30'}>{match.sport}</span>
                <div className={'h-8 flex items-center px-3 bg-white border border-gray-600 rounded-md gap-2'}>
                    <div className={'w-3 h-3 rounded-full border bg-green-400'} />
                    <span className={'text-sm rounded-full capitalize'}>{match.status}</span>
                </div>
            </div>

            {/* teams ans score*/}
           <div className={'flex flex-col gap-3 py-4'}>
               <div className={'grid grid-cols-[1fr_56px] items-center justify-center gap-4'}>
                   <h2 className={'text-lg font-medium truncate'}>{match.homeTeam}</h2>
                   <p className={'h-12 flex items-center justify-center bg-white border border-gray-600 rounded-md font-semibold'}>{match.homeScore}</p>
               </div>
               <div className={'grid grid-cols-[1fr_56px] items-center gap-4'}>
                   <h2 className={'text-lg font-medium truncate'}>{match.awayTeam}</h2>
                   <p className={'h-12 flex items-center justify-center bg-white border border-gray-600 rounded-md font-semibold'}>{match.awayScore}</p>
               </div>
           </div>
            <div className={'flex justify-between items-center gap-4 pt-2'}>
                <span className={'text-sm font-light'}>
                    {new Date(match.startTime).toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`})}
                </span>
                <button className={'h-10 bg-green-600 px-4 text-white font-medium rounded-md'} onClick={() => isActive ? onUnwatch(matchId) : onWatch(matchId)}>
                    {actionLabel}
                </button>
            </div>
        </div>
    )
}
