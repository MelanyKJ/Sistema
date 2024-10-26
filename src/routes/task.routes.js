import { Router } from "express";
import { authRequired } from '../middlewares/validateToken.js'
import {
    getTasks,
    getTask,
    createTasks,
    updateTask,
    deleteTasks
} from '../controllers/task.controller.js'
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createTaskSchema } from "../schemas/task.shema.js";

const router = Router()
//router.get('/task',authRequired, (req,res)=> res.send('task'))
router.get('/tasks', authRequired, getTasks);
router.get('/tasks/:id', authRequired,getTask );
router.post(
    '/tasks', 
    authRequired, 
    validateSchema(createTaskSchema),
    createTasks
);
router.delete('/tasks/:id', authRequired, deleteTasks );
router.put('/tasks/:id', authRequired, updateTask);
export default router