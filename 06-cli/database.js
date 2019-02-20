const { readFile } = require('fs');

const { promisify } = require('util');

class Database {
    constructor() {
        this.NOME_ARQUIVO = "herois.json";
    }

    obterDadosArquivos() {

    }

    escreverArquivos() {

    }

    listar() {
        return null
    }
}

module.export = new Database()