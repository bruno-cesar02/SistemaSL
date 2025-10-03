// src/App.tsx

import React from 'react';
import { DailyQuests } from './components/DailyQuests';
import { PlayerStatus } from './components/PlayerStatus';
import { StatsPanel } from './components/StatsPanel'; // <-- NOSSO NOVO IMPORT

// Dados Falsos para a Fase 1
const playerData = {
  name: 'Bruno',
  title: '[O Despertado]',
  level: 1,
  hp: '80 / 80 kg',
  mp: '100 / 100',
};

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-mono p-4 sm:p-8 flex flex-col items-center">
      <header className="w-full max-w-4xl mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-sky-400 text-center" style={{textShadow: '0 0 8px rgba(59, 130, 246, 0.8)'}}>
          SISTEMA DE APOIO AO JOGADOR
        </h1>
      </header>

      {/* ----- PAINEL DE STATUS PRINCIPAL ----- */}
      <div className="w-full max-w-4xl bg-gray-800/70 border border-sky-500/30 rounded-lg p-6 shadow-[0_0_15px_rgba(56,189,248,0.4)] mb-8">
        <h2 className="text-xl font-bold text-sky-300 mb-4 border-b border-sky-500/20 pb-2">PAINEL DO JOGADOR</h2>
        <PlayerStatus playerData={playerData} />
      </div>

      <main className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna Esquerda: Missões Diárias */}
        <div className="lg:col-span-2">
          <DailyQuests /> 
        </div>

        {/* Coluna Direita: Stats e Inventário */}
        <div className="space-y-8">
          <div className="bg-gray-800/70 border border-sky-500/30 rounded-lg p-6 shadow-[0_0_15px_rgba(56,189,248,0.4)]">
            <h2 className="text-xl font-bold text-sky-300 mb-4">ATRIBUTOS</h2>
            <StatsPanel /> {/* <-- AQUI ESTÁ O NOSSO NOVO COMPONENTE! */}
          </div>
          <div className="bg-gray-800/70 border border-sky-500/30 rounded-lg p-6 shadow-[0_0_15px_rgba(56,189,248,0.4)]">
            <h2 className="text-xl font-bold text-sky-300 mb-4">INVENTÁRIO</h2>
             <p className="text-gray-400">// TODO: Criar componente Inventory.tsx</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;