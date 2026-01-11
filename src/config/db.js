import pkg from 'pg';
const { Pool } = pkg;
import 'dotenv/config';

const localConfig = {
  connectionString: process.env.DATABASE_LOCAL,
  ssl: false,
  connectionTimeoutMillis: 2000 
};

const cloudConfig = {
  connectionString: process.env.DATABASE_CLOUD,
  ssl: { rejectUnauthorized: false }
};

export let pool = new Pool(localConfig);

export const checkConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('📡 Tentando conexão local...');
    client.release();
    return { type: 'LOCAL', success: true };
  } catch (err) {
    console.log('⚠️ LOCAL OFFLINE. REDIRECIONANDO PARA SUPABASE...');
    pool = new Pool(cloudConfig);
    try {
      const client = await pool.connect();
      client.release();
      return { type: 'CLOUD', success: true };
    } catch (cloudErr) {
      return { type: 'NONE', success: false, error: cloudErr.message };
    }
  }
};