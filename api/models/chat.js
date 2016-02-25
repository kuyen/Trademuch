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
    userId: {
      type: Sequelize.UUID,
      field: 'user_id',
      allowNull: false
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false
    },
    // store private-chat room-id or item uuId
    roomId: {
      type: Sequelize.UUID,
      field: 'room_id'
    },

    // to ordering
    createdAt: {
      type: Sequelize.DATE,
      field: 'created_at'
    },
    // to show last reply time
    updatedAt: {
      type: Sequelize.DATE,
      field: 'updated_at'
    }

  },
  associations: function() {
    Chat.belongsTo(ChatRoom, {
      through: 'room_id'
    });
    Chat.belongsTo(User, {
      through: 'user_id'
    });
  },
  options: {
    underscored: true
  }
};
