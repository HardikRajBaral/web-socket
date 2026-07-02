import type { Commentary } from "../types";

interface LiveFeedProps {
    messages: Commentary[];
    isActive: boolean;
    isLoading: boolean;
}

const formatMinute =(minute?: number) => {
    if (minute === undefined || minute === null) {
        return null;
    }
    return `${minute}'`;
}

const formatMetadata = (metadata?: Record<string, unknown> | null) => {
  if (!metadata || Object.keys(metadata).length === 0) {
    return null;
  }
  try {
    return JSON.stringify(metadata);
  } catch {
    return null;
  }
};

export default function LiveFeed({ messages, isActive, isLoading }: LiveFeedProps){
   if(!isActive){
    return(
      <div className="h-88 lg:h-105 xl:h-full flex flex-col items-center justify-center text-center p-8 bg-yellow-100 border-2 border-black rounded-2xl border-dashed shadow-md">
        <div className="w-16 h-16 bg-yellow-400 rounded-full border-2 border-black flex items-center justify-center mb-4 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="font-bold text-xl mb-2">No Match Selected</h3>
        <p className="text-gray-600 max-w-xs">Select a match from the list to view live commentary and real-time updates.</p>
      </div>
    )
   }
   return(
    <div className="h-88 lg:h-105 xl:h-full bg-yellow-100 border border-black rounded-2xl shadow-md p-4 flex flex-col overflow-hidden">
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-black/15">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
                Live Commentary
            </h3>
            <span className="text-sm text-gray-600">
                Real time updates and insights from the match.
            </span>
          </div>
          <span className="inline-flex items-center gap-2 h-8 px-3 rounded-full bg-white border border-gray-600 text-xs font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 border border-black" />
            Live Feed
          </span>
        </div>
        <div className="mt-4 flex-1 min-h-0 space-y-3 overflow-y-auto pr-1">
           {isLoading ? (
          <div className="text-center py-10 text-gray-500 italic bg-white border border-gray-300 rounded-xl">
            Loading commentary...
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-10 text-gray-500 italic bg-white border border-gray-300 rounded-xl">
            Waiting for updates...
          </div>
        ):(
            messages.map((msg)=>{
                const timestamp = msg.createdAt ? new Date(msg.createdAt) :new Date()
                const minuteLabel = formatMinute(msg.minute)
                const metadataLabel= formatMetadata(msg.metadata)
                return(
                    <div key={msg.id} className="animate-in fade-in slide-in-from-top-2 duration-300 bg-white border border-gray-300 rounded-xl p-3 shadow-sm">
                <div className="flex gap-3">
                  <div className="flex flex-col items-center gap-1 mt-1">
                     <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 border border-black"></div>
                     <div className="w-0.5 h-full bg-gray-300"></div>
                  </div>
                  <div className="w-full">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-1">
                      <span className="font-mono text-gray-500">
                        {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </span>
                      {minuteLabel && (
                        <span className="px-2 py-0.5 bg-gray-100 border border-gray-300 rounded-full font-semibold">
                          {minuteLabel}
                        </span>
                      )}
                      {msg.sequence !== undefined && msg.sequence !== null && (
                        <span className="px-2 py-0.5 bg-gray-100 border border-gray-300 rounded-full font-semibold">
                          Seq {msg.sequence}
                        </span>
                      )}
                      {msg.period && (
                        <span className="px-2 py-0.5 bg-gray-100 border border-gray-300 rounded-full">
                          {msg.period}
                        </span>
                      )}
                      {msg.eventType && (
                        <span className="px-2 py-0.5 bg-yellow-300 border border-black rounded-full font-semibold uppercase tracking-wide text-[10px]">
                          {msg.eventType}
                        </span>
                      )}
                    </div>
                    {(msg.actor || msg.team) && (
                      <div className="text-xs font-semibold text-gray-700 mb-2">
                        {msg.actor ? msg.actor : 'Unknown'}{msg.team ? ` · ${msg.team}` : ''}
                      </div>
                    )}
                    <p className="text-sm font-medium text-gray-800 leading-relaxed bg-yellow-50 p-3 rounded-xl rounded-tl-none border border-gray-300">
                      {msg.message}
                    </p>
                    {metadataLabel && (
                      <div className="mt-2 text-[11px] font-mono text-gray-600 bg-gray-50 border border-gray-300 px-2 py-1 rounded">
                        {metadataLabel}
                      </div>
                    )}
                    {msg.tags && msg.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {msg.tags.map((tag) => (
                          <span key={`${msg.id}-${tag}`} className="text-[10px] uppercase tracking-wide text-gray-600 bg-gray-100 border border-gray-300 px-2 py-0.5 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
   )
}