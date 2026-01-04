import express from 'express';
import * as DockerController from '../controllers/DockerController.js';

const router = express.Router();

router.get('/list', DockerController.listarContainers);
router.post('/action', DockerController.executarAcao);

export default router;