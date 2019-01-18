const User = require('../../models/User')

const createFollow = async (obj, { request }, context) => {
  if (!context.user) {
    return {
      error: {
        message: 'User not logged in',
      },
    }
  }
  const user = await User.query()
    .where('id', context.user.id)
    .then(res => res[0])

  if (!user) {
    return {
      error: {
        message: 'Logged in user does not exist',
      },
    }
  }

  const follow = await user.$relatedQuery('follows').insert({ request })
  if (!follow) {
    throw new Error('Could not add request')
  }
  return {
    follow,
  }
}

const resolver = { Mutation: { createFollow } }

module.exports = resolver
