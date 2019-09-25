const {
    readFile,
    writeFile
} = require('fs');

const {
    promisify
} = require('util');

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class Database {
    constructor() {
        this.NOME_ARQUIVO = "herois.json";
    }

    async obterDadosArquivos() {
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8');
        return JSON.parse(arquivo.toString());
    }

    async cadastrar(heroi) {
        const dados = await this.obterDadosArquivos();
        const id = heroi.id <= 2 ? heroi.id : Date.now();
        const heroiComId = {
            id,
            ...heroi
        };
        const dadosFinish = [
            ...dados,
            heroiComId
        ];
        const result = await this.escreverArquivos(dadosFinish);
        return result;
    }

    async escreverArquivos(dados) {
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))
        return true;
    }

    async listar(id) {
        const dados = await this.obterDadosArquivos();
        return dados.filter(item => (id ? item.id === id : true));
    }

    async remover(id) {
        if (!id) {
            return await this.escreverArquivos([]);
        }
        const dados = await this.obterDadosArquivos();
        const index = dados.findIndex(item => item.id === parseInt(id));
        if (index === -1) {
            throw Error('O usuario informado não existe');
        }
        dados.splice(index, 1);
        return await this.escreverArquivos(dados);
    }

    async atualizar(id, modifications) {
        const data = await this.obterDadosArquivos();
        const index = data.findIndex(item => item.id === parseInt(id));
        if (index === -1) {
            throw Error('O heroi informado não existe');
        }
        const actual = data[index];
        const objetoAtualizar = {
            ...actual,
            ...modifications
        };
        data.splice(index, 1);

        return await this.escreverArquivos([
            ...data,
            objetoAtualizar
        ]);
    }
}

module.exports = new Database()