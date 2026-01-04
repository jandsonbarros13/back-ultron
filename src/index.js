import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import loginRoutes from './routes/login.routes.js';
import navegadorRoutes from './routes/navegador.routes.js';
import editorRoutes from './routes/editor.routes.js';
import dockerRoutes from './routes/docker.routes.js';

const app = express();

app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'] }));
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
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    display: flex; flex-direction: column; align-items: center; 
                    justify-content: center; height: 100vh; margin: 0; overflow: hidden;
                }
                .logo {
                    font-size: 5rem; font-weight: 900; letter-spacing: 10px;
                    text-shadow: 0 0 20px #ff0000, 0 0 40px #ff0000;
                    animation: pulse 2s infinite alternate;
                }
                .status {
                    margin-top: 20px; padding: 10px 20px;
                    border: 1px solid #ff0000; border-radius: 5px;
                    font-size: 1.2rem; text-transform: uppercase;
                    box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
                }
                @keyframes pulse {
                    from { transform: scale(1); opacity: 0.8; }
                    to { transform: scale(1.05); opacity: 1; text-shadow: 0 0 30px #ff0000, 0 0 60px #ff0000; }
                }
                .glow-bar {
                    width: 200px; height: 2px; background: #ff0000;
                    margin-top: 30px; box-shadow: 0 0 15px #ff0000;
                }
            </style>
        </head>
        <body>
            <div class="logo">ULTRON</div>
            <div class="status">SISTEMA ONLINE NA NUVEM</div>
            <div class="glow-bar"></div>
        </body>
        </html>
    `);
});

app.use('/api/auth', loginRoutes);
app.use('/api/navegador', navegadorRoutes);
app.use('/api/editor', editorRoutes);
app.use('/api/docker', dockerRoutes);

export default app;