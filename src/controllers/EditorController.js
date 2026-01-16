import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export const listarEditores = async (req, res) => {
    try {
        const { data, error } = await supabase.from('editores').select('*').order('id', { ascending: false });
        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const abrirWorkspace = async (req, res) => {
    const { projetos } = req.body;
    try {
        for (const proj of projetos) {
            await supabase.from('editores_queue').insert({
                nome: proj.nome,
                comando: proj.comando,
                caminho: proj.caminho || '',
                status: 'pending'
            });
        }
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const vincularPastaManual = async (req, res) => {
    const { caminho, nomePersonalizado } = req.body;
    try {
        const { data, error } = await supabase.from('editores').insert({
            nome: nomePersonalizado,
            caminho: caminho,
            comando: 'code',
            icon: 'folder-outline'
        });
        if (error) throw error;
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const excluirSite = async (req, res) => {
    const { id } = req.params;
    try {
        await supabase.from('editores').delete().eq('id', id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Funções vazias para evitar erros de importação se as rotas pedirem
export const sincronizarEditores = (req, res) => res.json({ success: true });
export const atualizarStatus = (req, res) => res.json({ success: true });