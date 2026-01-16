import { Router } from 'express';
import { 
    listarSites, 
    atualizarSite, 
    abrirWorkspace, 
    adicionarSite, 
    editarSite, 
    excluirSite 
} from '../controllers/NavegadorController.js';

const router = Router();

router.get('/sites', listarSites);
router.post('/update-site', atualizarSite);
router.post('/abrir-workspace', abrirWorkspace);
router.post('/add', adicionarSite);
router.put('/update', editarSite);
router.delete('/delete/:id', excluirSite);

export default router;