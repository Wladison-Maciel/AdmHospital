import Sequelize, { Model } from "sequelize";

class Companion extends Model{
    static init(sequelize){
        super.init({

        })
    }
}

Companion.belongsTo(Patient, { foreignKey: 'patient_id', as: 'patient',});
  

export default Companion;