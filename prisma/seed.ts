import db from "./db";

async function main() {
    const itens = [
        {description: "Fazer tarefa da escola"},
        {description: "Arrumar a cama"},
        {description: "Passear com os cachorros"},
        {description: "Preparar o almoço"},
    ]

    itens.forEach(async (item) => {
        await db.homework.create({
            data: {description: item.description},
        })
    })

    console.log("Seed ok");
}

main()
.then(async () => {
    await db.$disconnect()
})
.catch(async (e) => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
})