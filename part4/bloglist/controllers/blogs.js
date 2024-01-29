const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const userExtractor = require('../middleware/userExtractor')
// GET blogs
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    response.json(blogs);
});

// POST a new blog
blogsRouter.post('/', userExtractor, async (request, response) => {
    try {
        const body = request.body;
        if (!body.title || !body.url) {
            return response.status(400).json({ error: 'title or url missing' });
        }

        const user = request.user;
        const blog = new Blog({ ...body, user: user.id });
        const savedBlog = await blog.save();
        user.blogs = user.blogs.concat(savedBlog._id);
        await user.save();
        response.status(201).json(savedBlog);
    } catch {
        response.status(400)
    }
});

// DELETE a blog
blogsRouter.delete('/:id', userExtractor, async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    if (!blog) {
        return response.status(404).json({ error: 'blog not found' });
    }

    if (blog.user.toString() !== request.user.id.toString()) {
        return response.status(401).json({ error: 'only the creator can delete a blog' });
    }

    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
});

// PUT - Update a blog
blogsRouter.put('/:id', userExtractor, async (request, response) => {
    const body = request.body;
    const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        { likes: body.likes },
        { new: true, runValidators: true, context: 'query' }
    );

    if (!updatedBlog) {
        return response.status(404).json({ error: 'blog not found' });
    }

    response.json(updatedBlog);
});

module.exports = blogsRouter;
