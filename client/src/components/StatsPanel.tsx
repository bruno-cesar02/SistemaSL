// src/components/StatsPanel.tsx

import { FaHeartbeat, FaRunning, FaFistRaised, FaBrain } from 'react-icons/fa';
import { IoIosAddCircle } from "react-icons/io";

// Definimos os tipos de dados que o componente recebe
interface Stats {
  forca: number;
  agilidade: number;
  vitalidade: number;
  inteligencia: number;
}

interface StatsPanelProps {
  stats: Stats;
  onIncreaseStat: (statName: keyof Stats) => void;
  hasPoints: boolean;
}

const statDetails = {
  forca: { icon: FaFistRaised, color: 'text-red-400' },
  agilidade: { icon: FaRunning, color: 'text-green-400' },
  vitalidade: { icon: FaHeartbeat, color: 'text-yellow-400' },
  inteligencia: { icon: FaBrain, color: 'text-blue-400' },
};

export function StatsPanel({ stats, onIncreaseStat, hasPoints }: StatsPanelProps) {
  return (
    <div className="space-y-3">
      {Object.entries(stats).map(([statName, statValue]) => {
        const IconComponent = statDetails[statName as keyof typeof statDetails].icon;
        const color = statDetails[statName as keyof typeof statDetails].color;

        return (
          // O div principal agora pode ser clicado se tiver pontos
          <div
            key={statName}
            onClick={() => hasPoints && onIncreaseStat(statName as keyof Stats)}
            className={`flex justify-between items-center p-2 rounded-md ${hasPoints ? 'cursor-pointer hover:bg-sky-500/20' : ''}`}
          >
            <div className={`flex items-center ${color}`}>
              <IconComponent className="mr-3" />
              <span className="capitalize font-semibold">{statName}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-bold text-white">{statValue}</span>
              {/* O botão de '+' só aparece se tivermos pontos */}
              {hasPoints && <IoIosAddCircle className="text-sky-400" />}
            </div>
          </div>
        );
      })}
    </div>
  );
}