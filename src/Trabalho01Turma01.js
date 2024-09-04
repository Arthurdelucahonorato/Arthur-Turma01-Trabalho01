class GerenciadorDeTarefas {
    constructor() {
        this.tarefas = [];
    }

    adicionarTarefa(tarefa) {
        if (tarefa.descricao.length <= 3) {
            throw new Error('Erro ao cadastrar tarefa');
        }
        const tarefaExistente = this.tarefas.some(t => t.descricao === tarefa.descricao);
        if (tarefaExistente) {
            throw new Error('Erro ao cadastrar tarefa: Tarefa com a mesma descrição já existe');
        }
        this.tarefas.push(tarefa);
    }

    removerTarefa(id) {
        this.tarefas = this.tarefas.filter(tarefa => tarefa.id !== id);
    }

    buscarTarefaPorId(id) {
        return this.tarefas.find(tarefa => tarefa.id === id);
    }

    atualizarTarefa(id, novosDados) {
        const index = this.tarefas.findIndex(tarefa => tarefa.id === id);
        if (index !== -1) {
            this.tarefas[index] = { ...this.tarefas[index], ...novosDados };
        }
        else { 
            throw new Error('Esta tarefa não existe')
        }
    
    }

    listarTarefas() {
        return this.tarefas;
    }

    contarTarefas() {
        return this.tarefas.length;
    }

    marcarTarefaComoConcluida(id) {
        const tarefa = this.buscarTarefaPorId(id);
        if (tarefa) {
            tarefa.concluida = true;
        }
        else {
            throw new Error('Esta tarefa não foi encontrada')
        }
       
    }

    listarTarefasConcluidas() {
        return this.tarefas.filter(tarefa => tarefa.concluida);
    }

    listarTarefasPendentes() {
        return this.tarefas.filter(tarefa => !tarefa.concluida);
    }

    removerTarefasConcluidas() {
        this.tarefas = this.tarefas.filter(tarefa => !tarefa.concluida);
    }

    buscarTarefaPorDescricao(descricao) {
        return this.tarefas.filter(tarefa => tarefa.descricao.includes(descricao));
    }

    adicionarTagATarefa(id, tag) {
        const tarefa = this.buscarTarefaPorId(id);
        if (tarefa) {
            tarefa.tags = tarefa.tags || [];
            tarefa.tags.push(tag);
        }
        else {
            throw new Error('Esta tarefa não foi encontrada')
        }
    }

    removerTagDaTarefa(id, tag) {
        const tarefa = this.buscarTarefaPorId(id);
        if (tarefa && tarefa.tags) {
            tarefa.tags = tarefa.tags.filter(t => t !== tag);
        }
        else {
            throw new Error('Esta tarefa não foi encontrada')
        }
    }

    listarTarefasPorTag(tag) {
        return this.tarefas.filter(tarefa => tarefa.tags && tarefa.tags.includes(tag));
    }

    buscarTarefasPorData(data) {
        return this.tarefas.filter(tarefa => tarefa.data === data);
    }

    atualizarPrioridade(id, novaPrioridade) {
        const tarefa = this.buscarTarefaPorId(id);
        if (tarefa) {
            tarefa.prioridade = novaPrioridade;
        }
        else {
            throw new Error('Esta tarefa não foi encontrada')
        }
    }

    listarTarefasPorPrioridade(prioridade) {
        return this.tarefas.filter(tarefa => tarefa.prioridade === prioridade);
    }

    contarTarefasPorPrioridade(prioridade) {
        return this.tarefas.filter(tarefa => tarefa.prioridade === prioridade).length;
    }

    marcarTodasComoConcluidas() {
        this.tarefas.forEach(tarefa => {
            tarefa.concluida = true;
        });
    }

    reabrirTarefa(id) {
        const tarefa = this.buscarTarefaPorId(id);
        if (tarefa) {
            tarefa.concluida = false;
        }
        else {
            throw new Error('Esta tarefa não foi encontrada')
        }
    }

    ordenarTarefasPorData() {
        this.tarefas.sort((a, b) => new Date(a.data) - new Date(b.data));
    }

    ordenarTarefasPorPrioridade() {
        this.tarefas.sort((a, b) => a.prioridade - b.prioridade);
    }



}

module.exports = GerenciadorDeTarefas;