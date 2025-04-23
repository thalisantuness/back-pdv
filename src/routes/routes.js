const express = require("express");
const router = express.Router();
router.use(express.json());

const UsuarioController = require("../controllers/usuariosController");
const ImovelController = require("../controllers/imovelController");
const EstadoController = require("../controllers/estadoController");
const CidadeController = require("../controllers/cidadeController");
const TipoController = require("../controllers/tipoController"); 
const PhotoController = require("../controllers/photoController");
const ProdutoController = require("../controllers/produtoController");
const VendaController = require("../controllers/vendaController");
const authMiddleware = require("../middleware/auth");
const upload = require("../utils/multer");

const usuariosController = UsuarioController();
const imovelController = ImovelController();
const estadoController = EstadoController();
const cidadeController = CidadeController();  
const tipoController = TipoController(); 
const photoController = PhotoController();
const produtoController = ProdutoController();
const vendaController = VendaController();

// Rotas públicas
router.post('/usuarios/login', usuariosController.logar);

// Rotas de usuário
router.get('/usuarios', usuariosController.visualizarUsuario);
router.post('/usuarios', usuariosController.cadastrar);

// Rotas de imóvel
router.get('/imovel', imovelController.getImovel);
router.get('/imovel/:id', imovelController.getImovelById);
router.post('/imovel', upload, imovelController.postImovel);
router.put('/imovel/:id', upload, imovelController.putImovel); 
router.delete('/imovel/:id', imovelController.deleteImovel); 

// Rotas de estado
router.get('/estados', estadoController.getEstados);
router.get('/estados/:id', estadoController.getEstadoById); 
router.post('/estados', estadoController.postEstado);
router.put('/estados/:id', estadoController.putEstado); 
router.delete('/estados/:id', estadoController.deleteEstado);

// Rotas de cidade
router.get('/cidades', cidadeController.getCidades);  
router.get('/cidades/:id', cidadeController.getCidadeById); 
router.post('/cidades', cidadeController.postCidade); 
router.put('/cidades/:id', cidadeController.putCidade);  
router.delete('/cidades/:id', cidadeController.deleteCidade);  

// Rotas de tipo
router.get('/tipos', tipoController.getTipos);  
router.get('/tipos/:id', tipoController.getTipoById); 
router.post('/tipos', tipoController.postTipo); 
router.put('/tipos/:id', tipoController.putTipo);  
router.delete('/tipos/:id', tipoController.deleteTipo);  

// Rotas de foto
router.get('/photo', photoController.getPhoto);  
router.post('/photo', photoController.postPhoto); 

// Rotas de produto (protegidas por autenticação)
router.get('/produtos', produtoController.getProdutos);
router.get('/produtos/:id', authMiddleware, produtoController.getProdutoById);
router.post('/produtos', produtoController.postProduto);
router.put('/produtos/:id', authMiddleware, produtoController.putProduto);
router.patch('/produtos/:id/estoque', authMiddleware, produtoController.patchEstoque);
router.delete('/produtos/:id', authMiddleware, produtoController.deleteProduto);

// Rotas de venda (protegidas por autenticação)
router.get('/vendas', authMiddleware, vendaController.getVendas);
router.get('/vendas/:id', authMiddleware, vendaController.getVendaById);
router.post('/vendas', authMiddleware, vendaController.postVenda);
router.patch('/vendas/:id/cancelar', authMiddleware, vendaController.patchCancelarVenda);
router.delete('/vendas/:id', authMiddleware, vendaController.deleteVenda);

// Rota não encontrada
router.use('*', (req, res) => {
  res.status(404).json({ errorMessage: 'Rota não encontrada' });
});

module.exports = router;