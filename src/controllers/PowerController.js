import { exec } from 'child_process';

export const handlePowerAction = (req, res) => {
  const { action } = req.body;

  if (action === 'shutdown') {
    console.log('ULTRON: Recebido protocolo de desligamento físico...');
    
    exec('sudo shutdown -h now', (error) => {
      if (error) {
        return res.status(500).json({ error: 'Erro de permissão no servidor' });
      }
      return res.json({ status: 'OFFLINE', message: 'Sinal enviado ao Kernel.' });
    });
  } else {
    res.status(400).json({ error: 'Comando não identificado' });
  }
};