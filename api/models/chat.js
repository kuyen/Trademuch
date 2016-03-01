/**
 * Chat.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

    uuid: {
      type: Sequelize.UUID
    },
    // userId: {
    //   type: Sequelize.UUID,
    //   field: 'user_id',
    //   allowNull: false
    // },
    // roomId: {
    //   type: Sequelize.UUID,
    //   field: 'room_id',
    //   allowNull: false
    // },
    content: {
      type: Sequelize.STRING,
      allowNull: false
    }

  },
  options: {
    underscored: true,
    tableName: 'chat'
  },
  associations: function() {
    Chat.belongsTo(Room, {
      through: 'room_id'
    });
    Chat.belongsTo(User, {
      through: 'user_id'
    });
  }
};