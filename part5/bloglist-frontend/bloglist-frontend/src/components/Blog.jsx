import Togglable from "./Togglable"
import blogService from "../services/blogs"
const Blog = ({ blog, setBlogs }) => {
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
    <div style={blogStyle}>
      <div>Title: {blog.title}</div>

      <Togglable buttonLabel="View details">
        {
          <>
            <div>URL: {blog.url}</div>
            <div>Likes: {blog.likes} <button onClick={handleLike}>like it</button></div>
            <div>Author: {blog.author}</div>
            <div>Posted by: {blog.user.username}</div>
            <button onClick={handleDelete}>remove blog</button>
          </>
        }
      </Togglable>
    </div>
  )
}



export default Blog