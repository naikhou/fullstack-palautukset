import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const mockHandler = jest.fn()

  const user = {
    username: 'Katti',
    name: 'Keijo'
  }
  const blog = {
    title: 'Oujees!',
    author: 'Matti Meikäläinen',
    url: 'wikipedia.org',
    likes: 7,
    user: user
  }

  let container

  beforeEach(() => {
    container = render(
      <Blog blog={blog} removeBlog={mockHandler} updateBlog={mockHandler} user={user} />
    ).container
  })

  test('by default, renders title and author but not url or likes', () => {

    const titleAndAuthor = screen.getByTestId('title-and-author')
    expect(titleAndAuthor).toHaveTextContent('Oujees! Matti Meikäläinen')

    const url = screen.queryByTestId('url')
    expect(url).toBeNull()

    const likes = container.querySelector('.likes')
    expect(likes).toBeNull()
  })

  test('renders url and likes after view-button is clicked', () => {
    const button = screen.getByText('view')
    userEvent.click(button)

    const url = screen.queryByTestId('url')
    expect(url).toHaveTextContent('wikipedia.org')

    const likes = container.querySelector('.likes')
    expect(likes).toHaveTextContent('likes')
  })

  test('pressing like button twice event handler is called twice', () => {
    const viewButton = screen.getByText('view')
    userEvent.click(viewButton)

    const likeButton = screen.getByText('like')
    userEvent.click(likeButton)
    userEvent.click(likeButton)

    expect(mockHandler).toBeCalledTimes(2)
  })

})