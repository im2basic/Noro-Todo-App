import { PrismaClient } from './generated/prisma/index.js';
const prisma = new PrismaClient();

async function main() {
    const allTasks = await prisma.task.findMany();
    // console.log(allTasks);
    const task = await prisma.task.create({ data: { title: 'Test Task', color: 'blue', completed: true} })
    // console.log(task);

}

main()
    .catch(e => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
