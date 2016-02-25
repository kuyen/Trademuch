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
    type:{
      type: Sequelize.ENUM('private', 'public'),
      defaultValue: 'public'
    },
    // store private-chat room-id or item uuId
    limit:{
      type: Sequelize.INTEGER
    },

    // ====== timestamp =====

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

  }
};
