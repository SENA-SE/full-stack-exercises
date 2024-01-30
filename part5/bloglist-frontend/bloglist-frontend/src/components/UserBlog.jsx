import Blog from './Blog'

const UserBlog = ({user, blogs, handleLogout, setBlogs}) => (
    <div>
      <h2>Blogs</h2>
      {user.username} logged in <button onClick={handleLogout}>Log out</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} />
      )}
    </div>
  )

  export default UserBlog