import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { NextRequest, NextResponse } from "next/server";

import jwt from "jsonwebtoken";

async function openDb() {
    console.log("Opening database");
    return open({
        filename: './prisma/dev.db',
        driver: sqlite3.Database,
        
    });
}
const SECRET_KEY = "testtoken"; // Replace with your actual secret key
export async function POST(request: NextRequest, response: NextResponse) {
    const db = await openDb();
  
    try {
        const body = await request.json()
        const { email, password } = body;
        console.log(email, password);
        console.log("Request:", body);
        const user = await db.get('SELECT * FROM User WHERE email = ? AND password = ?', [email, password]);
        if (user) {
            console.log("User found:", user);//console.log("User found:", user);
            const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
            console.log("Token:", token);
            return NextResponse.json({ message: 'Login successful', token, user:{id: user.id} }, { status: 200 });
            // response.status(200).json({ message: 'Login successful', user });
        } else {
            return NextResponse.json({error: 'Invalid email or password', user }, { status: 400 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({error:'Internal server error' }, { status: 500 });
    } finally {
        await db.close();
    }
    
}