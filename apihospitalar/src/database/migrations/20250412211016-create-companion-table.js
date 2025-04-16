const { DataTypes } = require("sequelize");

// Exporta um módulo que contém duas funções: up e down
module.exports = {
  // Função executada ao aplicar a migration (criação da tabela)
  async up(queryInterface, Sequelize) {
    // Cria a tabela "companions" no banco de dados
    await queryInterface.createTable("companions", {
      // Campo "id" - chave primária, autoincrementável e não pode ser nulo
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      // Campo "name" - nome do acompanhante, string com no máximo 100 caracteres, obrigatório
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
      // Campo "kinship" - Qual membro familiar o Companion está associado ao Patient, Obrigatório
      kinship: {
        type: Sequelize.ENUM("PAI", "MÃE", "FILHO(A)", "IRMÃ(O)", "TIA(O)", "PRIMO(A)", "SOBRINHO(A)", "OUTRO"),
        allowNull: false,
      },
      // Campo "phone" - telefone do acompanhante, até 11 caracteres (sem formatação), obrigatório
      phone: {
        type: Sequelize.STRING(11),
        allowNull: false,
      },
      patient_id:{
        type: Sequelize.INTEGER,
        references: { model: 'patients', key: "id"},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
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
    // Remove a tabela "companion" do banco de dados
    await queryInterface.dropTable("companion");
  },
};
