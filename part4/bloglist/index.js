const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const blogsRouter = require('./controllers/blogs'); // Import the blogsRouter
const tokenExtractor = require('./middleware/tokenExtractor');
const userExtractor = require('./middleware/userExtractor');
// const middleware = require('../utils/middleware');

app.use(cors());
app.use(express.json());

// Middlewares
app.use(tokenExtractor);
// app.use(userExtractor);

// Route handlers
// app.use('/api/blogs', userExtractor, blogsRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
