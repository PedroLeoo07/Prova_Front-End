# 🚀 Atividade Avaliativa de Front-End com Next.js e Node.js

## 📖 Descrição

Este projeto é uma atividade avaliativa de front-end desenvolvida utilizando o framework **Next.js**. O objetivo é criar uma aplicação web com integração ao back-end, implementado em **Node.js**, para demonstrar habilidades em desenvolvimento full-stack.

## 🛠️ Tecnologias Utilizadas

- **Front-End**: Next.js
- **Back-End**: Node.js
- **Linguagem**: JavaScript
- **Gerenciador de Pacotes**: npm 
- **Banco de Dados**: PostgreSQL

## ✨ Funcionalidades

- ✅ Integração entre front-end e back-end.
- ✅ Consumo de API REST para troca de dados.
- ✅ Interface responsiva e amigável.
- ✅ Autenticação de usuários.
- ✅ Operações CRUD no banco de dados.
- (Adicione outras funcionalidades específicas do projeto.)

## 📂 Estrutura do Projeto

- **front-end/**: Contém o código do front-end desenvolvido em Next.js.
- **back-end/**: Contém o código do back-end desenvolvido em Node.js.
- **database/**: Scripts ou configurações relacionadas ao banco de dados (se aplicável).

## 🚀 Como Executar

### ⚙️ Pré-requisitos

- Node.js instalado.
- Gerenciador de pacotes npm ou yarn.
- Banco de dados configurado (ex.: PostgreSQL).

### 📝 Passos

1. Clone o repositório:
    ```bash
    git clone https://github.com/PedroLeoo07/Prova_Front-End
    ```

2. Instale as dependências no front-end e no back-end:
    ```bash
    cd Prova_Front-End
    npm install
    cd ativ-avaliativa_Bac-End
    npm install
    ```

3. Configure as variáveis de ambiente:
    - Crie um arquivo `.env` no diretório `back-end` com as seguintes variáveis:
        ```
        DATABASE_URL=<URL_DO_BANCO_DE_DADOS>
        PORT=5000
        ```
    - (Adicione outras variáveis necessárias, se aplicável.)

4. Inicie o servidor do back-end:
    ```bash
    cd back-end
    npm run dev
    ```

5. Inicie o servidor do front-end:
    ```bash
    cd front-end
    npm run dev
    ```

6. Acesse a aplicação no navegador:
    ```
    http://localhost:3000
    ```

## 🧪 Testes

- Para executar os testes (se configurados):
    ```bash
    cd front-end
    npm test
    cd ../back-end
    npm test
    ```

## 🤝 Contribuição

Contribuições são bem-vindas! Siga os passos abaixo para contribuir:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature:
    ```bash
    git checkout -b minha-feature
    ```
3. Commit suas alterações:
    ```bash
    git commit -m "Adiciona minha feature"
    ```
4. Envie para o repositório remoto:
    ```bash
    git push origin minha-feature
    ```
5. Abra um Pull Request.

Antes de contribuir, leia o arquivo `CONTRIBUTING.md` (se disponível).

## 📜 Licença

Este projeto é apenas para fins educacionais e não possui uma licença específica.

---
💡 **Dica**: Sempre mantenha seu repositório atualizado com o comando:
```bash
git pull origin main
```
