// src/App.tsx

import React, { useState } from 'react'; // Importamos o useState aqui
import { DailyQuests } from './components/DailyQuests';
import { PlayerStatus } from './components/PlayerStatus';
import { StatsPanel } from './components/StatsPanel';
import { Inventory } from './components/Inventory';

// Nossos dados iniciais agora vivem no App
const initialPlayerData = {
  name: 'Bruno',
  title: '[O Despertado]',
  level: 1,
  hp: '80 / 80 kg',
  mp: '100 / 100',
};

const initialQuests = [
  { id: 1, text: 'Preparo Físico Obrigatório: 40 min de Cardio', completed: false },
  { id: 2, text: 'Hidratação do Caçador: Beber 2.5L de Água', completed: false },
  { id: 3, text: 'Nutrição Estratégica: Seguir o plano alimentar', completed: false },
];

function App() {
  // --- A INTELIGÊNCIA AGORA MORA AQUI ---

  // Criamos o estado para os dados do jogador e para as missões
  const [playerData, setPlayerData] = useState(initialPlayerData);
  const [quests, setQuests] = useState(initialQuests);
  
  // Novo estado para controlar o XP!
  const [xp, setXp] = useState(0);
  const xpToNextLevel = 100; // XP necessário para o próximo nível

  // A função de clique agora vive aqui, no cérebro do App
  const handleToggleQuest = (id: number) => {
    let xpGained = 0;

    const updatedQuests = quests.map(quest => {
      if (quest.id === id) {
        // Verificamos se a missão está sendo completada ou "descompletada"
        if (!quest.completed) {
          xpGained = 10; // Ganha 10 XP
        } else {
          xpGained = -10; // Perde 10 XP se desmarcar
        }
        return { ...quest, completed: !quest.completed };
      }
      return quest;
    });
    
    setQuests(updatedQuests);
    setXp(currentXp => currentXp + xpGained); // Atualizamos o XP
  };

  // --- O RESTO DO CÓDIGO É A APARÊNCIA ---

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-mono p-4 sm:p-8 flex flex-col items-center">
      <header className="w-full max-w-4xl mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-sky-400 text-center" style={{textShadow: '0 0 8px rgba(59, 130, 246, 0.8)'}}>
          SISTEMA DE APOIO AO JOGADOR
        </h1>
      </header>

      {/* Passamos o estado do XP para o PlayerStatus */}
      <div className="w-full max-w-4xl bg-gray-800/70 border border-sky-500/30 rounded-lg p-6 shadow-[0_0_15px_rgba(56,189,248,0.4)] mb-8">
        <h2 className="text-xl font-bold text-sky-300 mb-4 border-b border-sky-500/20 pb-2">PAINEL DO JOGADOR</h2>
        <PlayerStatus playerData={playerData} xp={xp} xpToNextLevel={xpToNextLevel} />
      </div>

      <main className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Passamos a lista de missões e a função de clique para o DailyQuests */}
        <div className="lg:col-span-2">
          <DailyQuests quests={quests} onToggleQuest={handleToggleQuest} /> 
        </div>

        <div className="space-y-8">
          <div className="bg-gray-800/70 border border-sky-500/30 rounded-lg p-6 shadow-[0_0_15px_rgba(56,189,248,0.4)]">
            <h2 className="text-xl font-bold text-sky-300 mb-4">ATRIBUTOS</h2>
            <StatsPanel />
          </div>
          <div className="bg-gray-800/70 border border-sky-500/30 rounded-lg p-6 shadow-[0_0_15px_rgba(56,189,248,0.4)]">
            <h2 className="text-xl font-bold text-sky-300 mb-4">INVENTÁRIO</h2>
            <Inventory />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;