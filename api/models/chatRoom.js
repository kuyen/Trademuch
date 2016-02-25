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
    type: {
      type: Sequelize.ENUM('private', 'public'),
      defaultValue: 'public'
    },
    limit: {
      type: Sequelize.INTEGER
    },

    // to ordering
    createdAt: {
      type: Sequelize.DATE
    },
    // to show last reply time
    updatedAt: {
      type: Sequelize.DATE
    }

  },
  options: {
    underscored: true
  }
};
