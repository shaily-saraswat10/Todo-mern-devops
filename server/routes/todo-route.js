import express from 'express'
import { createTodo, deleteTodo, getTodos, updateTodo } from '../controller/todo-controller.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post("/create",authenticate,createTodo);
router.get("/gettodo",authenticate,getTodos);
router.put("/update/:id",authenticate,updateTodo)
router.delete("/delete/:id",authenticate,deleteTodo)

export default router;