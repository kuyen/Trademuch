module.exports = {
  attributes: {

    name: {
      type: Sequelize.STRING
    },
  },
  associations: function() {
    Category.belongsToMany(Post, {foreignKey: 'category_id', through: PostCategory});
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {},
    tableName: 'category',
    underscored: true,
  }
};
