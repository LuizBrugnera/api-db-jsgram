const { Router } = require("express");

const usuariosController = require("../controllers/UsuariosController");

const publicacoesController = require("../controllers/PublicacoesController");

const rotas = new Router();

rotas
  .route("/usuarios")
  .get(usuariosController.getUsuarios)
  .post(usuariosController.addUsuario)
  .put(usuariosController.updateUsuario);

rotas
  .route("/usuarios/:codigo")
  .get(usuariosController.getUsuarioPorCodigo)
  .delete(usuariosController.deleteUsuario);

rotas
  .route("/publicacoes")
  .get(publicacoesController.getPublicacoes)
  .post(publicacoesController.addPublicacao)
  .put(publicacoesController.updatePublicacao);

rotas
  .route("/publicacoes/:codigo")
  .get(publicacoesController.getPublicacaoPorCodigo)
  .delete(publicacoesController.deletePublicacao);

module.exports = rotas;
