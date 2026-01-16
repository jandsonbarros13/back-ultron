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

        // Headers para garantir que a Vercel não guarde cache nem por 1 segundo
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const executarAcao = async (req, res) => {
    const { id, action } = req.body;
    try {
        // O robô local está ouvindo o campo pending_action a cada 1.5s
        const { error } = await supabase
            .from('docker_containers')
            .update({ 
                pending_action: action,
                last_sync: new Date().toISOString()
            })
            .eq('docker_id', id);

        if (error) throw error;
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const sincronizarAgora = async (req, res) => {
    res.json({ success: true, message: "Sincronização forçada via Core" });
};