module.exports = {
  attributes: {

    state: {
      type: Sequelize.ENUM('pedding', 'accepted', 'refused'),
      defaultValue: 'pedding'
    },

  },

  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {},
    underscored: true,
    tableName: 'trade_record',
    paranoid: true,
  },
  associations: function() {
    TradeRecord.belongsTo(Post, {through: 'post_id'});
    TradeRecord.belongsTo(User, {through: 'user_id'});
  }
};
