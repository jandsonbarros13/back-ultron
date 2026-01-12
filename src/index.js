import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import { checkConnection } from './config/db.js';
import loginRoutes from './routes/login.routes.js';
import navegadorRoutes from './routes/navegador.routes.js';
import editorRoutes from './routes/editor.routes.js';
import dockerRoutes from './routes/docker.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

app.use(cors({ 
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning']
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>ULTRON BACKEND | STATUS</title>
            <style>
                body { 
                    background: radial-gradient(circle, #1a1a1a 0%, #000 100%); 
                    color: white; 
                    font-family: 'Segoe UI', sans-serif;
                    display: flex; flex-direction: column; align-items: center; 
                    justify-content: center; height: 100vh; margin: 0; overflow: hidden;
                }
                .logo {
                    font-size: 5rem; font-weight: 900; letter-spacing: 10px;
                    text-shadow: 0 0 20px #ff0000;
                    animation: pulse 2s infinite alternate;
                }
                .status {
                    margin-top: 20px; padding: 10px 20px;
                    border: 1px solid #ff0000; border-radius: 5px;
                    text-transform: uppercase;
                }
                @keyframes pulse { from { transform: scale(1); } to { transform: scale(1.05); } }
                .glow-bar { width: 200px; height: 2px; background: #ff0000; margin-top: 30px; }
            </style>
        </head>
        <body>
            <div class="logo">ULTRON</div>
            <div class="status">SISTEMA ONLINE</div>
            <div class="glow-bar"></div>
        </body>
        </html>
    `);
});

app.get('/api/system/monitor', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('system_stats')
            .select('*')
            .eq('id', 1)
            .single();

        if (error) throw error;

        // O segredo está aqui: mapear os nomes do Banco (snake_case) 
        // para os nomes que o seu App Ionic espera (camelCase)
        res.json({
            uptime: data.uptime || "0h 0m",
            cpuUsage: parseFloat(data.cpu_usage) || 0,
            memoryUsage: parseFloat(data.ram_usage) || 0,
            diskUsage: parseFloat(data.disk_usage) || 0,
            freeMemory: data.free_memory || "N/A",
            processes: data.processes || []
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.use('/api/auth', loginRoutes);
app.use('/api/navegador', navegadorRoutes);
app.use('/api/editor', editorRoutes);
app.use('/api/docker', dockerRoutes);

app.listen(PORT, async () => {
    console.log(`🚀 ULTRON BACKEND: http://localhost:${PORT}`);
    const dbStatus = await checkConnection();
    if (dbStatus.success) {
        console.log(`✅ DATABASE: CONECTADO VIA ${dbStatus.type}`);
    }
});

export default app;