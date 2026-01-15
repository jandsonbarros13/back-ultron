import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

export const listarContainers = async (req, res) => {
    try {
        // Buscamos os containers sem cache
        const { data, error } = await supabase
            .from('docker_containers')
            .select('*')
            .order('name', { ascending: true });

        if (error) throw error;

        // HEADERS CRÍTICOS: Impedem a Vercel e o Browser de cachear dados velhos
        res.setHeader('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate');
        res.setHeader('CDN-Cache-Control', 'no-store');
        res.setHeader('Vercel-CDN-Cache-Control', 'no-store');
        
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
    res.json({ success: true });
};