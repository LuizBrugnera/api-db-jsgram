const { Router } = require("express");

const usuariosController = require("../controllers/UsuariosController");

const publicacoesController = require("../controllers/PublicacoesController");

const rotas = new Router();

rotas
  .route("/users")
  .get(usuariosController.getUsuarios)
  .post(usuariosController.addUsuario)
  .put(usuariosController.updateUsuario);

rotas
  .route("/users/:codigo")
  .get(usuariosController.getUsuarioPorCodigo)
  .delete(usuariosController.deleteUsuario);

rotas
  .route("/posts")
  .get(publicacoesController.getPublicacoes)
  .post(publicacoesController.addPublicacao)
  .put(publicacoesController.updatePublicacao);

rotas
  .route("/posts/:codigo")
  .get(publicacoesController.getPublicacaoPorCodigo)
  .delete(publicacoesController.deletePublicacao);

module.exports = rotas;
