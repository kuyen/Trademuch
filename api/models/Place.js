module.exports = {
  attributes: {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV2,
      primaryKey: true
    },

    name: {
      type: Sequelize.STRING
    },

    address: {
      type: Sequelize.STRING
    },

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

    createdAt: {
      type: Sequelize.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: Sequelize.DATE,
      field: 'updated_at'
    }
  },
  associations: function() {
    Place.belongsToMany(User, {foreignKey: 'place_id', through: UserPlace});
    Place.belongsToMany(Post, {foreignKey: 'place_id', through: PostPlace});

  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {},
    tableName: 'place'
  }
};
