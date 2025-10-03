// src/components/StatsPanel.tsx

import React from 'react';
import { FaHeartbeat, FaRunning, FaFistRaised, FaBrain, FaBolt } from 'react-icons/fa';

// Dados Falsos para a Fase 1
const playerStats = {
  forca: 5,
  agilidade: 4,
  vitalidade: 6,
  inteligencia: 10,
  stamina: '8/10', // Vamos usar uma string para representar o estado atual vs máximo
};

// Um helper para associar cada stat a um ícone e cor
const statDetails = {
  forca: { icon: FaFistRaised, color: 'text-red-400' },
  agilidade: { icon: FaRunning, color: 'text-green-400' },
  vitalidade: { icon: FaHeartbeat, color: 'text-yellow-400' },
  inteligencia: { icon: FaBrain, color: 'text-blue-400' },
  stamina: { icon: FaBolt, color: 'text-purple-400' },
};


export function StatsPanel() {
  return (
    <div className="space-y-3">
      {/* Mapeamos os dados dos stats para criar uma linha para cada um */}
      {Object.entries(playerStats).map(([statName, statValue]) => {
        // Pegamos o ícone e a cor correspondente
        const IconComponent = statDetails[statName as keyof typeof statDetails].icon;
        const color = statDetails[statName as keyof typeof statDetails].color;

        return (
          <div key={statName} className="flex justify-between items-center text-gray-300">
            <div className={`flex items-center ${color}`}>
              <IconComponent className="mr-3" />
              <span className="capitalize font-semibold">{statName}</span>
            </div>
            <span className="font-bold text-white">{statValue}</span>
          </div>
        );
      })}
    </div>
  );
}