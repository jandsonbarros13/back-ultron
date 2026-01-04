import { analyzeSystem } from '../../ultron-core/robots/status-bot.js';

export const getFullMonitor = async (req, res) => {
  try {
    const analysis = await analyzeSystem();
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao processar análise do robô' });
  }
};