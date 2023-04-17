const { pool } = require('../config');
const Usuario = require('../entities/Usuario')

const getUsuariosDB = async () => {
    try {    
        const { rows } = await pool.query('SELECT * FROM usuarios order by codigo');
        return rows.map((usuario) => new Usuario(usuario.codigo, usuario.nome, usuario.senha, usuario.fotoPerfil));        
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addUsuarioDB = async (body) => {
    try {   
        const { nome, senha, fotoPerfil } = body; 
        const results = await pool.query(`INSERT INTO usuarios (nome, senha, fotoPerfil) 
        values ($1, $2, $3) returning codigo, nome, senha, fotoPerfil`,
        [nome, senha, fotoPerfil]);
        const usuario = results.rows[0];
        return new Usuario(usuario.codigo, usuario.nome, usuario.senha, usuario.fotoPerfil);
    } catch (err) {
        throw "Erro ao inserir o usuário: " + err;
    }    
}


const updateUsuarioDB = async (body) => {
    try {   
        const { codigo, nome, senha, fotoPerfil }  = body; 
        const results = await pool.query(`UPDATE usuarios SET nome=$2, senha=$3, fotoPerfil=$4
        where codigo=$1 returning codigo, nome, senha, fotoPerfil`,
        [codigo, nome, senha, fotoPerfil]);        
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const usuario = results.rows[0];
        return new Usuario(usuario.codigo, usuario.nome, usuario.senha, usuario.fotoPerfil);
    } catch (err) {
        throw "Erro ao alterar o usuário: " + err;
    }      
}

const deleteUsuarioDB = async (codigo) => {
    try {           
        const results = await pool.query(`DELETE FROM usuarios WHERE codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Prédio removido com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover o usuário: " + err;
    }     
}

const getUsuarioPorCodigoDB = async (codigo) => {
    try {           
        const results = await pool.query(`SELECT * FROM usuarios WHERE codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const usuario = results.rows[0];
            return new Usuario(usuario.codigo, usuario.nome, usuario.senha, usuario.fotoPerfil);            
        }       
    } catch (err) {
        throw "Erro ao recuperar o usuário: " + err;
    }     
}


module.exports = {
    getUsuariosDB, addUsuarioDB, updateUsuarioDB, deleteUsuarioDB, getUsuarioPorCodigoDB
}
