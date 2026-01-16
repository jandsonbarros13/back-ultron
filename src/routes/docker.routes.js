import express from 'express';
import { listarContainers, executarAcao, sincronizarAgora } from '../controllers/DockerController.js';

const router = express.Router();

router.get('/list', listarContainers);
router.post('/action', executarAcao);
router.get('/sync', sincronizarAgora);

export default router;