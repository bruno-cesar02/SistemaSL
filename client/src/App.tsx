// client/src/App.tsx

import { useState, useEffect } from 'react';
import { DailyQuests } from "./components/DailyQuests";
import { PlayerStatus } from "./components/PlayerStatus";
import { StatsPanel } from "./components/StatsPanel";
import { Inventory } from "./components/Inventory";

// --- DADOS INICIAIS (Apenas como 'esqueleto' enquanto os dados carregam do servidor) ---
const initialPlayerData = { name: 'Carregando...', title: '', level: 1, hp: '', mp: '' };
const initialStats = { forca: 0, agilidade: 0, vitalidade: 0, inteligencia: 0 };

// --- COMPONENTE PRINCIPAL ---
function App() {
  // --- ESTADOS DO JOGO ---
  const [playerData, setPlayerData] = useState(initialPlayerData);
  const [quests, setQuests] = useState([]); // Começa vazio, será preenchido pelo back-end (em um passo futuro)
  const [stats, setStats] = useState(initialStats);
  const [xp, setXp] = useState(0);
  const [statPoints, setStatPoints] = useState(0);
  const xpToNextLevel = 100;

  // --- EFEITOS (Hooks) ---

  // Efeito para BUSCAR dados do back-end APENAS UMA VEZ, quando o app carrega
  useEffect(() => {
    console.log("Buscando dados do jogador no servidor...");
    fetch('http://localhost:3001/api/player/status')
      .then(response => response.json())
      .then(data => {
        console.log("Dados recebidos:", data);
        setPlayerData({
          name: data.name,
          title: data.title,
          level: data.level,
          hp: data.hp,
          mp: data.mp,
        });
        setStats(data.stats);
        setXp(data.xp);
        setStatPoints(data.statPoints);
        // Futuramente, as missões também virão daqui
        setQuests([
          { id: 1, text: 'Preparo Físico Obrigatório: 40 min de Cardio', completed: false },
          { id: 2, text: 'Hidratação do Caçador: Beber 2.5L de Água', completed: false },
          { id: 3, text: 'Nutrição Estratégica: Seguir o plano alimentar', completed: false },
        ]);
      })
      .catch(error => console.error("Erro ao conectar com o back-end:", error));
  }, []); // O array vazio [] garante que isso rode só uma vez.

  // Efeito para verificar o LEVEL UP toda vez que o XP mudar
  useEffect(() => {
    if (xp >= xpToNextLevel) {
      const newLevel = playerData.level + 1;
      const remainingXp = xp - xpToNextLevel;
      
      setPlayerData(prevData => ({ ...prevData, level: newLevel }));
      setXp(remainingXp);
      setStatPoints(prevPoints => prevPoints + 3);
      
      // Usaremos um modal customizado no futuro, por enquanto o alert funciona
      alert(`LEVEL UP! Você alcançou o Nível ${newLevel}! Você ganhou 3 pontos de atributo.`);
    }
  }, [xp, playerData.level, xpToNextLevel]);

  // --- FUNÇÕES DE INTERAÇÃO ---

  const handleToggleQuest = (id: number) => {
    let xpGained = 0;
    const updatedQuests = quests.map(quest => {
      if (quest.id === id) {
        if (!quest.completed) {
          xpGained = 50;
        } else {
          xpGained = -50;
        }
        return { ...quest, completed: !quest.completed };
      }
      return quest;
    });
    setQuests(updatedQuests);
    setXp(currentXp => Math.max(0, currentXp + xpGained));
  };

  const handleIncreaseStat = (statName: keyof typeof initialStats) => {
    if (statPoints > 0) {
      setStats(prevStats => ({
        ...prevStats,
        [statName]: prevStats[statName] + 1,
      }));
      setStatPoints(prevPoints => prevPoints - 1);
    } else {
      alert("Você não tem pontos de atributo para distribuir!");
    }
  };

  // --- RENDERIZAÇÃO DA INTERFACE ---
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-mono p-4 sm:p-8 flex flex-col items-center">
      <header>
        <h1 className="text-3xl sm:text-4xl font-bold text-sky-400 text-center" style={{textShadow: '0 0 8px rgba(59, 130, 246, 0.8)'}}>
          SISTEMA DE APOIO AO JOGADOR
        </h1>
      </header>
      
      <div className="w-full max-w-4xl bg-gray-800/70 border border-sky-500/30 rounded-lg p-6 shadow-[0_0_15px_rgba(56,189,248,0.4)] my-8">
        <h2 className="text-xl font-bold text-sky-300 mb-4 border-b border-sky-500/20 pb-2">PAINEL DO JOGADOR</h2>
        <PlayerStatus playerData={playerData} xp={xp} xpToNextLevel={xpToNextLevel} />
      </div>

      <main className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <DailyQuests quests={quests} onToggleQuest={handleToggleQuest} /> 
        </div>

        <div className="space-y-8">
          <div className="bg-gray-800/70 border border-sky-500/30 rounded-lg p-6 shadow-[0_0_15px_rgba(56,189,248,0.4)]">
            <h2 className="text-xl font-bold text-sky-300 mb-4 flex justify-between">
              <span>ATRIBUTOS</span>
              {statPoints > 0 && (<span className="text-yellow-400 animate-pulse">{statPoints} PONTOS</span>)}
            </h2>
            <StatsPanel stats={stats} onIncreaseStat={handleIncreaseStat} hasPoints={statPoints > 0} />
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