const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  next()
}

const userExtractor = async (request, response, next) => {
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  request.user = await User.findById(decodedToken.id)
  next()
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'JsonWebTokenError'){
    return response.status(401).json({
      error: 'invalid token'
    })
  } else if (error.name ==='TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }

  next(error)
}

module.exports = { errorHandler, tokenExtractor, userExtractor }