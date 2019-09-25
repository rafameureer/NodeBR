const Commander = require('commander');
const database = require('./database');
const Heroi = require('./heroi');

async function main() {
    Commander
        .version('v1')
        .option('-n, --nome [value]', "Nome do Heroi")
        .option('-p, --poder [value]', "Poder do Heroi")
        .option('-i, --id [value]', "ID do Heroi")
        .option('-c, --cadastrar', "Cadastrar um heroi")
        .option('-l, --listar', "Listar os herois")
        .option('-u, --atualizar [value]', 'atualizar heroi pelo id')
        .option('-r, --remover', "remover um heroi")
        .parse(process.argv);

    const heroi = new Heroi(Commander)

    try {
        if (Commander.cadastrar) {
            if (!heroi.id) {
                delete heroi.id;
            }
            const result = await database.cadastrar(heroi);
            if (!result) {
                console.error("Heroi não foi cadastrado");
                return;
            }
            console.log('Heroi cadastrado com sucesso');

        }

        if (Commander.listar) {
            const result = await database.listar();
            console.log(result);
            return;
        }

        if (commander.atualizar) {
            const id = commander.atualizar;
            console.log('id', id);
            await Database.atualizar(id, heroi);
            console.log('item atualizado com sucesso!');
            return;
        }

        if (Commander.remover) {
            const result = await database.remover(heroi.id)
            if (!result) {
                console.error("Não foi possivel remover o heroi");
                return;
            }
            console.log('Heroi removido com sucesso!');

        }
    } catch (error) {
        console.log('Deu Ruim', error);
    }
}

main();