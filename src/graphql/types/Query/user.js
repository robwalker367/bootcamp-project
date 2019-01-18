const User = require('../../../models/User')
const Follows = require('../../../models/Follows')
const { raw } = require('objection')

const userResolver = async (obj, args, context) => {
  const user = await User.query().where('id', args.id)
  return user[0]
}

const usersResolver = async (obj, args, context) => {
  const { substr, hometown, house, concentration, hobbies } = args
  const users = await User.query()
  .modify(function(queryBuilder) {
    if (substr) {
      queryBuilder.where(raw('lower("name")'), 'like', '%' + substr.toLowerCase() + '%') 
    }
    if (hometown) {
      queryBuilder.andwhere('hometown', hometown)
    }
    if (house) {
      queryBuilder.andwhere('house', house)
    }
    if (concentration) {
      queryBuilder.andwhere('concentration', concentration)
    }
    if (hobbies.length) {
      queryBuilder.whereExists(User.relatedQuery('hobbies').where('hobby', hobbies))
    }
  }) 
  return users
}

const followsResolver = async (obj, args, context) => {
  const follows = await Follows.query()
  .where('status', args.status)
  .andWhere(subfollows => {
    subfollows.where('followingId',args.id).orWhere('followerId',args.id)
  })
  return follows
}

const resolver = {
  Query: {
    user: userResolver,
    users: usersResolver,
    follows: followsResolver,
  },
}

module.exports = resolver
