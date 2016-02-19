module.exports = {
  attributes: {

    createdAt: {
      type: Sequelize.DATE,
      // name: 'createdAt',
      // field: 'created_at'
    },
    updatedAt: {
      type: Sequelize.DATE,
      // name: 'updatedAt',
      // field: 'updated_at'
    }
  },

  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {},
    tableName: 'user_place'
  }
};
