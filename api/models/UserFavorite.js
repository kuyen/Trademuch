module.exports = {
  attributes: {

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
    tableName: 'user_favorite'
  }
};
