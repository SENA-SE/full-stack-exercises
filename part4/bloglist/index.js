const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
const Blog = require("./models/blog")
const {favoriteBlog} = requrie("./utils/list_helper")
app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

app.get('/api/favoriteBlog', (request, response) => {
  Blog.find({}).then(blogs => {
    const favorite = favoriteBlog(blogs)
    response.json(favorite)
  })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})