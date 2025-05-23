import Sequelize, { Model } from "sequelize"

class Patient extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            cpf: Sequelize.STRING,
            birth_date: Sequelize.DATEONLY,
            adress: Sequelize.STRING,
            phone: Sequelize.STRING,
            diagnosis: Sequelize.STRING,
            status: Sequelize.ENUM("LEVE", "ALERTA", "GRAVE"),
            has_companion: Sequelize.BOOLEAN,
        }, 
        {
            sequelize,
            name:{
                singular: "patient",
                plural:"patients",
            }
        })
    }

    static associate(models){
        this.hasOne(models.Companion)
    }
}

export default Patient;