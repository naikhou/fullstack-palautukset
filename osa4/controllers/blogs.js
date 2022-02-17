const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body

  if(!body.title || !body.url){
    return response.status(400).end()
  }

  const validUser = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: validUser.id
  })

  const savedBlog = await blog.save()
  validUser.blogs = validUser.blogs.concat(savedBlog._id)
  validUser.save()
  response.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const blogToRemove = await Blog.findById(request.params.id)
  if(blogToRemove.user.toString() === request.user.id.toString()){
    await Blog.findByIdAndRemove(request.params.id)
    return response.status(204).end()
  }
  response.status(401).json({ error: 'ei oikeutta poistaa' })
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  if(!body.title || !body.url){
    return response.status(400).end()
  }

  const blog = {
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes || 0
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter