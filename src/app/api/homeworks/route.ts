import { NextResponse } from "next/server";
import db from "../../../../prisma/db";

export async function GET() {
    try {
        const homeworks = await db.homework.findMany();
        homeworks.sort((a, b) => a.id - b.id)
        return NextResponse.json({ homeworks }, { status: 200 });                
    } 
    catch (error) {
        return NextResponse.json({ error }, { status: 400 });
    }
}

export async function POST(req: Request) {
    const { description } = await req.json();

    // Check if description is empty or not
    if (!description || description.trim() === '') {
        return NextResponse.json({ error: 'A descrição é obrigatória e não pode estar vazia' }, { status: 400 });
    }

    try {
        const newHomework = await db.homework.create({
            data: { description: description.trim() }
        });
        return NextResponse.json({ newHomework }, { status: 201 });
    }
    catch (error) {
        return NextResponse.json({ error }, { status: 400 });
    }
}
