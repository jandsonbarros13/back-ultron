import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

// Inicializa o Supabase (garanta que estas variáveis estão na Vercel)
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

// 1. LISTAR: Busca os containers que o robô local já sincronizou
export const listarContainers = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('docker_containers')
            .select('*')
            .order('last_sync', { ascending: false });

        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Erro ao listar banco: " + err.message });
    }
};

// 2. EXECUTAR AÇÃO: Não chama o Docker! Apenas agenda no banco.
export const executarAcao = async (req, res) => {
    const { id, action } = req.body; // id é o docker_id (string longa do docker)

    if (!id || !action) {
        return res.status(400).json({ error: "ID e Ação são obrigatórios" });
    }

    try {
        // Atualiza o campo pending_action para o robô local ler
        const { error } = await supabase
            .from('docker_containers')
            .update({ pending_action: action })
            .eq('docker_id', id);

        if (error) throw error;

        res.json({ 
            success: true, 
            message: `Comando ${action} enviado para o sistema local.` 
        });
    } catch (err) {
        res.status(500).json({ error: "Erro ao agendar comando: " + err.message });
    }
};

// 3. SINCRONIZAR: Na Vercel, apenas retorna sucesso 
// (A sincronia real é feita pelo robô local)
export const sincronizarAgora = async (req, res) => {
    res.json({ success: true, message: "Aguardando sincronização do robô local..." });
};