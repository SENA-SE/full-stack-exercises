import Togglable from './Togglable'
import blogService from '../services/blogs'
const Blog = ({ blog, setBlogs, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    try {
      const returnedBlog = await blogService.update(blog.id, updatedBlog)
      blogService.getAll().then(blogs =>
        setBlogs(blogs))
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author} `)) {
      try {
        await blogService.deleteBlog(blog.id)
        blogService.getAll().then(blogs =>
          setBlogs(blogs))
      } catch (error) {
        console.error(error)
      }
    }
  }
  return (
    <div style={blogStyle}  className='blog'>
      <div className='blogTitle'>Title: {blog.title}</div>
      <div className='blogAuthor'>Author: {blog.author}</div>
      <Togglable buttonLabel="View details">
        {
          <>
            <div className='blogUrl'>URL: {blog.url}</div>
            <div className='blogLikes'>Likes: {blog.likes} <button onClick={handleLike}>like it</button></div>
            <div className='username'>Posted by: {blog.user.username}</div>

            {            // eslint-disable-next-line eqeqeq
              blog.user.username == user.username && <button onClick={handleDelete}>remove blog</button>}
          </>
        }
      </Togglable>
    </div>
  )
}



export default Blog