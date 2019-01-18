const BaseModel = require('./BaseModel')
const { HasManyRelation, ManyToManyRelation } = require('objection')

class User extends BaseModel {
  static get tableName() {
    return 'users'
  }

  static get relationMappings() {
    const Post = require('./Post')
    const Hobby = require('./Hobby')
    const Follows = require('./Follows')
    return {
      posts: {
        relation: HasManyRelation,
        modelClass: Post,
        join: {
          from: 'users.id',
          to: 'posts.userId',
        },
      },
      hobbies: {
        relation: HasManyRelation,
        modelClass: Hobby,
        join: {
          from: 'users.id',
          to: 'hobbies.userId',
        },
      },
      followers: {
        relation: ManyToManyRelation,
        modelClass: Follows,
        join: {
          from: 'follows.followingId',
          through: {
            // follows is the join table.
            from: 'follows.followingId',
            to: 'follows.followerId',
          },
          to: 'users.id',
        },
      },
    }
  }
}

module.exports = User
