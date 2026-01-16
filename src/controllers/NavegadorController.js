import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export const listarSites = async (req, res) => {
    const { data, error } = await supabase.from('sites').select('*').order('id', { ascending: true });
    if (error) return res.status(500).json(error);
    res.json(data || []);
};

export const adicionarSite = async (req, res) => {
    const { nome, url, icon } = req.body;
    const { error } = await supabase.from('sites').insert([{ nome, url, icon, selected: true }]);
    if (error) return res.status(500).json(error);
    res.json({ success: true });
};

export const editarSite = async (req, res) => {
    const { id, nome, url, icon } = req.body;
    const { error } = await supabase.from('sites').update({ nome, url, icon }).eq('id', id);
    if (error) return res.status(500).json(error);
    res.json({ success: true });
};

export const excluirSite = async (req, res) => {
    const { error } = await supabase.from('sites').delete().eq('id', req.params.id);
    if (error) return res.status(500).json(error);
    res.json({ success: true });
};

export const atualizarSite = async (req, res) => {
    const { id, selected } = req.body;
    const { error } = await supabase.from('sites').update({ selected }).eq('id', id);
    if (error) return res.status(500).json(error);
    res.json({ success: true });
};

export const abrirWorkspace = async (req, res) => {
    const { urls } = req.body;
    const pedidos = urls.map(url => ({ url, status: 'pending' }));
    const { error } = await supabase.from('navegador_queue').insert(pedidos);
    if (error) return res.status(500).json(error);
    res.json({ success: true });
};