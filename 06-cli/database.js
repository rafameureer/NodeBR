const { readFile } = require('fs');

const { promisify } = require('util');

const readFileAsync = promisify(readFile);

class Database {
    constructor() {
        this.NOME_ARQUIVO = "herois.json";
    }

    async obterDadosArquivos() {
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8');
        return JSON.parse(arquivo.toString());
    }

    escreverArquivos() {

    }

    async listar(id) {
        const dados = await this.obterDadosArquivos();
        return dados.filter(item => (id ? item.id === id : true));
    }
}

module.exports = new Database()