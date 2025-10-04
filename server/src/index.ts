// server/src/index.ts

import express, { Request, Response } from 'express';
import cors from 'cors'; // NOVO! Importamos o cors.

const app = express();
const port = 3001;

// --- CONFIGURAÇÕES DO SERVIDOR ---
app.use(cors()); // NOVO! Habilita o CORS para permitir a comunicação com o front-end.
app.use(express.json()); // NOVO! Prepara nosso servidor para receber dados no formato JSON no futuro.


// --- DADOS FALSOS (Simulando um banco de dados por enquanto) ---
const playerStatus = {
  name: 'Bruno',
  title: '[O Despertado]',
  level: 1,
  hp: '80 / 80 kg',
  mp: '100 / 100',
  xp: 0,
  xpToNextLevel: 100,
  stats: {
    forca: 5,
    agilidade: 4,
    vitalidade: 6,
    inteligencia: 10,
  },
  statPoints: 0,
};


// --- DEFINIÇÃO DAS ROTAS DA API ---

// Rota de teste original
app.get('/', (req: Request, res: Response) => {
  res.send('O servidor do Sistema de Nivelamento está online!');
});

// NOVO! Nossa primeira rota de verdade.
// Quando o front-end fizer uma requisição GET para '/api/player/status'...
app.get('/api/player/status', (req: Request, res: Response) => {
  // ...nós responderemos com o objeto playerStatus em formato JSON.
  res.json(playerStatus);
});


// --- INICIALIZAÇÃO DO SERVIDOR ---
app.listen(port, () => {
  console.log(`[servidor]: Servidor rodando em http://localhost:${port}`);
});