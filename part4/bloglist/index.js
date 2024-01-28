const express = require('express')
require('express-async-errors')
const jwt = require('jsonwebtoken')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
const Blog = require("./models/blog")
const { favoriteBlog } = require("./utils/list_helper")
const usersRouter = require('./controllers/users')
const User = require('./models/user')
const loginRouter = require('./controllers/login')
const tokenExtractor = require('./middleware/tokenExtractor')

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(tokenExtractor)

app.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs).end()

})
// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   console.log(authorization)
//   if (authorization && authorization.startsWith('Bearer ')) {
//     return authorization.replace('Bearer ', '')
//   }
//   return null
// }

app.post('/api/blogs', async (request, response) => {
  if (!request.body.title || !request.body.url) {
    return response.status(400).json({ error: 'title or url missing' })
  }
  // const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  // if (!decodedToken.id) {
  //   return response.status(401).json({ error: 'token invalid' })
  // }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)
  // const user = await User.findById(request.body.userId)
  // console.log({...request.body, user: user.id})
  const blog = new Blog({...request.body, user: user.id})
  const result = await blog.save()
  user.blogs = user.blogs.concat(result.id)
  await user.save()
  response.status(201).json(result).end()

})

app.delete('/api/blogs/:id', async (request, response) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
  } catch {
    response.status(401).json({ error: 'token missing or invalid' })
  }


  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(404).json({ error: 'blog not found' });
  }

  if (blog.user.toString() !== decodedToken.id.toString()) {
    return response.status(401).json({ error: 'only the creator can delete a blog' });
  }

  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});


app.get('/api/favoriteBlog', async (request, response) => {
  Blog.find({}).then(blogs => {
    const favorite = favoriteBlog(blogs)
    response.json(favorite).end()
  })
})

app.put('/api/blogs/:id', async (request, response) => {
  const { likes } = request.body;
  
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id, 
      { likes },
      { new: true, runValidators: true, context: 'query' }
    )
    if (updatedBlog) {
      response.json(updatedBlog);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// request(app).get('/api/blogs')
// .expect(200)
// .expect('Content-Type', /application\/json/)
// .end(function(err, res) {
//   if (err) throw err;
// })

module.exports = app