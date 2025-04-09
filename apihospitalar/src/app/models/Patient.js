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
        }, 
        {
            sequelize,
            name:{
                singular: "patient",
                plural:"patients",
            }
        })
    }
    //TODO
    // static associate(models){
    //     this.hasMany(models.Escort)
    // }
}

export default Patient;