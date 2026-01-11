import pkg from 'pg';
const { Pool } = pkg;
import 'dotenv/config';

const isCloud = process.env.VERCEL || !process.env.DATABASE_LOCAL;

const config = isCloud ? {
  connectionString: process.env.DATABASE_CLOUD || process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
} : {
  connectionString: process.env.DATABASE_LOCAL,
  ssl: false
};

export const pool = new Pool(config);

export const checkConnection = async () => {
  try {
    const client = await pool.connect();
    const type = isCloud ? 'CLOUD/SUPABASE' : 'LOCAL';
    console.log(`✅ DATABASE: CONECTADO VIA ${type}`);
    client.release();
    return { type, success: true };
  } catch (err) {
    console.error('❌ ERRO AO CONECTAR NO BANCO:', err.message);
    return { type: 'NONE', success: false, error: err.message };
  }
};