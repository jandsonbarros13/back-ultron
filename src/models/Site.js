import { pool } from '../config/db.js';

export const getAll = async () => {
    const res = await pool.query('SELECT * FROM sites ORDER BY id ASC');
    return res.rows;
};

export const updateStatus = async (id, selected) => {
    return await pool.query('UPDATE sites SET selected = $1 WHERE id = $2', [selected, id]);
};

export const create = async (nome, url, icon) => {
    return await pool.query(
        'INSERT INTO sites (nome, url, icon, selected) VALUES ($1, $2, $3, true)',
        [nome, url, icon]
    );
};

export const remove = async (id) => {
    return await pool.query('DELETE FROM sites WHERE id = $1', [id]);
};

export const update = async (id, nome, url, icon) => {
    return await pool.query(
        'UPDATE sites SET nome = $1, url = $2, icon = $3 WHERE id = $4',
        [nome, url, icon, id]
    );
};