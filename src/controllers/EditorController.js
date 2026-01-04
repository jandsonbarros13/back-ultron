import * as Editor from '../models/Editor.js';
import axios from 'axios';

export const listarEditores = async (req, res) => {
    try {
        const data = await Editor.getAll();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const vincularPastaManual = async (req, res) => {
    const { caminho, nomePersonalizado } = req.body;
    try {
        const response = await axios.post('http://localhost:3001/ultron/validar-pasta', { caminho });
        if (response.data.existe) {
            const nomeFinal = nomePersonalizado || response.data.nomePasta;
            const novoId = await Editor.create(nomeFinal, caminho, 'code', 'folder-outline');
            res.json({ success: true, id: novoId });
        } else {
            res.status(400).json({ error: "Pasta nao encontrada no Linux" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const abrirWorkspace = async (req, res) => {
    const { projetos } = req.body;
    try {
        await axios.post('http://localhost:3001/ultron/chat', {
            mensagem: 'EDITOR_CUSTOM',
            projetos: projetos
        });
        res.json({ resposta: "OK" });
    } catch (err) {
        res.status(500).json({ error: "Erro Core" });
    }
};

export const atualizarSite = async (req, res) => {
    const { id, selected } = req.body;
    try {
        await Editor.updateStatus(id, selected);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const excluirSite = async (req, res) => {
    const { id } = req.params;
    try {
        await Editor.remove(id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const sincronizarEditores = async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3001/ultron/scanner-editores');
        const detectados = response.data;
        for (const ed of detectados) {
            await Editor.upsertDiscovery(ed.nome, ed.comando);
        }
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};