import express from 'express';
import * as EditorController from '../controllers/EditorController.js';

const router = express.Router();

router.get('/', EditorController.listarEditores);
router.post('/abrir', EditorController.abrirWorkspace);
router.post('/vincular-manual', EditorController.vincularPastaManual);
router.get('/sincronizar', EditorController.sincronizarEditores);
router.post('/atualizar-status', EditorController.atualizarSite);
router.delete('/:id', EditorController.excluirSite);

export default router;