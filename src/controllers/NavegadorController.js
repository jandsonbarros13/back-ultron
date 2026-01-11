import * as Site from '../models/Site.js';
import axios from 'axios';

export const listarSites = async (req, res) => {
    try {
        const sites = await Site.getAll();
        res.json(sites || []);
    } catch (err) {
        console.error("ERRO AO LISTAR SITES:", err);
        res.status(500).json({ error: "Erro ao buscar sites no banco de dados" });
    }
};

export const atualizarSite = async (req, res) => {
    const { id, selected } = req.body;
    try {
        await Site.updateStatus(id, selected);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const adicionarSite = async (req, res) => {
    const { nome, url, icon } = req.body;
    try {
        await Site.create(nome, url, icon);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const editarSite = async (req, res) => {
    const { id, nome, url, icon } = req.body;
    try {
        await Site.update(id, nome, url, icon);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const excluirSite = async (req, res) => {
    const { id } = req.params;
    try {
        await Site.remove(id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const abrirWorkspace = async (req, res) => {
    const { urls } = req.body;
    axios.post('http://localhost:3001/ultron/chat', {
        mensagem: 'CHROME_CUSTOM',
        urls: urls
    }).catch(err => console.error("CORE 3001 OFFLINE"));

    res.json({ success: true, status: "Ambiente disparado" });
};