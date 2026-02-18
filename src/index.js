import readline from 'readline';
import chalk from 'chalk';
import CarrinhoService from './services/carrinhoService.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

class ShopeeTerminal {
    constructor() {
        this.carrinhoService = new CarrinhoService();
    }

    mostrarMenu() {
        console.log(chalk.yellow('\n' + '='.repeat(50)));
        console.log(chalk.bold.cyan('         🛍️  SHOPEE TERMINAL  🛍️'));
        console.log(chalk.yellow('='.repeat(50)));
        console.log(chalk.white('1. 📋 Listar produtos'));
        console.log(chalk.white('2. 🛒 Ver carrinho'));
        console.log(chalk.white('3. ➕ Adicionar ao carrinho'));
        console.log(chalk.white('4. ➖ Remover do carrinho'));
        console.log(chalk.white('5. 🔄 Atualizar quantidade'));
        console.log(chalk.white('6. 🏷️  Aplicar cupom'));
        console.log(chalk.white('7. 💰 Finalizar compra'));
        console.log(chalk.white('8. 🧹 Limpar carrinho'));
        console.log(chalk.red('9. 🚪 Sair'));
        console.log(chalk.yellow('='.repeat(50)));
    }

    async executar() {
        console.log(chalk.cyan('\n🛍️  Bem-vindo à Shopee Terminal!'));
        console.log(chalk.gray('Sua experiência de compra no terminal!\n'));

        let opcao;
        do {
            this.mostrarMenu();
            opcao = await question(chalk.blue('\n📌 Escolha uma opcao: '));
            opcao = opcao.trim();

            switch (opcao) {
                case '1':
                    this.carrinhoService.listarProdutos();
                    break;
                case '2':
                    this.carrinhoService.mostrarCarrinho();
                    break;
                case '3':
                    await this.adicionarProduto();
                    break;
                case '4':
                    await this.removerProduto();
                    break;
                case '5':
                    await this.atualizarQuantidade();
                    break;
                case '6':
                    await this.aplicarCupom();
                    break;
                case '7':
                    this.carrinhoService.finalizarCompra();
                    break;
                case '8':
                    await this.limparCarrinho();
                    break;
                case '9':
                    console.log(chalk.green('\n👋 Obrigado por comprar na Shopee Terminal! Volte sempre!\n'));
                    rl.close();
                    return;
                default:
                    console.log(chalk.red(`❌ Opção "${opcao}" inválida! Tente novamente.`));
            }

            if (opcao !== '9') {
                await this.pausar();
            }
        } while (opcao !== '9');
    }

    async adicionarProduto() {
        console.log(chalk.cyan('\n📦 Adicionar produto ao carrinho:'));
        this.carrinhoService.listarProdutos();
        
        const id = await question(chalk.blue('\n📌 ID do produto: '));
        const quantidade = await question(chalk.blue('📌 Quantidade: '));

        this.carrinhoService.adicionarAoCarrinho(parseInt(id), parseInt(quantidade));
    }

    async removerProduto() {
        if (this.carrinhoService.carrinho.itens.size === 0) {
            console.log(chalk.yellow('❌ Carrinho vazio!'));
            return;
        }

        console.log(chalk.cyan('\n🗑️ Remover produto do carrinho:'));
        this.carrinhoService.mostrarCarrinho();
        
        const id = await question(chalk.blue('\n📌 ID do produto a remover: '));
        const opcao = (await question(chalk.blue('Remover todos? (S/N): '))).toUpperCase().trim();
        
        if (opcao === 'S') {
            this.carrinhoService.removerDoCarrinho(parseInt(id), 0);
        } else {
            const quantidade = await question(chalk.blue('Quantidade a remover: '));
            this.carrinhoService.removerDoCarrinho(parseInt(id), parseInt(quantidade));
        }
    }

    async atualizarQuantidade() {
        if (this.carrinhoService.carrinho.itens.size === 0) {
            console.log(chalk.yellow('❌ Carrinho vazio!'));
            return;
        }

        console.log(chalk.cyan('\n🔄 Atualizar quantidade:'));
        this.carrinhoService.mostrarCarrinho();
        
        const id = await question(chalk.blue('\n📌 ID do produto: '));
        const novaQuantidade = await question(chalk.blue('📌 Nova quantidade: '));

        this.carrinhoService.atualizarQuantidade(parseInt(id), parseInt(novaQuantidade));
    }

    async aplicarCupom() {
        console.log(chalk.cyan('\n🏷️ Aplicar cupom de desconto:'));
        const codigo = await question(chalk.blue('📌 Digite o código do cupom: '));
        this.carrinhoService.aplicarCupom(codigo.trim());
    }

    async limparCarrinho() {
        console.log(chalk.cyan('\n🧹 Limpar carrinho:'));
        const confirmacao = (await question(chalk.yellow('⚠️ Tem certeza que deseja limpar o carrinho? (S/N): '))).toUpperCase().trim();
        
        if (confirmacao === 'S') {
            this.carrinhoService.carrinho.limparCarrinho();
            console.log(chalk.green('✅ Carrinho limpo com sucesso!'));
        }
    }

    async pausar() {
        await question(chalk.gray('\n⏎ Pressione Enter para continuar...'));
    }
}

// Iniciar aplicação
try {
    const app = new ShopeeTerminal();
    await app.executar();
} catch (error) {
    console.error(chalk.red('Erro ao iniciar aplicação:'), error);
    rl.close();
}