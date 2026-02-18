import chalk from 'chalk';
import Table from 'cli-table3';
import Produto from '../models/produto.js';
import Carrinho from '../models/carrinho.js';

class CarrinhoService {
    constructor() {
        this.carrinho = new Carrinho();
        this.produtosDisponiveis = this.inicializarProdutos();
    }

    inicializarProdutos() {
        return [
            new Produto(1, 'Smartphone Xiaomi Redmi Note 11', 1899.99, 'Eletrônicos', 15),
            new Produto(2, 'Fone de Ouvido Bluetooth JBL', 299.90, 'Áudio', 20),
            new Produto(3, 'Notebook Dell Inspiron', 4299.99, 'Informática', 8),
            new Produto(4, 'Smart TV LG 43" 4K', 2499.99, 'Eletrônicos', 10),
            new Produto(5, 'Mouse Gamer Logitech', 189.90, 'Informática', 25),
            new Produto(6, 'Teclado Mecânico Redragon', 289.90, 'Informática', 18),
            new Produto(7, 'Tablet Samsung Galaxy Tab', 1899.90, 'Eletrônicos', 12),
            new Produto(8, 'Caixa de Som JBL Charge 5', 899.90, 'Áudio', 15),
            new Produto(9, 'Monitor Samsung 24"', 899.99, 'Informática', 10),
            new Produto(10, 'SSD 1TB Kingston', 449.90, 'Informática', 22)
        ];
    }

    listarProdutos() {
        console.log(chalk.cyan('\n📦 PRODUTOS DISPONÍVEIS:\n'));
        
        const table = new Table({
            head: ['ID', 'Produto', 'Categoria', 'Preço', 'Estoque'],
            colWidths: [5, 30, 15, 15, 10]
        });

        this.produtosDisponiveis.forEach(produto => {
            table.push([
                produto.id,
                produto.nome,
                produto.categoria,
                chalk.green(produto.formatarPreco()),
                produto.estoque > 0 ? chalk.green(produto.estoque) : chalk.red(produto.estoque)
            ]);
        });

        console.log(table.toString());
    }

    mostrarCarrinho() {
        if (this.carrinho.itens.size === 0) {
            console.log(chalk.yellow('\n🛒 Seu carrinho está vazio!'));
            return;
        }

        console.log(chalk.cyan('\n🛒 SEU CARRINHO:\n'));
        
        const table = new Table({
            head: ['ID', 'Produto', 'Preço Unit.', 'Quantidade', 'Subtotal'],
            colWidths: [5, 30, 15, 12, 15]
        });

        for (const [id, item] of this.carrinho.itens) {
            const subtotal = item.produto.preco * item.quantidade;
            table.push([
                id,
                item.produto.nome,
                item.produto.formatarPreco(),
                item.quantidade,
                chalk.green(subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
            ]);
        }

        console.log(table.toString());

        const resumo = this.carrinho.getResumo();
        
        console.log(chalk.cyan('\n📊 RESUMO DO PEDIDO:'));
        console.log(`Subtotal: ${chalk.green(resumo.subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))}`);
        console.log(`Frete: ${resumo.frete === 0 ? chalk.green('Grátis') : chalk.yellow(resumo.frete.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))}`);
        
        if (resumo.desconto > 0) {
            console.log(`Desconto: -${chalk.green(resumo.desconto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))}`);
        }
        
        console.log(chalk.green(`\n💰 TOTAL: ${resumo.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`));
        console.log(chalk.cyan(`📦 Total de itens: ${resumo.quantidadeTotal}`));
    }

    adicionarAoCarrinho(produtoId, quantidade) {
        try {
            const produto = this.produtosDisponiveis.find(p => p.id === produtoId);
            
            if (!produto) {
                console.log(chalk.red('❌ Produto não encontrado!'));
                return false;
            }

            this.carrinho.adicionarItem(produto, quantidade);
            console.log(chalk.green(`✅ ${quantidade}x ${produto.nome} adicionado ao carrinho!`));
            
            if (this.carrinho.calcularSubtotal() >= 100) {
                console.log(chalk.green('🎉 Parabéns! Você ganhou frete grátis!'));
            }
            
            return true;
        } catch (error) {
            console.log(chalk.red(`❌ Erro: ${error.message}`));
            return false;
        }
    }

    removerDoCarrinho(produtoId, quantidade) {
        try {
            const item = this.carrinho.itens.get(produtoId);
            
            if (!item) {
                console.log(chalk.red('❌ Produto não encontrado no carrinho!'));
                return false;
            }

            if (quantidade === 0 || quantidade >= item.quantidade) {
                this.carrinho.removerItem(produtoId);
                console.log(chalk.yellow(`🗑️ ${item.produto.nome} removido do carrinho!`));
            } else {
                this.carrinho.removerItem(produtoId, quantidade);
                console.log(chalk.yellow(`🗑️ ${quantidade}x ${item.produto.nome} removido do carrinho!`));
            }
            
            return true;
        } catch (error) {
            console.log(chalk.red(`❌ Erro: ${error.message}`));
            return false;
        }
    }

    atualizarQuantidade(produtoId, novaQuantidade) {
        try {
            this.carrinho.atualizarQuantidade(produtoId, novaQuantidade);
            console.log(chalk.green(`✅ Quantidade atualizada para ${novaQuantidade}`));
            return true;
        } catch (error) {
            console.log(chalk.red(`❌ Erro: ${error.message}`));
            return false;
        }
    }

    aplicarCupom(codigo) {
        try {
            const mensagem = this.carrinho.aplicarCupomDesconto(codigo.toUpperCase());
            console.log(chalk.green(`✅ Cupom aplicado! ${mensagem}`));
            return true;
        } catch (error) {
            console.log(chalk.red(`❌ Erro: ${error.message}`));
            return false;
        }
    }

    finalizarCompra() {
        if (this.carrinho.itens.size === 0) {
            console.log(chalk.yellow('❌ Carrinho vazio! Adicione itens antes de finalizar.'));
            return false;
        }

        console.log(chalk.green('\n🎉 COMPRA FINALIZADA COM SUCESSO! 🎉'));
        console.log(chalk.cyan('📋 Resumo do pedido:'));
        
        const resumo = this.carrinho.getResumo();
        
        for (const item of resumo.itens) {
            console.log(`${item.quantidade}x ${item.produto.nome} - ${chalk.green((item.produto.preco * item.quantidade).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))}`);
        }
        
        console.log(chalk.green(`\n💰 Total pago: ${resumo.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`));
        console.log(chalk.cyan('📦 Seu pedido será entregue em breve!\n'));
        
        this.carrinho.limparCarrinho();
        return true;
    }
}

export default CarrinhoService;