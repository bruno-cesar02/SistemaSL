// src/components/PlayerStatus.tsx

import React from 'react';

// Definimos o "formato" dos dados que este componente espera receber
interface PlayerData {
  name: string;
  title: string;
  level: number;
  hp: string;
  mp: string;
}

interface PlayerStatusProps {
  playerData: PlayerData;
}

export function PlayerStatus({ playerData }: PlayerStatusProps) {
  return (
    // Usamos flexbox para organizar os itens
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      
      {/* Seção Esquerda: Nível e Nome */}
      <div>
        <p className="text-gray-400 text-sm">Nível {playerData.level}</p>
        <h3 className="text-2xl font-bold text-white">{playerData.name}</h3>
        <p className="text-yellow-400">{playerData.title}</p>
      </div>

      {/* Seção Direita: Barras de HP e MP */}
      <div className="w-full sm:w-1/2 space-y-3">
        {/* Barra de HP */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-bold text-red-400">HP</span>
            <span>{playerData.hp}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>

        {/* Barra de MP */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-bold text-blue-400">MP</span>
            <span>{playerData.mp}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>
      </div>

    </div>
  );
}