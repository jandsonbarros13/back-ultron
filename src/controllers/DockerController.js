import * as DockerModel from '../models/Docker.js';
import axios from 'axios';

export const listarContainers = async (req, res) => {
    try {
        const containers = await DockerModel.listAll();
        res.json(containers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const executarAcao = async (req, res) => {
    const { id, action } = req.body;
    try {
        if (action === 'start') {
            await DockerModel.startContainer(id);
        } else if (action === 'stop') {
            await DockerModel.stopContainer(id);
        }
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const sincronizarContainers = async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3001/ultron/docker-scan');
        const containersLinux = response.data;
        res.json(containersLinux);
    } catch (err) {
        res.status(500).json({ error: "Erro ao sincronizar com o Core: " + err.message });
    }
};