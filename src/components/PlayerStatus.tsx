// src/components/PlayerStatus.tsx

import React from 'react';

interface PlayerData {
  name: string;
  title: string;
  level: number;
  hp: string;
  mp: string;
}

interface PlayerStatusProps {
  playerData: PlayerData;
  xp: number;
  xpToNextLevel: number;
}

export function PlayerStatus({ playerData, xp, xpToNextLevel }: PlayerStatusProps) {
  const xpPercentage = (xp / xpToNextLevel) * 100;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      
      <div>
        <p className="text-gray-400 text-sm">Nível {playerData.level}</p>
        <h3 className="text-2xl font-bold text-white">{playerData.name}</h3>
        <p className="text-yellow-400">{playerData.title}</p>
      </div>

      <div className="w-full sm:w-1/2 space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-bold text-red-400">HP</span>
            <span>{playerData.hp}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-bold text-blue-400">MP</span>
            <span>{playerData.mp}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>
        
        {/* --- BARRA DE XP NOVA --- */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-bold text-yellow-400">XP</span>
            <span>{xp} / {xpToNextLevel}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div className="bg-yellow-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${xpPercentage}%` }}></div>
          </div>
        </div>
      </div>

    </div>
  );
}