import { Router } from "express";
import { TaskController } from "../controllers/task.controller.js";

const router = Router()

router.get('/tasks', TaskController.list)
router.get('/existTasks/:title', TaskController.findOne)
router.post('/task', TaskController.create)
router.delete('/task/:title', TaskController.delete)
router.put('/task', TaskController.update)
router.put('/task/:title',TaskController.updateTitle)

export default router;