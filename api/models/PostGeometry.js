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
    PostId: {
      type: Sequelize.INTEGER,
      field: 'post_id'
    }
  },
  associations: function() {
    PostGeometry.belongsTo(Post, {through: 'post_id'});
    // PostPosition.hasMany(Position, {through: 'post_position_id'});
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {},
    tableName: 'post_geometry'
  }
};
