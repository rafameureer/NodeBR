/**
 * 0 - Obter usuario
 * 1 - Obter o numero de telefone de um usuario a partir de seu Id
 * 2 - Obter o endereço do usuario pelo Id
 */

//importamos um módulo interno do node.js
const util = require('util');
const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // return reject(new Error('deu ruim de verdade!'));
            return resolve({
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date()
            })
        }, 1000)
    });

}

function obterTelefone(idUsuario) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve({
                telefone: '119002',
                ddd: 11
            })
        }, 2000)
    })
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'dos bobos',
            numero: 0
        })
    }, 2000)
}
// 1° passo adicionar a palavra async -> automaticamente ela retornará uma Promise
main()
async function main() {
    try {
        console.time('medida-promise');
        const usuario = await obterUsuario();
        // const telefone = await obterTelefone(usuario.id);
        // const endereco = await obterEnderecoAsync(usuario.id)
        const result = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])
        const telefone = result[0];
        const endereco = result[1];
        console.log(`
           Nome: ${usuario.nome},
           Endereço: ${endereco.rua}, ${endereco.numero},
           Telefone: (${telefone.ddd})${telefone.telefone}
        `);
        console.timeEnd('medida-promise');
    } catch (error) {
        console.error('Deu ruim', error);

    }
}

// const usuarioPromise = obterUsuario();

// usuarioPromise.then((usuario) => {
//     return obterTelefone(usuario.id).then(result => {
//         return {
//             usuario: {
//                 nome: usuario.nome,
//                 id: usuario.id
//             },
//             telefone: result
//         }
//     })
// }).then(result => {
//     const endereco = obterEnderecoAsync(result.usuario.id);
//     return endereco.then(resolve => {
//         return {
//             usuario: result.usuario,
//             telefone: result.telefone,
//             endereco: resolve
//         }
//     })
// }).then(resolve => {
//     console.log(`
//         Nome: ${resolve.usuario.nome},
//         Endereço: ${resolve.endereco.rua}, ${resolve.endereco.numero},
//         Telefone: (${resolve.telefone.ddd})${resolve.telefone.telefone}
//     `);
// }).catch(error => {
//     console.error('Deu ruim', error);
// });


// obterUsuario((error, usuario) => {
//     // null || "" || 0 === false
//     if (error) {
//         console.log('Deu ruim em usuario', error);
//         return;
//     }

//     obterTelefone(usuario.id, (error1, telefone) => {
//         if (error1) {
//             console.log('Deu ruim em telefone', error);
//             return;
//         }
//         obterEndereco(usuario.id, (error2, endereco) => {
//             if (error2) {
//                 console.log('Deu ruim em endereco', error);
//                 return;
//             }

//             console.log(`
//             Nome: ${usuario.nome},
//             Endereço: ${endereco.rua}, ${endereco.numero},
//             Telefone: (${telefone.ddd})${telefone.telefone}
//             `);

//         });
//     });
// });
