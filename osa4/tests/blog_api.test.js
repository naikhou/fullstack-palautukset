const mongoose = require('mongoose')
const supertest = require('supertest')
const testHelper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(testHelper.startBlogs)
})

test('blogs are of type JSON', async () => {
  await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(testHelper.startBlogs.length)
})

test('blogs have id-field "id"', async () => {
  const response = await api.get('/api/blogs')

  for (const blog of response.body) {
    expect(blog.id).toBeDefined()
  }
})

test('a valid blog can be added ', async () => {
  const blogToAdd = {
    title: 'testblog',
    author: 'Niko',
    url: 'random.com',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(blogToAdd)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await testHelper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(testHelper.startBlogs.length + 1)

  const contents = blogsAtEnd.map(blog => blog.title)
  expect(contents).toContain(
    'testblog'
  )
})

test('likes has value 0 if likes are not given', async () => {
  const blogToAdd = {
    title: 'testblog',
    author: 'Niko',
    url: 'random.com'
  }

  await api
    .post('/api/blogs')
    .send(blogToAdd)
    .expect(200)

  const blogsInDb = await testHelper.blogsInDb()
  const blog = blogsInDb.find((blog) => blog.title === 'testblog')

  expect(blog.likes).toBe(0)
})

test('bad request if title is missing', async () => {
  const blogToAdd = {
    author: 'Niko',
    url: 'random.com',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(blogToAdd)
    .expect(400)
})

test('bad request if url is missing', async () => {
  const blogToAdd = {
    title: 'testblog',
    author: 'Niko',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(blogToAdd)
    .expect(400)
})

test('bad request if url and title are missing', async () => {
  const blogToAdd = {
    author: 'Niko',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(blogToAdd)
    .expect(400)
})

describe('user related tests', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('salkku', 10)
    const initialUser = new User({
      username: 'first',
      passwordHash: passwordHash
    })

    await initialUser.save()
  })

  test('bad request if username or password length is less than 3', async () => {
    const userToAdd = {
      username: 'test',
      name: '',
      password: 'aa'
    }
    const userToAdd2 = {
      username: 'aa',
      name: '',
      password: 'aaaa'
    }
    const userToAdd3 = {
      username: 'aa',
      name: '',
      password: 'aa'
    }

    await api
      .post('/api/users')
      .send(userToAdd)
      .expect(400)

    await api
      .post('/api/users')
      .send(userToAdd2)
      .expect(400)

    await api
      .post('/api/users')
      .send(userToAdd3)
      .expect(400)
  })

  test('user is not created if invalid username or password and proper message is shown', async () => {
    const userToAdd = {
      username: 'aa',
      name: '',
      password: 'aaaaa'
    }

    const dbUsersBefore = await testHelper.usersInDb()

    const result = await api
      .post('/api/users')
      .send(userToAdd)
      .expect(400)

    expect(result.body.error).toContain('invalid username or password')

    const dbUsersAfter = await testHelper.usersInDb()
    expect(dbUsersAfter).toHaveLength(dbUsersBefore.length)
  })

  test('user will not be added and proper response is received if username is already taken', async () => {
    const userToAdd = {
      username: 'first',
      name: '',
      password: 'random'
    }

    const dbUsersBefore = await testHelper.usersInDb()

    const result = await api
      .post('/api/users')
      .send(userToAdd)
      .expect(400)

    expect(result.body.error).toContain('username has already been taken')

    const dbUsersAfter = await testHelper.usersInDb()
    expect(dbUsersAfter).toHaveLength(dbUsersBefore.length)
  })
})



afterAll(() => {
  mongoose.connection.close()
})