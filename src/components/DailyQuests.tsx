import React from 'react';
import { FaRegSquare, FaCheckSquare } from 'react-icons/fa'; // Ícones de caixa

// Dados Falsos para a Fase 1
const quests = [
  { id: 1, text: 'Preparo Físico Obrigatório: 40 min de Cardio', completed: true },
  { id: 2, text: 'Hidratação do Caçador: Beber 2.5L de Água', completed: false },
  { id: 3, text: 'Nutrição Estratégica: Seguir o plano alimentar', completed: false },
];

export function DailyQuests() {
  return (
    <div className="bg-gray-900/50 border border-sky-500/30 rounded-lg p-6 shadow-[0_0_15px_rgba(56,189,248,0.4)] h-full">
      <h2 className="text-xl font-bold text-sky-300 mb-4 flex justify-between items-center">
        <span>MISSÕES DIÁRIAS [OBRIGATÓRIAS]</span>
        <span className="text-sm font-normal text-yellow-400">[Tempo Restante: 14:15:09]</span>
      </h2>

      <ul className="space-y-4">
        {quests.map((quest) => (
          <li
            key={quest.id}
            className={`flex items-center p-3 rounded-md transition-all ${
              quest.completed
                ? 'bg-green-500/10 text-gray-500 line-through'
                : 'bg-sky-500/10 text-gray-200'
            }`}
          >
            {quest.completed ? (
              <FaCheckSquare className="text-green-400 mr-4 flex-shrink-0" size={20} />
            ) : (
              <FaRegSquare className="text-sky-400 mr-4 flex-shrink-0" size={20} />
            )}
            <span>{quest.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}