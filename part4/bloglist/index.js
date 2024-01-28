const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
const Blog = require("./models/blog")
const { favoriteBlog } = require("./utils/list_helper")
app.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.find({})

  response.json(blogs).end()

})

app.post('/api/blogs', async (request, response) => {
  if (!request.body.title || !request.body.url) {
    return response.status(400).json({ error: 'title or url missing' })
  }

  const blog = new Blog(request.body)
  const result = await blog.save()
  response.status(201).json(result).end()

})

app.delete('/api/blogs/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end();

})

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