module.exports = {
  attributes: {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    startDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      field: 'start_date'
    },
    endDate: {
      type: Sequelize.DATEONLY,
      field: 'end_date'
    },

    image:{
      type:Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    },

    createdAt: {
      type: Sequelize.INTEGER,
      field: 'created_at'
    },
    updatedAt: {
      type: Sequelize.INTEGER,
      field: 'updated_at'
    },
    UserId: {
      type: Sequelize.INTEGER,
      field: 'user_id'
    }
  },
  associations: function() {
    Post.belongsTo(User, {through: 'user_id'});
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {},
    tableName: 'post'
  }
};
