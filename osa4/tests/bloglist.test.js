const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const blogsOne = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]
  const blogsMultiple = [
    {
      _id: '1',
      title: 'asd',
      author: 'asd',
      url: 'asd',
      likes: 5,
      __v: 0
    },
    {
      _id: '2',
      title: 'asd',
      author: 'asd',
      url: 'asd',
      likes: 0,
      __v: 0
    },
    {
      _id: '3',
      title: 'asd',
      author: 'asd',
      url: 'asd',
      likes: 5,
      __v: 0
    },
    {
      _id: '4',
      title: 'asd',
      author: 'asd',
      url: 'asd',
      likes: 3,
      __v: 0
    }
  ]

  test('of empty list is 0', () => {
    const blogs = []
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(blogsOne)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogsMultiple)
    expect(result).toBe(13)
  })
})

describe('favorite blog', () => {
  const blogsOne = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]
  const blogsMultiple = [
    {
      _id: '1',
      title: 'asd',
      author: 'asd',
      url: 'asd',
      likes: 5,
      __v: 0
    },
    {
      _id: '2',
      title: 'asd',
      author: 'asd',
      url: 'asd',
      likes: 0,
      __v: 0
    },
    {
      _id: '3',
      title: 'asd',
      author: 'asd',
      url: 'asd',
      likes: 5,
      __v: 0
    },
    {
      _id: '4',
      title: 'asd',
      author: 'asd',
      url: 'asd',
      likes: 3,
      __v: 0
    }
  ]
  const anotherBlogsMultiple = [
    {
      _id: '5',
      title: 'asd',
      author: 'asd',
      url: 'asd',
      likes: 2,
      __v: 0
    },
    {
      _id: '6',
      title: 'asd',
      author: 'asd',
      url: 'asd',
      likes: 0,
      __v: 0
    },
    {
      _id: '7',
      title: 'asd',
      author: 'asd',
      url: 'asd',
      likes: 5,
      __v: 0
    },
    {
      _id: '8',
      title: 'asd',
      author: 'asd',
      url: 'asd',
      likes: 3,
      __v: 0
    }
  ]

  test('of empty list is 0', () => {
    const blogs = []
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(0)
  })

  test('when list has only one blog, returns that blog', () => {
    const result = listHelper.favoriteBlog(blogsOne)
    expect(result).toEqual(blogsOne[0])
  })

  test('when multiple, returns the first occurrence of blogs with the same highest like amount ', () => {
    const result = listHelper.favoriteBlog(blogsMultiple)
    expect(result).toEqual(blogsMultiple[0])
  })

  test('when multiple, returns the one with the most likes', () => {
    const result = listHelper.favoriteBlog(anotherBlogsMultiple)
    console.log(result)
    expect(result).toEqual(anotherBlogsMultiple[2])
  })
})

describe('author with most blogs', () => {
  test('returns correct author and blog count', () => {
    console.log('')
  })
})