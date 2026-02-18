class Produto {
    constructor(id, nome, preco, categoria, estoque = 10) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.categoria = categoria;
        this.estoque = estoque;
    }

    formatarPreco() {
        return this.preco.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    getInfo() {
        return `${this.nome} - ${this.formatarPreco()} (Estoque: ${this.estoque})`;
    }
}

export default Produto;