const listHelper = require('../utils/list_helper')
const testHelper = require('./test_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('of empty list is 0', () => {
    const blogs = []
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(testHelper.blogsOne)
    expect(result).toBe(testHelper.blogsOne[0].likes)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(testHelper.blogsMultiple)
    expect(result).toBe(13)
  })
})

describe('favorite blog', () => {

  test('of empty list is 0', () => {
    const blogs = []
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(0)
  })

  test('when list has only one blog, returns that blog', () => {
    const result = listHelper.favoriteBlog(testHelper.blogsOne)
    expect(result).toEqual(testHelper.blogsOne[0])
  })

  test('when multiple, returns the first occurrence of blogs with the same highest like amount ', () => {
    const result = listHelper.favoriteBlog(testHelper.blogsMultiple)
    expect(result).toEqual(testHelper.blogsMultiple[0])
  })

  test('when multiple, returns the one with the most likes', () => {
    const result = listHelper.favoriteBlog(testHelper.anotherBlogsMultiple)
    expect(result).toEqual(testHelper.anotherBlogsMultiple[2])
  })
})