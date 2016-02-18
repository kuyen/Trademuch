module.exports = {
  attributes: {
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    telephone: {
      type: Sequelize.STRING
    },

    age: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    gender:{
      type: Sequelize.ENUM('none', 'male', 'female'),
      defaultValue: 'none'
    },
    isFirstLogin:{
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      field: 'is_first_login'
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
    User.hasMany(Post, {foreignKey: 'user_id'});
    User.hasMany(Passport, {foreignKey: 'user_id'});
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {},
    tableName: 'user'
  }
};
