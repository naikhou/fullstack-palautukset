
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
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

module.exports = { errorHandler, tokenExtractor }