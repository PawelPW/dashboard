import { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

async function openDb() {
    return open({
        filename: './dev.db',
        driver: sqlite3.Database,
    });
}
export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const db = await openDb();
    const { email, password } = req.body;

    try {
        const user = await db.get('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);

        if (user) {
            res.status(200).json({ message: 'Login successful', user });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        await db.close();
    }
    
}