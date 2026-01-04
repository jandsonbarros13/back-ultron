import { Router } from 'express';
import * as NavegadorController from '../controllers/NavegadorController.js';

const router = Router();

router.get('/sites', NavegadorController.listarSites);
router.post('/update-site', NavegadorController.atualizarSite);
router.post('/abrir-workspace', NavegadorController.abrirWorkspace);
router.post('/add', NavegadorController.adicionarSite);
router.put('/update', NavegadorController.editarSite);
router.delete('/delete/:id', NavegadorController.excluirSite);

export default router;