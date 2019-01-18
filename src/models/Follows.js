const BaseModel = require('./BaseModel')
const { ManyToManyRelation } = require('objection')

class Follows extends BaseModel {
  static get tableName() {
    return 'follows'
  }

  static get relationMappings() {
    const User = require('./User')

    return {
      followers: {
        relation: ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'follows.followingId',
          through: {
            from: 'follows.followerId',
            to: 'follows.followingId',
          },
          to: 'users.id',
        },
      },
    }
  }
}

module.exports = Follows