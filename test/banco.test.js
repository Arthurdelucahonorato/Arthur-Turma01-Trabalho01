// Banco.test.js
const Banco = require('../src/banco'); // Ajuste o caminho conforme a localização do seu arquivo Banco.js

describe('Banco', () => {
    let banco;

    beforeEach(() => {
        //Executa isto antes de cada teste
        banco = new Banco('Banco Teste', 1000);
        contaDestino = new Banco('Conta Destino');
    });


    //Cada teste abaixo é individual e o befireEach le antes de executar logo o banco sempre tem saldo de 1000
    test('deve criar uma nova instância com saldo inicial', () => {
        expect(banco.obterSaldo()).toBe(1000);
    });

    test('deve depositar dinheiro e atualizar o saldo', () => {
        banco.depositar(500);
        expect(banco.obterSaldo()).toBe(1500);
        expect(banco.obterHistorico()).toContainEqual({ tipo: 'Depósito', valor: 500 });
    });

    test('deve sacar dinheiro e atualizar o saldo', () => {
        banco.sacar(200);
        expect(banco.obterSaldo()).toBe(800);
        expect(banco.obterHistorico()).toContainEqual({ tipo: 'Saque', valor: 200 });
    });

    test('deve lançar erro ao tentar sacar mais do que o saldo', () => {
        expect(() => banco.sacar(1200)).toThrow('Saldo insuficiente');
    });

    test('deve transferir dinheiro para outra conta', () => {
        banco.transferir(300, contaDestino);
        expect(banco.obterSaldo()).toBe(700);
        expect(contaDestino.obterSaldo()).toBe(300);
        expect(banco.obterHistorico()).toContainEqual({ tipo: 'Transferência', valor: 300, destino: 'Conta Destino' });
    });

    test('deve aplicar juros ao saldo', () => {
        //Arrange (Arranjo)
        banco.aplicarJuros(5);
        //Act (agir)
        expect(banco.obterSaldo()).toBeCloseTo(1050); // Devido a arredondamento
        //Assert (afirmar)
        expect(banco.obterHistorico()).toContainEqual({ tipo: 'Juros', valor: 50 });
    });

    test('deve pagar uma conta e atualizar o saldo', () => {
        banco.pagarConta(100, 'Conta de Luz');
        expect(banco.obterSaldo()).toBe(900);
        expect(banco.obterHistorico()).toContainEqual({ tipo: 'Pagamento', valor: 100, descricao: 'Conta de Luz' });
    });

    test('deve definir e verificar limite de saque', () => {
        banco.definirLimiteDeSaque(500);
        expect(() => banco.verificarLimiteDeSaque(600)).toThrow('Saque acima do limite permitido');
        expect(banco.verificarLimiteDeSaque(400)).toBe(true);
    });

    test('deve calcular o total depositado corretamente', () => {
        banco.depositar(200);
        banco.depositar(300);

        expect(banco.obterTotalDepositado()).toBe(500);
    });

    test('deve mo', () => {
        banco.depositar(200);
        banco.depositar(300);
        expect(banco.obterTotalDepositado()).toBe(500);
    });
});
