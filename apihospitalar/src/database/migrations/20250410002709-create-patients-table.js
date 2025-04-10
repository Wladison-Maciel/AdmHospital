// Exporta um módulo que contém duas funções: up e down
module.exports = {
  // Função executada ao aplicar a migration (criação da tabela)
  async up(queryInterface, Sequelize) {
    // Cria a tabela "patients" no banco de dados
    await queryInterface.createTable("patients", {
      // Campo "id" - chave primária, autoincrementável e não pode ser nulo
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      // Campo "name" - nome do paciente, string com no máximo 100 caracteres, obrigatório
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },

      // Campo "cpf" - deve ser único, obrigatório e conter até 11 caracteres
      cpf: {
        type: Sequelize.STRING(11),
        unique: true,
        allowNull: false,
      },

      // Campo "adress" - endereço do paciente, até 150 caracteres, obrigatório
      adress: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },

      // Campo "phone" - telefone do paciente, até 11 caracteres (sem formatação), obrigatório
      phone: {
        type: Sequelize.STRING(11),
        allowNull: false,
      },

      // Campo "diagnosis" - diagnóstico clínico, até 255 caracteres, obrigatório
      diagnosis: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      // Campo "status" - enum que define o estado do paciente
      // Deve ser um dos três valores: "LEVE", "ALERTA" ou "GRAVE"
      status: {
        type: Sequelize.ENUM("LEVE", "ALERTA", "GRAVE"),
        allowNull: false,
      },
      // Campo "has_companion" - Define se o paciente tem um acompanhante
      has_companion: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      // Campo "created_at" - armazena a data/hora da criação do registro
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"), // Valor padrão: agora
      },

      // Campo "updated_at" - armazena a data/hora da última atualização do registro
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"), // Valor padrão: agora
      },
    });
  },

  // Função executada ao desfazer a migration (excluir a tabela)
  async down(queryInterface) {
    // Remove a tabela "patients" do banco de dados
    await queryInterface.dropTable("patients");
  },
};
