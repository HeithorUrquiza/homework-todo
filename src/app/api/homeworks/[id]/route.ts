import { NextResponse } from "next/server";
import db from "../../../../../prisma/db";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    
    try {
        await db.homework.delete({
            where: { id: Number(id) }
        });
        return NextResponse.json({ message: `Tarefa de id:${id} deletada` });
    } 
    catch (e) {
        return NextResponse.json({ error: `O registro de id:${id} não existe` }, { status: 400 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string }}) {
    const { id } = params;
    const { description } = await req.json();

    if (!description || description.trim() === '') {
        return NextResponse.json({ error: 'A descrição é obrigatória e não pode estar vazia'}, { status: 400});
    }

    try {
        const updatedHomework = await db.homework.update({
            where: { id: Number(id) },
            data: { description: description.trim()}
        });  
        return NextResponse.json({ updatedHomework }, { status: 200 });
    } 
    catch (e) {
        return NextResponse.json({ error: `O registro de id:${id} não existe` }, { status: 400 })
    }
}
