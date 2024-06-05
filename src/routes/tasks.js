import express from 'express';
import {getTasks,addTask,modifyTask,deleteTask} from "../controllers/tasks.js"

const router = express.Router();

router.get('/', getTasks);
router.post('/', addTask);
router.put('/', modifyTask);
router.delete('/', deleteTask);
  export default router;