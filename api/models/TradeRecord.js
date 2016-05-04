module.exports = {
  attributes: {

    status: {
      type: Sequelize.ENUM('pedding', 'accepted', 'refused'),
      defaultValue: 'pedding'
    },
    isConfirmed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }

  },

  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {},
    underscored: true,
    tableName: 'post_traderecord',
    paranoid: true,
  },
  associations: function() {
    TradeRecord.belongsTo(Post, {through: 'post_id'});
    TradeRecord.belongsTo(User, {through: 'user_id'});
  }
};
