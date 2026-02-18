import Produto from './produto.js';

class Carrinho {
    constructor() {
        this.itens = new Map();
        this.frete = 0;
        this.desconto = 0;
    }

    adicionarItem(produto, quantidade = 1) {
        if (produto.estoque < quantidade) {
            throw new Error(`Estoque insuficiente para ${produto.nome}. Disponível: ${produto.estoque}`);
        }

        if (this.itens.has(produto.id)) {
            const item = this.itens.get(produto.id);
            const novaQuantidade = item.quantidade + quantidade;
            
            if (produto.estoque < novaQuantidade) {
                throw new Error(`Estoque insuficiente para adicionar mais ${quantidade} unidade(s) de ${produto.nome}`);
            }
            
            item.quantidade = novaQuantidade;
        } else {
            this.itens.set(produto.id, {
                produto,
                quantidade
            });
        }
        
        produto.estoque -= quantidade;
        this.calcularFrete();
    }

    removerItem(produtoId, quantidade = null) {
        if (!this.itens.has(produtoId)) {
            throw new Error('Produto não encontrado no carrinho');
        }

        const item = this.itens.get(produtoId);
        
        if (quantidade === null || quantidade >= item.quantidade) {
            item.produto.estoque += item.quantidade;
            this.itens.delete(produtoId);
        } else {
            item.quantidade -= quantidade;
            item.produto.estoque += quantidade;
        }
        
        this.calcularFrete();
    }

    atualizarQuantidade(produtoId, novaQuantidade) {
        if (!this.itens.has(produtoId)) {
            throw new Error('Produto não encontrado no carrinho');
        }

        const item = this.itens.get(produtoId);
        
        if (novaQuantidade <= 0) {
            this.removerItem(produtoId);
            return;
        }

        const diferenca = novaQuantidade - item.quantidade;
        
        if (diferenca > 0 && item.produto.estoque < diferenca) {
            throw new Error(`Estoque insuficiente. Disponível: ${item.produto.estoque}`);
        }

        item.produto.estoque -= diferenca;
        item.quantidade = novaQuantidade;
        this.calcularFrete();
    }

    calcularSubtotal() {
        let subtotal = 0;
        for (const item of this.itens.values()) {
            subtotal += item.produto.preco * item.quantidade;
        }
        return subtotal;
    }

    calcularFrete() {
        const subtotal = this.calcularSubtotal();
        if (subtotal >= 100) {
            this.frete = 0;
        } else {
            const quantidadeTotal = this.getQuantidadeTotal();
            this.frete = 10 + (quantidadeTotal * 2);
        }
        return this.frete;
    }

    calcularTotal() {
        const subtotal = this.calcularSubtotal();
        const total = subtotal + this.frete - this.desconto;
        return total > 0 ? total : 0;
    }

    getQuantidadeTotal() {
        let total = 0;
        for (const item of this.itens.values()) {
            total += item.quantidade;
        }
        return total;
    }

    aplicarCupomDesconto(codigo) {
        const cupons = {
            'SHOPEE10': 0.10,
            'SHOPEE20': 0.20,
            'FRETEGRATIS': 0
        };

        if (cupons[codigo]) {
            if (codigo === 'FRETEGRATIS') {
                this.frete = 0;
                return 'Frete grátis aplicado!';
            } else {
                const subtotal = this.calcularSubtotal();
                this.desconto = subtotal * cupons[codigo];
                return `Desconto de ${cupons[codigo] * 100}% aplicado!`;
            }
        }
        throw new Error('Cupom inválido');
    }

    limparCarrinho() {
        for (const item of this.itens.values()) {
            item.produto.estoque += item.quantidade;
        }
        this.itens.clear();
        this.frete = 0;
        this.desconto = 0;
    }

    getResumo() {
        return {
            itens: Array.from(this.itens.values()),
            quantidadeTotal: this.getQuantidadeTotal(),
            subtotal: this.calcularSubtotal(),
            frete: this.frete,
            desconto: this.desconto,
            total: this.calcularTotal()
        };
    }
}

export default Carrinho;