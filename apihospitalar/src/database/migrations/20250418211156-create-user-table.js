module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey:true,
        },
        name: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING(100),
            allowNull: true,
            unique: true,
        },
        provider: {
            type: Sequelize.BOOLEAN,
            default: false,
            allowNull: true,
        },
        password_hash: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        created_at: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        updated_at: {
            type: Sequelize.DATE,
            allowNull:false
        },
     });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('users');
  }
};
