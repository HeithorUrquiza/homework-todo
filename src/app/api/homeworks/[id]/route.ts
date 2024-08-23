import { NextResponse } from "next/server";
import db from "../../../../../prisma/db";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    
    try {
        await db.homework.delete({
            where: { id: Number(id) }
        })
        return NextResponse.json({ message: `Tarefa de id:${id} deletada` })
    } 
    catch (e) {
        return NextResponse.json({ error: `O registro de id:${id} não existe` }, { status: 400 })
    }
}
