module.exports = {
  attributes: {

    latitude: {
      type: Sequelize.DOUBLE,
      allowNull: true,
      defaultValue: null,
      validate: { min: -90, max: 90 }
    },
    longitude: {
      type: Sequelize.DOUBLE,
      allowNull: true,
      defaultValue: null,
      validate: { min: -180, max: 180 }
    },
    PostGeometryId: {
      type: Sequelize.INTEGER,
      field: 'post_geometry_id'
    },
    UserGeometryId: {
      type: Sequelize.INTEGER,
      field: 'user_geometry_id'
    },
    createdAt: {
      type: Sequelize.INTEGER,
      field: 'created_at'
    },
    updatedAt: {
      type: Sequelize.INTEGER,
      field: 'updated_at'
    }
  },
  associations: function() {
    Geometry.belongsTo(PostGeometry, {through: 'post_geometry_id'});
    Geometry.belongsTo(UserGeometry, {through: 'user_geometry_id'});

  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {},
    tableName: 'geometry'
  }
};
