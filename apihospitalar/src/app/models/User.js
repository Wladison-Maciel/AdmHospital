import Sequelize, { Model } from "sequelize"; // Importa o Sequelize e a classe Model
import bcrypit from "bcryptjs"

class User extends Model {
    // Método para inicializar o modelo e definir os campos da tabela
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING, // Define o campo "name" como string
                email: Sequelize.STRING, // Define o campo "email" como string
                provider: Sequelize.BOOLEAN, // Define se o usuário é um prestador de serviço (true/false)
                password: Sequelize.VIRTUAL,
                password_hash: Sequelize.STRING, // Armazena o hash da senha do usuário
            },
            {
                sequelize, // Passa a conexão com o banco de dados
                name: {
                    singular: "user",
                    plural: "users",
                },
            }
        );
        this.addHook("beforeSave", async user => {

            if (user.password) {
                user.password_hash = await bcrypit.hash(user.password, 8)
            }
        });
    }
    checkPassword(password) {
        return bcrypit.compare(password, this.password_hash);
    }
}

export default User; // Exporta o modelo para ser usado em outras partes do sistema
