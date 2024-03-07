import Blog from './Blog'

const UserBlog = ({ user, blogs, handleLogout, setBlogs }) => {
  const blog = {
    title: 'blog-test',
    author: 'sample-author',
    url: 'sample-url',
    likes: 0,
    user: { username: 'testuser', id: 'testid' } // Mocked user object
  }
  return (
    <div>
      {/* <Blog blog={blog} user={blog.user}/> */}
      <h2>Blogs</h2>
      {user.username} logged in <button onClick={handleLogout}>Log out</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} user={user}/>
      )}
    </div>
  )}

export default UserBlog