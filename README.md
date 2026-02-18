markdown
# 🛍️ Shoppe Carrinho Terminal

![Node.js](https://img.shields.io/badge/Node.js-22.x-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-concluído-brightgreen.svg)
![GitHub](https://img.shields.io/badge/GitHub-matheus--cmc-181717?logo=github)

<div align="center">
  <img src="https://img.icons8.com/color/96/000000/shopping-cart.png" alt="Shopping Cart"/>
  <h3>Sistema de Carrinho de Compras inspirado na Shopee</h3>
  <p>Desenvolvido por <a href="https://github.com/matheus-cmc">@matheus-cmc</a></p>
</div>

---

## 📋 Sobre o Projeto

Este é um sistema completo de **carrinho de compras** inspirado na Shopee, desenvolvido em **Node.js** para execução no terminal. O projeto simula uma experiência real de compra online, permitindo ao usuário interagir com o sistema para adicionar, remover e modificar produtos no carrinho, com cálculos automáticos de totais, frete dinâmico e aplicação de cupons de desconto.

Desenvolvido como parte de um desafio de projeto na **DIO.me** para demonstrar conceitos de back-end, lógica de programação e desenvolvimento de sistemas interativos no terminal.

---

## ✨ Funcionalidades

| Funcionalidade | Descrição |
|----------------|-----------|
| ✅ **Listagem de produtos** | Visualize todos os produtos com ID, nome, categoria, preço e estoque |
| ✅ **Carrinho de compras** | Adicione, remova e atualize itens no carrinho |
| ✅ **Cálculos automáticos** | Subtotal por item, subtotal total, frete dinâmico e total final |
| ✅ **Sistema de cupons** | Aplique cupons de desconto (SHOPEE10, SHOPEE20, FRETEGRATIS) |
| ✅ **Frete inteligente** | Frete grátis para compras acima de R$100 |
| ✅ **Controle de estoque** | Estoque atualizado em tempo real |
| ✅ **Interface colorida** | Visual agradável com cores no terminal |
| ✅ **Tabelas formatadas** | Exibição organizada de produtos e carrinho |

---

## 🛠️ Tecnologias Utilizadas

<div align="center">
  
| Tecnologia | Versão | Para que serve |
|------------|--------|----------------|
| **Node.js** | v22.x | Ambiente de execução JavaScript |
| **ECMAScript Modules** | ES6 | Sistema de módulos moderno (import/export) |
| **Chalk** | 4.1.2 | Estilização e cores no terminal |
| **cli-table3** | 0.6.3 | Criação de tabelas formatadas |
| **readline** | Nativo | Interface de linha de comando interativa |

</div>

---

## 📁 Estrutura do Projeto
shoppe-carrinho-terminal/
├── src/
│ ├── index.js # Arquivo principal (entry point)
│ ├── models/
│ │ ├── produto.js # Classe Produto
│ │ └── carrinho.js # Classe Carrinho
│ └── services/
│ └── carrinhoService.js # Serviço principal com lógica de negócios
├── package.json # Dependências e scripts
└── README.md # Documentação

text

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js instalado (versão 22.x ou superior)
- NPM (Node Package Manager) ou Yarn
- Git (opcional, para clonar)

### Passo a Passo

1. **Clone o repositório**
   ```bash
   git clone https://github.com/matheus-cmc/shoppe-carrinho-terminal.git
Entre na pasta do projeto

bash
cd shoppe-carrinho-terminal
Instale as dependências

bash
npm install
Execute o projeto

Modo desenvolvimento (com nodemon - atualiza automaticamente):

bash
npm run dev
Modo produção:

bash
npm start
📖 Como Usar
Ao executar o programa, você verá um menu interativo colorido:

text
==================================================
         🛍️  SHOPEE TERMINAL  🛍️
==================================================
1. 📋 Listar produtos
2. 🛒 Ver carrinho
3. ➕ Adicionar ao carrinho
4. ➖ Remover do carrinho
5. 🔄 Atualizar quantidade
6. 🏷️  Aplicar cupom
7. 💰 Finalizar compra
8. 🧹 Limpar carrinho
9. 🚪 Sair
==================================================
Exemplo Prático de Uso
1️⃣ Listar produtos disponíveis
text
📦 PRODUTOS DISPONÍVEIS:

┌─────┬──────────────────────────────┬───────────────┬───────────────┬──────────┐
│ ID  │ Produto                       │ Categoria     │ Preço         │ Estoque  │
├─────┼──────────────────────────────┼───────────────┼───────────────┼──────────┤
│ 1   │ Smartphone Xiaomi Redmi Note 11 │ Eletrônicos  │ R$ 1.899,99   │ 15       │
│ 2   │ Fone de Ouvido Bluetooth JBL    │ Áudio        │ R$ 299,90     │ 20       │
│ 3   │ Notebook Dell Inspiron          │ Informática  │ R$ 4.299,99   │ 8        │
└─────┴──────────────────────────────┴───────────────┴───────────────┴──────────┘
2️⃣ Adicionar produtos ao carrinho
Escolha a opção 3, digite o ID do produto e a quantidade desejada.

3️⃣ Visualizar o carrinho
text
🛒 SEU CARRINHO:

┌─────┬──────────────────────────────┬───────────────┬──────────────┬─────────────────┐
│ ID  │ Produto                       │ Preço Unit.   │ Quantidade   │ Subtotal        │
├─────┼──────────────────────────────┼───────────────┼──────────────┼─────────────────┤
│ 1   │ Smartphone Xiaomi Redmi Note 11 │ R$ 1.899,99  │ 1            │ R$ 1.899,99     │
│ 2   │ Fone de Ouvido Bluetooth JBL    │ R$ 299,90    │ 2            │ R$ 599,80       │
└─────┴──────────────────────────────┴───────────────┴──────────────┴─────────────────┘

📊 RESUMO DO PEDIDO:
Subtotal: R$ 2.499,79
Frete: R$ 14,00
💰 TOTAL: R$ 2.513,79
📦 Total de itens: 3
4️⃣ Aplicar cupom de desconto
Digite o código do cupom (SHOPEE10, SHOPEE20 ou FRETEGRATIS)

5️⃣ Finalizar a compra
Confira o resumo final e finalize o pedido!

🎁 Cupons Disponíveis
Código	Benefício	Exemplo de Uso
SHOPEE10	10% de desconto	Compra de R$100 → paga R$90
SHOPEE20	20% de desconto	Compra de R$100 → paga R$80
FRETEGRATIS	Frete grátis	Frete de R$14 → R$0
🧠 Conceitos Aplicados
Este projeto demonstra diversos conceitos importantes de desenvolvimento:

Programação Orientada a Objetos (POO)
Classes: Produto, Carrinho, CarrinhoService

Encapsulamento: Cada classe com suas responsabilidades

Métodos: Ações específicas para cada classe

Estruturas de Dados
Map(): Para gerenciar itens no carrinho (mais eficiente que objetos)

Arrays: Para listar produtos disponíveis

Iteração: Uso de for...of, forEach, Map.values()

Módulos ES6
import/export: Organização do código em módulos

Default exports: Cada arquivo exporta sua principal funcionalidade

Tratamento de Erros
try/catch: Para operações que podem falhar

Throw: Para erros personalizados (estoque insuficiente, cupom inválido)

Lógica de Negócios
Cálculo de frete: Dinâmico baseado no valor da compra

Sistema de cupons: Validação e aplicação de descontos

Controle de estoque: Atualização em tempo real


🚧 Desafios Enfrentados
Durante o desenvolvimento, alguns desafios foram superados:

Módulos ES6 vs CommonJS: Configuração correta do "type": "module" no package.json

Entrada do usuário: Adaptação para usar readline nativo em vez de readline-sync

Cálculo de frete: Lógica para frete dinâmico baseado em valor e quantidade

Controle de estoque: Garantir que o estoque seja atualizado corretamente ao adicionar/remover

Interface no terminal: Formatação de tabelas e cores para melhor experiência

📝 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

👨‍💻 Autor
Matheus Carvalho
GitHub: @matheus-cmc

Projeto: shoppe-carrinho-terminal

LinkedIn: Matheus CMC

🙏 Agradecimentos
DIO.me pelo desafio e oportunidade de aprendizado

Shopee pela inspiração na interface

Comunidade open source pelas bibliotecas incríveis

<div align="center"> <p>⭐ Se este projeto te ajudou, dá uma estrelinha no GitHub! ⭐</p> <p>Desenvolvido com ❤️ por Matheus CMC</p> </div> ```
Badge adicional com seu nome:
markdown
![GitHub](https://img.shields.io/badge/GitHub-matheus--cmc-181717?logo=github&style=for-the-badge)
Link do seu GitHub para adicionar no README:
markdown
- **GitHub**: [@matheus-cmc](https://github.com/matheus-cmc)
- **Projeto**: [shoppe-carrinho-terminal](https://github.com/matheus-cmc/shoppe-carrinho-terminal)
Comandos para criar o repositório:
bash
# Criar repositório no GitHub via terminal (se tiver gh instalado)
gh repo create matheus-cmc/shoppe-carrinho-terminal --public --source=. --remote=origin --push

# Ou manualmente:
git init
git add .
git commit -m "feat: sistema de carrinho de compras shopee-like"
git branch -M main
git remote add origin https://github.com/matheus-cmc/shoppe-carrinho-terminal.git
git push -u origin main
