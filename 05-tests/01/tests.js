const assert = require('assert');
const { obterPessoas } = require('./sevice');

describe("Star Wars Tests", () => {
    it("Deve buscar o R2-D2 com o formato correto", async () => {
        const expected = [{ nome: 'R2-D2', peso: '96' }];
        const nomeBase = `r2-d2`;
        const resultado = await obterPessoas(nomeBase);
        assert.deepEqual(resultado, expected);
    });
});