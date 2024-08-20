'use server'

import db from "../../prisma/db";

export async function getAll() {
    return db.homework.findMany();
}

export async function createTodo(description: string) {
    return db.homework.create({
        data: { description }
    })
}

export async function updateTodo(id: number, description: string) {
    return db.homework.update({
        where: { id },
        data: { description }
    })
}

export async function deleteTodo(id: number) {
    return db.homework.delete({
        where: { id }
    })
}
