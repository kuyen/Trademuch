module.exports = {
  attributes: {

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
    UserGeometry.belongsTo(User, {through: 'user_id'});
    // UserPosition.hasMany(Position, {through: 'user_position_id'});
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {},
    tableName: 'user_geometry'
  }
};
