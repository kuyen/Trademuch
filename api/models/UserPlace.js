module.exports = {
  attributes: {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV2,
      primaryKey: true
    },

    createdAt: {
      type: Sequelize.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: Sequelize.DATE,
      field: 'updated_at'
    }
  },

  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {},
    tableName: 'user_place'
  }
};
