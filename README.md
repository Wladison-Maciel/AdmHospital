# 🏥 HospitalAPI

## 📚 Descrição Geral

A **HospitalAPI** é uma aplicação backend desenvolvida para facilitar a gestão hospitalar, permitindo o cadastro e gerenciamento de pacientes e seus respectivos acompanhantes. O sistema é voltado para uso interno de clínicas ou hospitais, com autenticação JWT, rotas protegidas, validação de dados e documentação interativa com Swagger.

> Projeto ideal para fins acadêmicos, portfólio ou como base para aplicações maiores em saúde.

---

## 🚀 Funcionalidades

### 1. 📋 **Gestão de Pacientes**
- CRUD completo (criar, listar, atualizar, deletar).
- Filtros por nome, CPF, diagnóstico, status e datas.
- Paginação e ordenação de resultados.

### 2. 👥 **Gestão de Acompanhantes**
- Associado a um paciente (1 paciente → 1 acompanhante).
- CRUD completo de acompanhante vinculado a um paciente.

### 3. 🔐 **Gestão de Usuários**
- Cadastro e login de usuários administrativos.
- Autenticação JWT.
- Proteção de rotas privadas.

### 4. 🛡 **Regras de Negócio**
- Paciente pode ter no máximo 1 acompanhante.
- Validações fortes com **Yup** e **Zod**.
- Validação customizada por parâmetros de rota e corpo da requisição.

### 5. 📄 **Documentação com Swagger**
- Acesse a documentação em `/api-docs`.
- Teste interativo das rotas.
- Separação por entidades: Pacientes, Acompanhantes, Usuários e Sessões.

### 6. 📄 **Arquitetura MVC**
- Estrutura de projeto organizada com a arquitetura MVC (Model-View-Controller).
- Separação clara entre as responsabilidades de cada camada, facilitando a manutenção e escalabilidade do código.
- Models responsáveis pela interação com o banco de dados.
- Controllers responsáveis pela lógica de negócios e manipulação das rotas.
---

## 🧱 Arquitetura do Projeto

```
src/
├── app/
│   ├── controllers/
│   ├── models/
│   ├── schemas/
│   ├── middlewares/
├── config/
│   ├── database.js
│   └── swagger.js
├── database/
│   ├── migrations/
│   docs/
│   ├── swaggerCompanions.js
│   ├── swaggerPatients.js
│   ├── swaggerUsers.js
│   └── swaggerSessions.js
├── app.js
├── routes.js
└── server.js
```

---

## 💻 Tecnologias Utilizadas

### **Backend**
- ⚡ **Node.js** — Runtime principal.
- 🚀 **Express.js** — Framework para rotas e middlewares.
- 🐘 **Sequelize** — ORM para PostgreSQL.
- 🔐 **JWT** — Autenticação segura.
- 🧪 **Yup / Zod** — Validação de dados.
- 📅 **date-fns** — Manipulação de datas.

### **Documentação**
- 📘 **Swagger (swagger-jsdoc + swagger-ui-express)** — Documentação interativa das rotas.

### **Banco de Dados**
- 📊 **PostgreSQL** — Sistema de banco de dados relacional.

### **Ferramentas**
- 🔧 **Insomnia** — Teste de rotas.
- 💻 **VS Code** — Editor de código.
- 🛠 **Git e GitHub** — Versionamento.

### **Gerenciador de Pacotes**
- 📦 **Yarn** - Utilizado para gerenciar as intalações.
---

## 📑 Como Usar

### 1. Clone o repositório
```bash
git clone https://github.com/Wladison-Maciel/AdmHospital
cd apihospitalar
```

### 2. Instale as dependências
```bash
yarn install
```

### 3. Configure o ambiente
Crie um arquivo `.env` na raiz com:
```
DB_HOST=localhost
DB_USERNAME=postgres
DB_PASSWORD=[Sua senha do PostgreSQL]
DB_DATABASE=[Nome do seu Database]
DB_DIALECT=postgres
APP_SECRET=[Crie uma senha aleatória]
```

### 4. Execute as migrations
```bash
yarn sequelize db:migrate
```

### 5. Inicie a aplicação
```bash
yarn dev
```

### 6. Acesse a documentação
```
http://localhost:3000/api-docs
```

### 7. 🔐 Autenticação inicial

Antes de acessar as rotas protegidas, siga este fluxo:

1. Acesse a rota `POST /users` e cadastre um novo usuário administrativo.
2. Após criado, vá para `POST /sessions` e envie o e-mail e senha cadastrados.
3. Copie o token JWT retornado e adicione no header das requisições seguintes:
```bash
Authorization: Bearer SEU_TOKEN_AQUI
```
---

## 👨‍💻 Autor

Desenvolvido por **Wladison** com foco em aprendizado, backend e boas práticas.

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=express,js,nodejs,yarn,vscode,postgres,sequelize,git,md" />
  </a>
</div>