import { Router } from 'express';
import { getFullMonitor } from '../controllers/SystemController.js';

const router = Router();

router.get('/monitor', getFullMonitor);

export default router;