import { NextResponse } from "next/server"
import db from "../../../../../../prisma/db"

export async function PUT(req: Request, { params }: { params: { id: string }}) {
    const { id } = params
    const { isChecked } = await req.json()
    
    try {
        const updatedHomework = await db.homework.update({
            where: { id: Number(id) },
            data: { isChecked }
        })
        return NextResponse.json({ updatedHomework }, { status: 200 })    
    } 
    catch (error) {
        return NextResponse.json({ error }, { status: 400 })
    }
}
