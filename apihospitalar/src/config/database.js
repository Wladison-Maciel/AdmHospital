require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

module.exports = {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,

    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};
