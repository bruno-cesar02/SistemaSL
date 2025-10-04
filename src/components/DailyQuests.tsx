// src/components/DailyQuests.tsx

import React from 'react';
import { FaRegSquare, FaCheckSquare } from 'react-icons/fa';

// Definimos o formato dos dados que o componente recebe
interface Quest {
  id: number;
  text: string;
  completed: boolean;
}

interface DailyQuestsProps {
  quests: Quest[];
  onToggleQuest: (id: number) => void;
}

export function DailyQuests({ quests, onToggleQuest }: DailyQuestsProps) {
  return (
    <div className="bg-gray-800/70 border border-sky-500/30 rounded-lg p-6 shadow-[0_0_15px_rgba(56,189,248,0.4)] h-full">
      <h2 className="text-xl font-bold text-sky-300 mb-4 flex justify-between items-center">
        <span>MISSÕES DIÁRIAS [OBRIGATÓRIAS]</span>
        <span className="text-sm font-normal text-yellow-400">[Tempo Restante: 14:15:09]</span>
      </h2>
      
      <ul className="space-y-4">
        {quests.map((quest) => (
          <li
            key={quest.id}
            onClick={() => onToggleQuest(quest.id)} // Agora ele chama a função que veio do App
            className={`flex items-center p-3 rounded-md transition-all cursor-pointer hover:bg-sky-500/20 ${
              quest.completed
                ? 'bg-green-500/10 text-gray-500 line-through'
                : 'bg-sky-500/10 text-gray-200'
            }`}
          >
            {quest.completed ? <FaCheckSquare className="text-green-400 mr-4 flex-shrink-0" size={20} /> : <FaRegSquare className="text-sky-400 mr-4 flex-shrink-0" size={20} />}
            <span>{quest.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}