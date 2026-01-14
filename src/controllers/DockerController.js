import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

export const listarContainers = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('docker_containers')
            .select('*')
            .order('name', { ascending: true });

        if (error) throw error;
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
            .update({ pending_action: action })
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