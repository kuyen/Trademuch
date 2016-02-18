module.exports = {
  attributes: {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV2,
      primaryKey: true
    },

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

    coverImage:{
      type:Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      field: 'cover_image'
    },

    createdAt: {
      type: Sequelize.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: Sequelize.DATE,
      field: 'updated_at'
    },
    UserId: {
      type: Sequelize.INTEGER,
      field: 'user_id'
    }
  },
  associations: function() {
    Post.belongsTo(User, {through: 'user_id'});
    Post.belongsToMany(Place, {foreignKey: 'post_id', through: PostPlace});
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {},
    tableName: 'post'
  }
};
