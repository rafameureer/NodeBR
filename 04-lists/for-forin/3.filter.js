const { obterPessoas } = require('./service');

Array.prototype.meuFilter = function (callback) {
    const list = [];
    for (index in this) {
        const item = this[index];
        const result = callback(item, index, this);
        if (!result) continue;
        list.push(item);
    }
    return list;
}

async function main() {
    try {
        const { results } = await obterPessoas('a');

        // const familiaLars = results.filter(item => {
        //     //Por padrão precisa retornar um boolean
        //     //para informar se deve manter ou remover da lista
        //     //false -> remove da lista
        //     //true -> mantém
        //     ///Não encontrou = -1
        //     //Encontrou = posição no array
        //     const result = item.name.toLowerCase().indexOf('lars') !== -1;
        //     return result
        // });

        const familiaLars = results.meuFilter((item, index, list) => {
            console.log(`index: ${index}`, list.length);
           return item.name.toLowerCase().indexOf('lars') !== -1;
        });
        const names = familiaLars.map(pessoa => pessoa.name);
        console.log(names);
    } catch (error) {
        console.error('Deu ruim', error);
    }
}

main()