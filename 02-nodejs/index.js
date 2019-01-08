/**
 * 0 - Obter usuario
 * 1 - Obter o numero de telefone de um usuario a partir de seu Id
 * 2 - Obter o endereço do usuario pelo Id
 */

function obterUsuario(callback) {
    setTimeout(() => {
        return callback(null, {
            id: 1,
            nome: 'Aladin',
            dataNascimento: new Date()
        })
    }, 1000)

}

function obterTelefone(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            telefone: '119002',
            ddd: 11
        })
    }, 2000)
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'dos bobos',
            numero: 0
        })
    }, 2000)
}

function resolverUsuario(erro, usuario) {
    console.log('usuario: ', usuario);
}

obterUsuario((error, usuario) => {
    // null || "" || 0 === false
    if (error) {
        console.log('Deu ruim em usuario', error);
        return;
    }

    obterTelefone(usuario.id, (error1, telefone) => {
        if (error1) {
            console.log('Deu ruim em telefone', error);
            return;
        }
        obterEndereco(usuario.id, (error2, endereco) => {
            if (error2) {
                console.log('Deu ruim em endereco', error);
                return;
            }

            console.log(`
            Nome: ${usuario.nome},
            Endereço: ${endereco.rua}, ${endereco.numero},
            Telefone: (${telefone.ddd})${telefone.telefone}
            `);
            
        });
    });
});
