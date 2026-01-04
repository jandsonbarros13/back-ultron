import { pool } from '../config/db.js';

export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query(
            'SELECT id, username, nome FROM usuarios WHERE username = $1 AND password = $2',
            [username, password]
        );
        if (result.rows.length > 0) {
            const user = result.rows[0];
            await pool.query('UPDATE usuarios SET ultimo_login = NOW() WHERE id = $1', [user.id]);
            res.json({ success: true, user });
        } else {
            res.status(401).json({ success: false, message: "Incorreto" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};