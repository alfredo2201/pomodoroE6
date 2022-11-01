import { Router } from "express";
import { TaskController } from "../controllers/task.controller.js";

const router = Router()

router.get('/tasks', TaskController.list)
router.get('/existTasks', TaskController.findOne)
router.post('/task', TaskController.create)
router.delete('/task', TaskController.delete)
router.put('/task', TaskController.update)

export default router;