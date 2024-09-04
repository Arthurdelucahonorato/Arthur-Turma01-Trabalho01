const GerenciadorDeTarefas = require('../src/Trabalho01Turma01'); // Ajuste o caminho conforme necessário

describe('GerenciadorDeTarefas', () => {
    let gerenciador;
    let tarefa;

    beforeEach(() => {
        // Executa isto antes de cada teste
        gerenciador = new GerenciadorDeTarefas();
        tarefa = { id: 1, descricao: 'Estudar para a prova', concluida: false };
    });

    test('deve adicionar uma tarefa com descrição válida', () => {
        gerenciador.adicionarTarefa(tarefa);
        expect(gerenciador.listarTarefas()).toContainEqual(tarefa);
    });

    test('deve adicionar uma tarefa com descrição válida', () => {
        gerenciador.adicionarTarefa(tarefa);
        expect(gerenciador.listarTarefas()).toContainEqual(tarefa);
    });
    

    test('não deve adicionar uma tarefa com descrição muito curta', () => {
        const tarefaCurta = { id: 2, descricao: 'abc', concluida: false };
        expect(() => gerenciador.adicionarTarefa(tarefaCurta)).toThrow('Erro ao cadastrar tarefa');
    });

    test('deve impedir a adição de uma tarefa com a mesma descrição', () => {
        const tarefaAdicionada = { id: 2, descricao: 'Comprar uma churrasqueira controle remoto', concluida: false };
        gerenciador.adicionarTarefa(tarefaAdicionada);
        const tarefaAdicionada2 = { id: 3, descricao: 'Comprar uma churrasqueira controle remoto', concluida: false };
        expect(() => gerenciador.adicionarTarefa(tarefaAdicionada2)).toThrow('Erro ao cadastrar tarefa: Tarefa com a mesma descrição já existe');
        expect(gerenciador.listarTarefas()).toContainEqual(tarefaAdicionada);
    });

    test('deve remover uma tarefa pelo id', () => {
        const tarefaParaRemover = { id: 5, descricao: 'Limpar casa', concluida: false };
        gerenciador.adicionarTarefa(tarefaParaRemover);
        gerenciador.removerTarefa(5);
        expect(gerenciador.buscarTarefaPorId(5)).toBeUndefined();
    });

    test('deve atualizar uma tarefa existente', () => {
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.atualizarTarefa(1, { descricao: 'Estudar para a prova final' });
        expect(gerenciador.buscarTarefaPorId(1).descricao).toBe('Estudar para a prova final');
    });

    test('deve atualizar uma tarefa que não existente', () => {
        gerenciador.adicionarTarefa(tarefa);
        expect(() => gerenciador.atualizarTarefa(3, { descricao: 'Estudar para a prova final' })).toThrow('Esta tarefa não existe');
    });

    test('deve marcar uma tarefa como concluída', () => {
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.marcarTarefaComoConcluida(1);
        expect(gerenciador.buscarTarefaPorId(1).concluida).toBe(true);
    });

    test('deve marcar uma tarefa como concluída', () => {
        gerenciador.adicionarTarefa(tarefa);
        expect(() => gerenciador.marcarTarefaComoConcluida(2)).toThrow('Esta tarefa não foi encontrada');
    });

    test('deve listar tarefas concluídas', () => {
        const tarefa1 = { id: 6, descricao: 'Ler livro', concluida: true };
        const tarefa2 = { id: 7, descricao: 'Fazer exercícios', concluida: false };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.listarTarefasConcluidas()).toContainEqual(tarefa1);
    });

    test('deve listar tarefas pendentes', () => {
        const tarefa1 = { id: 8, descricao: 'Assistir série', concluida: false };
        const tarefa2 = { id: 9, descricao: 'Pagar contas', concluida: true };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.listarTarefasPendentes()).toContainEqual(tarefa1);
    });

    test('deve remover todas as tarefas concluídas', () => {
        const tarefa1 = { id: 10, descricao: 'Estudar', concluida: true };
        const tarefa2 = { id: 11, descricao: 'Trabalhar', concluida: false };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.removerTarefasConcluidas();
        expect(gerenciador.listarTarefas()).toContainEqual(tarefa2);
        expect(gerenciador.listarTarefas()).not.toContainEqual(tarefa1);
    });

    test('deve buscar tarefas por descrição', () => {
        const tarefa1 = { id: 12, descricao: 'Comprar pão', concluida: false };
        const tarefa2 = { id: 13, descricao: 'Comprar leite', concluida: false };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.buscarTarefaPorDescricao('pão')).toContainEqual(tarefa1);
        expect(gerenciador.buscarTarefaPorDescricao('leite')).toContainEqual(tarefa2);
    });

    test('deve adicionar e remover tags de uma tarefa', () => {
        const tarefa1 = { id: 14, descricao: 'Assistir filme', concluida: false };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTagATarefa(14, 'entretenimento');
        expect(gerenciador.buscarTarefaPorId(14).tags).toContain('entretenimento');
        gerenciador.removerTagDaTarefa(14, 'entretenimento');
        expect(gerenciador.buscarTarefaPorId(14).tags).not.toContain('entretenimento');
    });

    test('deve validar a adicao e remoção de uma tag de uma tarefa que não existe', () => {
        const tarefa1 = { id: 14, descricao: 'Assistir filme', concluida: false };
        gerenciador.adicionarTarefa(tarefa1);
        expect(() => gerenciador.adicionarTagATarefa(15, 'entretenimento')).toThrow('Esta tarefa não foi encontrada');
        expect(() => gerenciador.removerTagDaTarefa(15, 'entretenimento')).toThrow('Esta tarefa não foi encontrada');
    });

    test('deve listar tarefas por tag', () => {
        const tarefa1 = { id: 15, descricao: 'Trabalhar', tags: ['trabalho'], concluida: false };
        const tarefa2 = { id: 16, descricao: 'Estudar', tags: ['educação'], concluida: false };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.listarTarefasPorTag('trabalho')).toContainEqual(tarefa1);
        expect(gerenciador.listarTarefasPorTag('educação')).toContainEqual(tarefa2);
    });

    test('deve atualizar a prioridade de uma tarefa', () => {
        const tarefa1 = { id: 17, descricao: 'Viajar', prioridade: 3, concluida: false };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.atualizarPrioridade(17, 1);
        expect(gerenciador.buscarTarefaPorId(17).prioridade).toBe(1);
    });

    test('deve verificar caso a tarefa não exista para atualizar', () => {
        const tarefa1 = { id: 17, descricao: 'Viajar', prioridade: 3, concluida: false };
        gerenciador.adicionarTarefa(tarefa1);
        expect(() => gerenciador.atualizarPrioridade(18, 1)).toThrow('Esta tarefa não foi encontrada');
    });

    test('deve listar tarefas por prioridade', () => {
        const tarefa1 = { id: 18, descricao: 'Fazer compras', prioridade: 2, concluida: false };
        const tarefa2 = { id: 19, descricao: 'Pagar contas', prioridade: 1, concluida: false };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.listarTarefasPorPrioridade(1)).toContainEqual(tarefa2);
        expect(gerenciador.listarTarefasPorPrioridade(2)).toContainEqual(tarefa1);
    });

    test('deve contar o número total de tarefas', () => {
        const tarefa1 = { id: 20, descricao: 'Ler livro', concluida: false };
        const tarefa2 = { id: 21, descricao: 'Fazer exercícios', concluida: false };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.contarTarefas()).toBe(2);
    });

    test('deve contar tarefas por prioridade', () => {
        const tarefa1 = { id: 22, descricao: 'Estudar', prioridade: 1, concluida: false };
        const tarefa2 = { id: 23, descricao: 'Trabalhar', prioridade: 2, concluida: false };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.contarTarefasPorPrioridade(1)).toBe(1);
        expect(gerenciador.contarTarefasPorPrioridade(2)).toBe(1);
    });

    test('deve marcar todas as tarefas como concluídas', () => {
        const tarefa1 = { id: 24, descricao: 'Fazer comida', concluida: false };
        const tarefa2 = { id: 25, descricao: 'Limpar a casa', concluida: false };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.marcarTodasComoConcluidas();
        expect(gerenciador.listarTarefasConcluidas()).toContainEqual(tarefa1);
        expect(gerenciador.listarTarefasConcluidas()).toContainEqual(tarefa2);
    });

    test('deve reabrir uma tarefa concluída', () => {
        const tarefa1 = { id: 26, descricao: 'Escrever relatório', concluida: true };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.reabrirTarefa(26);
        expect(gerenciador.buscarTarefaPorId(26).concluida).toBe(false);
    });

    test('deve verificar ao reabrir que não existe', () => {
        const tarefa1 = { id: 26, descricao: 'Escrever relatório', concluida: true };
        gerenciador.adicionarTarefa(tarefa1);
        expect(() => gerenciador.reabrirTarefa(27)).toThrow('Esta tarefa não foi encontrada');
    });

    test('deve ordenar tarefas por data', () => {
        const tarefa1 = { id: 27, descricao: 'Fazer exercícios', data: '2024-09-05', concluida: false };
        const tarefa2 = { id: 28, descricao: 'Ler livro', data: '2024-09-04', concluida: false };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.ordenarTarefasPorData();
        expect(gerenciador.listarTarefas()[0].descricao).toBe('Ler livro');
        expect(gerenciador.listarTarefas()[1].descricao).toBe('Fazer exercícios');
    });

    test('deve ordenar tarefas por prioridade', () => {
        const tarefa1 = { id: 29, descricao: 'Estudar', prioridade: 2, concluida: false };
        const tarefa2 = { id: 30, descricao: 'Trabalhar', prioridade: 1, concluida: false };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.ordenarTarefasPorPrioridade();
        expect(gerenciador.listarTarefas()[0].descricao).toBe('Trabalhar');
        expect(gerenciador.listarTarefas()[1].descricao).toBe('Estudar');
    });


    test('deve buscar tarefas por data', () => {
        const tarefa1 = { id: 1, descricao: 'Comprar pão', data: '2024-09-01', concluida: false };
        const tarefa2 = { id: 2, descricao: 'Ler livro', data: '2024-09-02', concluida: false };
        const tarefa3 = { id: 3, descricao: 'Fazer exercícios', data: '2024-09-01', concluida: false };

        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.adicionarTarefa(tarefa3);

        const tarefasDoDia1 = gerenciador.buscarTarefasPorData('2024-09-01');
        const tarefasDoDia2 = gerenciador.buscarTarefasPorData('2024-09-02');

        expect(tarefasDoDia1).toContainEqual(tarefa1);
        expect(tarefasDoDia1).toContainEqual(tarefa3);
        expect(tarefasDoDia2).toContainEqual(tarefa2);

        expect(gerenciador.buscarTarefasPorData('2024-09-03')).toEqual([]);
    });
});
