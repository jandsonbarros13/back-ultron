import * as Site from '../models/Site.js';
import axios from 'axios';

export const listarSites = async (req, res) => {
    try {
        const sites = await Site.getAll();
        res.json(sites);
    } catch (err) {
        res.status(500).json({ error: err.message });
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

    // Dispara a requisição para o Core (Porta 3001) sem o 'await'
    // Isso evita que o celular receba erro 500 caso o Chrome demore a abrir
    axios.post('http://localhost:3001/ultron/chat', {
        mensagem: 'CHROME_CUSTOM',
        urls: urls
    }).catch(err => {
        console.error("ERRO ASSÍNCRONO: Falha ao comunicar com o Core 3001");
    });

    // Resposta imediata para o Front-end
    res.json({ 
        resposta: "Sinal enviado ao Core",
        status: "Processando ambiente de navegação..." 
    });
};