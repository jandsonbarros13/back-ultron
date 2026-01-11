import { pool } from '../config/db.js';
import * as DockerModel from '../models/Docker.js';

export const listarContainers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM docker_containers ORDER BY last_sync DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Erro ao listar containers do banco: " + err.message });
    }
};

export const executarAcao = async (req, res) => {
    const { id, action } = req.body;
    
    if (!id || !action) {
        return res.status(400).json({ error: "ID e Ação são obrigatórios" });
    }

    try {
        if (action === 'start') {
            await DockerModel.startContainer(id);
        } else if (action === 'stop') {
            await DockerModel.stopContainer(id);
        } else {
            return res.status(400).json({ error: "Ação inválida. Use start ou stop." });
        }

        res.json({ 
            success: true, 
            message: `Container ${id}: comando ${action} enviado com sucesso.` 
        });
    } catch (err) {
        res.status(500).json({ error: "Erro ao executar ação no Docker: " + err.message });
    }
};

export const sincronizarAgora = async (req, res) => {
    try {
        const containers = await DockerModel.listAll();
        
        for (const c of containers) {
            await pool.query(`
                INSERT INTO docker_containers (docker_id, name, image, state, status)
                VALUES ($1, $2, $3, $4, $5)
                ON CONFLICT (name) 
                DO UPDATE SET state = EXCLUDED.state, status = EXCLUDED.status, last_sync = CURRENT_TIMESTAMP
            `, [c.id, c.name, c.image, c.state, c.status]);
        }
        
        res.json({ success: true, message: "Sincronização manual concluída" });
    } catch (err) {
        res.status(500).json({ error: "Erro na sincronização manual: " + err.message });
    }
};