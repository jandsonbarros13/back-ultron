import express from 'express';
import { 
    listarEditores, 
    abrirWorkspace, 
    vincularPastaManual, 
    excluirSite,
    sincronizarEditores,
    atualizarStatus 
} from '../controllers/EditorController.js';

const router = express.Router();

router.get('/', listarEditores);
router.post('/abrir', abrirWorkspace);
router.post('/vincular-manual', vincularPastaManual);
router.get('/sincronizar', sincronizarEditores);
router.post('/atualizar-status', atualizarStatus);
router.delete('/:id', excluirSite);

export default router;