import { Check, Flame, Trophy, Calendar } from 'lucide-react';

export default function EarnRewardsView() {
  // Mock data for UI development (We will replace this with Supabase data later)
  const userData = {
    points: 5,
    goal: 5000,
    streak: 1,
    claimedToday: true,
  };

  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const currentDayIndex = 6; // Sunday (0-6 scale or 1-7 depending on pref)

  return (
    <div className="space-y-8">
      
      {/* Section Header */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-6 bg-purple-600 rounded-full"></div>
          <h2 className="text-xl font-bold text-gray-900">Your Rewards Journey</h2>
        </div>

        {/* 3-Column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Points Balance */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-full">
            <div className="flex items-center gap-2 text-purple-700 font-semibold mb-4">
              <Trophy size={20} />
              <span>Points Balance</span>
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <span className="text-4xl font-bold text-purple-600">{userData.points}</span>
              <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center shadow-sm">
                <span className="text-yellow-100 text-xl">★</span> {/* Simple Star Icon */}
              </div>
            </div>

            <div className="mt-auto">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>Progress to $5 Gift Card</span>
                <span>{userData.points}/{userData.goal}</span>
              </div>
              {/* Progress Bar Container */}
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${(userData.points / userData.goal) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                🚀 Just getting started — keep earning points!
              </p>
            </div>
          </div>

          {/* Card 2: Daily Streak */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col h-full">
            <div className="flex items-center gap-2 text-blue-500 font-semibold mb-4">
              <Calendar size={20} />
              <span>Daily Streak</span>
            </div>

            <div className="flex items-end gap-2 mb-6">
              <span className="text-4xl font-bold text-purple-600">{userData.streak} day</span>
              {userData.streak > 3 && <Flame className="text-orange-500 mb-1" fill="currentColor" />}
            </div>

            {/* Week Circles */}
            <div className="flex justify-between mb-6">
              {weekDays.map((day, index) => {
                // Logic: Active if index is today, Completed if index < today
                const isToday = index === currentDayIndex;
                const isCompleted = index <= currentDayIndex; // Simplified logic for demo
                
                return (
                  <div key={index} className="flex flex-col items-center gap-2">
                     <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors
                        ${isToday 
                          ? 'bg-purple-600 text-white ring-2 ring-purple-200' 
                          : isCompleted 
                            ? 'bg-gray-100 text-gray-400' 
                            : 'bg-gray-50 text-gray-300'
                        }`}
                     >
                       {isToday && userData.claimedToday ? <Check size={14} /> : day}
                     </div>
                  </div>
                );
              })}
            </div>

            <button
              disabled={userData.claimedToday}
              className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors mt-auto
                ${userData.claimedToday 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'bg-purple-600 text-white hover:bg-purple-700 shadow-md hover:shadow-lg'
                }`}
            >
              {userData.claimedToday ? (
                <>
                  <Flame size={18} /> Claimed Today
                </>
              ) : (
                'Claim Daily Points'
              )}
            </button>
          </div>

          {/* Card 3: Featured Spotlight (Purple Gradient) */}
          <div className="relative overflow-hidden rounded-2xl p-6 text-white flex flex-col h-full bg-linear-to-br from-purple-600 to-indigo-600">
             {/* Decorative Background Shapes */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
             <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-500 opacity-20 rounded-full -ml-10 -mb-10 blur-xl"></div>

             <div className="relative z-10">
                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                  Featured
                </span>
                
                <h3 className="text-xl font-bold mt-4 mb-1">Top Tool Spotlight</h3>
                <p className="font-medium text-purple-100 mb-4">Reclaim</p>

                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm mb-6 border border-white/10">
                   <p className="text-sm text-purple-50 leading-relaxed">
                     Automate and Optimize Your Schedule. Reclaim.ai is an AI-powered calendar assistant...
                   </p>
                </div>

                <div className="flex gap-3 mt-auto">
                   <button className="flex-1 bg-white text-purple-700 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors">
                     Sign up
                   </button>
                   <button className="flex-1 bg-purple-500/50 text-white py-2 rounded-lg text-sm font-bold border border-purple-400/30 hover:bg-purple-500/70 transition-colors flex items-center justify-center gap-2">
                     <Trophy size={14} /> Claim 50 pts
                   </button>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}