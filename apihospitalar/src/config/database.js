module.exports = {
    dialect: "postgres", // Define o banco de dados como PostgreSQL
    host: "localhost", // Define o servidor do banco de dados (neste caso, local)
    username: "postgres", // Usuário do banco de dados
    password: "3769", // Senha do banco de dados
    database: "AdmHospital", // Nome do banco de dados

    define: {
        timestamps: true, // Habilita a criação automática das colunas "createdAt" e "updatedAt"
        underscored: true, // Define que os nomes das tabelas e colunas usarão snake_case
        underscoredAll: true, // Aplica o padrão snake_case para nomes de tabelas e colunas automaticamente
    },
};
