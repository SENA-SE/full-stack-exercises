const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../index');
const Blog = require('../models/blog')

const initialBlogs = [

    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

// PROBLEM: When using forEach to run asynchronous operations, it doesn't await for all operations to finish before moving to the next test. 
// beforeEach(async() => {
//     await Blog.deleteMany({})
//     initialBlogs.forEach(async (blog)=> {
//         await blog.save() 
//     })
// })

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjs = initialBlogs.map(blog => new Blog(blog))
    const promiseArr = blogObjs.map(blog => blog.save())
    await Promise.all(promiseArr)
})

test('blogs are returned as correct number of json', async () => {
    const response = await supertest(app).get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(initialBlogs.length)
});

test('unique identifier property of blog post is named id', async () => {
    const response = await supertest(app).get('/api/blogs');

    expect(response.body[0].id).toBeDefined();
});

test('add a valid blog', async () => {
    const newBlog = {
        title: 'Add a New Blog',
        author: 'author',
        url: 'http://test.com',
        likes: 5
    }

    const initialResponse = await supertest(app).get('/api/blogs');
    const initialBlogsCount = initialResponse.body.length;

    await supertest(app)
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

    const finalResponse = await supertest(app).get('/api/blogs');
    const finalBlogsCount = finalResponse.body.length;

    expect(finalBlogsCount).toBe(initialBlogsCount + 1);

    const titles = finalResponse.body.map(r => r.title);
    expect(titles).toContain('Add a New Blog');
})

test('missing likes property', async () => {
    const newBlog = {
        title: 'Blog Without Likes',
        author: 'author',
        url: 'http://test.com'
    };

    const response = await supertest(app)
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

    expect(response.body.likes).toBeDefined();
    expect(response.body.likes).toBe(0);
});

test('blog without title will not be added', async () => {
    const newBlog = {
        author: 'author',
        url: 'http://test.com',
        likes: 4
    };

    await supertest(app)
        .post('/api/blogs')
        .send(newBlog)
        .expect(400);
});

test('blog without url will not be added', async () => {
    const newBlog = {
        title: 'Blog Without URL',
        author: 'Test Author',
        likes: 2
    };

    await supertest(app)
        .post('/api/blogs')
        .send(newBlog)
        .expect(400);
})

test('delete a blog', async () => {
    const newBlog = {
      title: 'Blog to be deleted',
      author: 'author',
      url: 'http://test.com'
    };
  
    const createdBlog = await supertest(app)
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);
  
    const initialBlogs = await supertest(app).get('/api/blogs');
    const initialCount = initialBlogs.body.length;
  
    await supertest(app)
      .delete(`/api/blogs/${createdBlog.body.id}`)
      .expect(204);
  
    const finalBlogs = await supertest(app).get('/api/blogs');
    expect(finalBlogs.body.length).toBe(initialCount - 1);
  })

  test('update blog likes', async () => {
    const initialBlogs = await supertest(app).get('/api/blogs');
    const blogToUpdate = initialBlogs.body[0];
  
    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1
    }
  
    await supertest(app)
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  
    const finalBlogs = await supertest(app).get('/api/blogs');
    const updated = finalBlogs.body.find(b => b.id === blogToUpdate.id);
  
    expect(updated.likes).toBe(blogToUpdate.likes + 1);
  })

afterAll(async () => {
    await mongoose.connection.close()
})