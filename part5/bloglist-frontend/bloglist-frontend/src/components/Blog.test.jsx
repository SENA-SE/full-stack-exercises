
import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen, fireEvent } from '@testing-library/react'
import CreateForm from './CreateForm'
import Blog from './Blog'
import blogService from '../services/blogs'
import { expect } from 'vitest'


// jest.mock('../services/blogs')

test('renders content', () => {
  const blog = {
    title: 'blog-test',
    author: 'sample-author',
    url: 'sample-url',
    likes: 0,
    user: { username: 'testuser', id: 'testid' } // Mocked user object
  }

  // Mock setBlogs function
  // const setBlogs = jest.fn()

  render(<Blog blog={blog} user={blog.user} />)

  const element = screen.getByText('blog-test', { exact: false })
  expect(element).toBeDefined()
})

test('renders title and author without URL or likes by default', () => {
  const blog = {
    title: 'Test blog title',
    author: 'Test Author',
    url: 'http://testblog.com',
    likes: 5,
    user: { username: 'testuser', id: 'testid' }
  }

  const { container } = render(<Blog blog={blog} user={blog.user}/>)

  const titleDiv = container.querySelector('.blogTitle')
  const authorDiv = container.querySelector('.blogAuthor')
  const detailsDiv = container.querySelector('.togglableContent')

  expect(titleDiv).toHaveTextContent('Test blog title')
  expect(authorDiv).toHaveTextContent('Test Author')
  expect(detailsDiv).toHaveStyle('display: none')
})



test('shows URL and likes when the view details button is clicked', async () => {
  const blog = {
    title: 'Test blog title',
    author: 'Test Author',
    url: 'http://testblog.com',
    likes: 5,
    user: { username: 'testuser', id: 'testid' }
  }

  render(<Blog blog={blog} user={blog.user} />)

  const user = userEvent.setup()
  const viewDetailsButton = screen.getByText('View details')
  await user.click(viewDetailsButton)

  const url = screen.getByText(/http:\/\/testblog\.com/i)
  const likes = screen.getByText(/Likes: 5/i)

  expect(url).toBeInTheDocument()
  expect(likes).toBeInTheDocument()
})

test('like button is clicked twice', async () => {
  const blog = {
    id: 'blog1',
    title: 'Test blog title',
    author: 'Test Author',
    url: 'http://testblog.com',
    likes: 5,
    user: { username: 'testuser', id: 'testid' }
  }


  render(<Blog blog={blog} setBlogs={() => {}} user={blog.user} />)

  const viewButton = screen.getByText('View details')

  await userEvent.click(viewButton)

  const updateMock = jest.spyOn(blogService, 'update').mockResolvedValueOnce()

  const likeButton = screen.getByText('like it')
  await userEvent.click(likeButton)
  await userEvent.click(likeButton)

  expect(updateMock).toHaveBeenCalledTimes(2)
})

test('event handler with right details is called when a new blog is created', async () => {
  const handleSubmitBlog = jest.fn()
  const handleTitleChange = jest.fn()
  const handleAuthorChange = jest.fn()
  const handleUrlChange = jest.fn()
  const user = userEvent.setup()

  render(
    <CreateForm
      handleSubmitBlog={handleSubmitBlog}
      handleTitleChange={handleTitleChange}
      handleAuthorChange={handleAuthorChange}
      handleUrlChange={handleUrlChange}
      errorMessage=""
      title=""
      author=""
      url=""
    />
  )

  const submitMock = jest.spyOn(blogService,'create').mockResolvedValueOnce()

  const title = screen.getByPlaceholderText('please write your title here')
  const author = screen.getByPlaceholderText('please write the author here')

  const url = screen.getByPlaceholderText('please write url here')
  const submit = screen.getByText('Submit')

  await user.type(title, 'test title')
  await user.type(author, 'test author')
  await user.type(url, 'test url')
  await user.click(submit)


  expect(submitMock).toHaveBeenCalledTimes(1)
  expect(handleSubmitBlog.mock.calls).toHaveLength(1)
  expect(blogService.create).toHaveBeenCalledTimes(1)
  expect(blogService.create).toHaveBeenCalledWith({
    title:'test',
    author:'test title',
    url:'url'
  })
})