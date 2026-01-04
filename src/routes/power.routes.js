import { Router } from 'express';
import { handlePowerAction } from '../controllers/PowerController.js';

const router = Router();

router.post('/system-power', handlePowerAction);

export default router;