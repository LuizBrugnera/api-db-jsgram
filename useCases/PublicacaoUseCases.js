const { pool } = require('../config');
const Publicacao = require('../entities/Publicacao')

const getPublicacoesDB = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM publicacoes order by codigo');
        return rows.map((publicacao) => new Publicacao(publicacao.codigo, publicacao.imagem, publicacao.descricao, publicacao.usuario));
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addPublicacaoDB = async (body) => {
    try {
        const { imagem, descricao, usuario } = body;
        const results = await pool.query(`INSERT INTO publicacoes (imagem, descricao, usuario) 
        values ($1, $2, $3) returning codigo, imagem, descricao, usuario`,
            [imagem, descricao, usuario]);
        const publicacao = results.rows[0];
        return new Publicacao(publicacao.codigo, publicacao.imagem, publicacao.descricao, publicacao.usuario,);
    } catch (err) {
        throw "Erro ao inserir o usuário: " + err;
    }
}


const updatePublicacaoDB = async (body) => {
    try {
        const { codigo, imagem, descricao, usuario} = body;
        const results = await pool.query(`UPDATE publicacoes SET imagem=$2, descricao=$3, usuario=$4
        where codigo=$1 returning codigo, imagem, descricao, usuario `,
            [codigo, imagem, descricao, usuario]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const publicacao = results.rows[0];
        return new Publicacao(publicacao.codigo, publicacao.imagem, publicacao.descricao, publicacao.usuario);
    } catch (err) {
        throw "Erro ao alterar a Publicação: " + err;
    }
}

const deletePublicacaoDB = async (codigo) => {
    try {
        const results = await pool.query(`DELETE FROM publicacoes WHERE codigo = $1`,
            [codigo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Publicacao removida com sucesso";
        }
    } catch (err) {
        throw "Erro ao remover a publicacao: " + err;
    }
}

const getPublicacaoPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`SELECT * FROM publicacoes WHERE codigo = $1`,
            [codigo]);
        if (results.rowCount == 0) {
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const publicacao = results.rows[0];
            return new Publicacao(publicacao.codigo, publicacao.imagem, publicacao.descricao, publicacao.usuario);
        }
    } catch (err) {
        throw "Erro ao recuperar a publicacao: " + err;
    }
}


module.exports = {
    getPublicacoesDB, addPublicacaoDB, updatePublicacaoDB, deletePublicacaoDB, getPublicacaoPorCodigoDB
}
