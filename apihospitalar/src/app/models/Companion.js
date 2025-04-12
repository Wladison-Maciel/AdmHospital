import Sequelize, { Model } from "sequelize";

class Companion extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            cpf: Sequelize.STRING,
            phone: Sequelize.STRING,
            kinship: Sequelize.ENUM("PAI", "MÃE", "FILHO(A)", "IRMÃ(O)", "TIA(O)", "PRIMO(A)", "SOBRINHO(A)", "OUTRO"),
        },
            {
                sequelize,
                name: {
                    singular: "companion",
                }
            }
        );
    }
        // Método para definir os relacionamentos do modelo
        static associate(models) {
            this.belongsTo(models.Patient, { foreignKey: "patient_id" });
            // Define um relacionamento onde cada "Contact" pertence a um "Customer"
            // A foreign key "customer_id" referencia o id do cliente
        }
}


export default Companion;