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
        <div>
            <div>
                {match.sport}
                <span>{match.status}</span>
            </div>
           <div>
               <h2>{match.homeTeam} vs {match.awayTeam}</h2>
               <p>{match.homeScore} - {match.awayScore}</p>
           </div>
            <div>
                <span>
                    {new Date(match.startTime).toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`})}
                </span>
                <button onClick={() => isActive ? onUnwatch(matchId) : onWatch(matchId)}>
                    {actionLabel}
                </button>
            </div>
        </div>
    )
}
