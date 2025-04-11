# 🏥 HospitalAPI

## 📚 Descrição Geral
A **HospitalAPI** é uma aplicação backend desenvolvida com foco na gestão hospitalar, permitindo o cadastro e gerenciamento de pacientes, acompanhantes e suas informações clínicas. O projeto tem como objetivo oferecer uma base robusta para sistemas hospitalares, com autenticação JWT, regras de negócio personalizadas e uma arquitetura escalável baseada em Node.js e Sequelize.

## ⚙️ Funcionalidades

### 1. **📋 Gestão de Pacientes**
- Cadastro de novos pacientes.
- Atualização de dados com controle de campos sensíveis.
- Filtros por nome, CPF, status, data de nascimento, diagnóstico e datas de criação/atualização.
- Ordenação e paginação dos resultados.

### 2. **👥 Gestão de Acompanhantes**
- Associação 1:1 com paciente.
- Cadastro e atualização separados do paciente.

### 3. **🔒 Autenticação**
- Utilização de JWT para proteger rotas privadas.
- CRUD completo de usuários administrativos (em desenvolvimento).

### 4. **📑 Regras de Negócio**
- Separação das regras de negócio em arquivos próprios.
- Validação de campos para evitar dados inconsistentes.
- Limitação de acompanhantes por paciente.

## 💻 Tecnologias Utilizadas

### **Backend**
- **⚡ Node.js**: Plataforma principal para execução do servidor.
- **🚀 Express.js**: Framework minimalista para rotas e middleware.
- **🐘 Sequelize**: ORM para integração com banco de dados SQL (PostgreSQL).
- **📡 Insomnia**: Realização das requisições HTTP
- **🛡 JWT**: Autenticação via tokens.
- **📅 date-fns**: Manipulação de datas.
- **🧪 Yup** *(em breve)*: Validação de dados.

### **Banco de Dados**
- **📊 PostgreSQL**: Banco relacional robusto e seguro.

### **Outras Ferramentas**
- **🛠 Git e GitHub**: Controle de versão e hospedagem do repositório.
- **💻 VS Code**: Ambiente de desenvolvimento.

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=express,js,nodejs,yarn,vscode,postgres,sequelize,git,md" />
  </a>
</div>