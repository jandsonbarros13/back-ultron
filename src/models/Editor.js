import { pool } from '../config/db.js';

export const getAll = async () => {
    const { rows } = await pool.query('SELECT * FROM editores ORDER BY id DESC');
    return rows;
};

export const create = async (nome, caminho, comando, icon) => {
    const query = `
        INSERT INTO editores (nome, caminho, comando, icon, selected) 
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING id
    `;
    const values = [nome, caminho, comando, icon, true];
    const { rows } = await pool.query(query, values);
    return rows[0].id;
};

export const updateStatus = async (id, selected) => {
    const query = 'UPDATE editores SET selected = $1 WHERE id = $2';
    await pool.query(query, [selected, id]);
};

export const remove = async (id) => {
    await pool.query('DELETE FROM editores WHERE id = $1', [id]);
};

export const upsertDiscovery = async (nome, comando) => {
    const query = `
        INSERT INTO editores (nome, caminho, comando, icon, selected)
        VALUES ($1, 'SYSTEM_BIN', $2, 'code-slash-outline', false)
        ON CONFLICT (nome) 
        DO UPDATE SET comando = EXCLUDED.comando
    `;
    const values = [nome, comando];
    await pool.query(query, values);
};

export const findByCaminho = async (caminho) => {
    const { rows } = await pool.query('SELECT * FROM editores WHERE caminho = $1', [caminho]);
    return rows[0];
};