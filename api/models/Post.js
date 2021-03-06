module.exports = {
  attributes: {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    startDate: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    endDate: {
      type: Sequelize.DATEONLY
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    content: {
      type: Sequelize.STRING
    },
    mode: {
      type: Sequelize.ENUM('get', 'give'),
      allowNull: false
    },
    // geometry: {
    //   type: Sequelize.GEOMETRY
    // },
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
    images:{
      type:Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    }
  },
  associations: function() {
    Post.belongsTo(Item);
    Post.belongsTo(User);
    Post.belongsToMany(User, {through: 'UserFavorite'});
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
