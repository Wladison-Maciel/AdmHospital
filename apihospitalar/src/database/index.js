import Sequelize from "sequelize";
import config from '../config/database'; // Importa as configurações do banco de dados
import Patient from '../app/models/Patient'
import Companion from "../app/models/Companion";
import User from "../app/models/User"
// Lista de modelos a serem inicializados no banco de dados
const models = [Patient, Companion, User];

class Database {
    constructor() {
        // Cria a conexão com o banco de dados usando as configurações importadas
        this.connection = new Sequelize(config);

        // Inicializa os modelos
        this.init();

        // Configura os relacionamentos entre os modelos, se existirem
        this.associate();
    }

    init() {
        // Percorre todos os modelos e inicializa a conexão com o banco de dados
        models.forEach(model => model.init(this.connection));
    }

    associate() {
        // Verifica se o modelo possui associações (foreign keys, relacionamentos)
        // Se sim, chama o método associate passando os modelos já inicializados
        models.forEach(model => {
            if (model.associate) {
                model.associate(this.connection.models);
            }
        });
    }
}

// Exporta uma instância única da classe Database para ser utilizada no projeto
export default new Database();
