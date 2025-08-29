import express from 'express';
import { PrismaClient } from '../../generated/prisma/index.js'

const router = express.Router();
const prisma = new PrismaClient();

//routes
router.get('/tasks', async (req, res) => {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
})

router.post('/tasks', async (req, res) => {
    const { title, color } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });

    const task = await prisma.task.create({
        data: {
            title,
            color
        }
    });
    res.json(task);
});

router.put("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    const { title, color, completed } = req.body;

    const task = await prisma.task.update({
        where: { id: Number(id) },
        data: { 
            title, 
            color, 
            completed 
        },
    });
    res.json(task);
});

router.delete("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    await prisma.task.delete({ where: { id: Number(id) } });
    res.json({ message: "Task deleted" });
});

export default router;
