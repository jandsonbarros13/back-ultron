import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

export const listarContainers = async (req, res) => {
    try {
        // Buscamos os containers ordenando pelo último sincronismo (mais recentes primeiro)
        const { data, error } = await supabase
            .from('docker_containers')
            .select('*')
            .order('last_sync', { ascending: false });

        if (error) throw error;

        // Forçamos o Header para o App não guardar cache de dados velhos
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const executarAcao = async (req, res) => {
    const { id, action } = req.body;

    try {
        const { error } = await supabase
            .from('docker_containers')
            .update({ 
                pending_action: action,
                last_sync: new Date().toISOString() // Marca que houve uma tentativa de alteração
            })
            .eq('docker_id', id);

        if (error) throw error;

        res.json({ success: true, message: "Comando agendado com sucesso!" });
    } catch (err) {
        res.status(500).json({ error: "Erro ao agendar: " + err.message });
    }
};

export const sincronizarAgora = async (req, res) => {
    res.json({ success: true, message: "Sincronização solicitada ao robô local" });
};