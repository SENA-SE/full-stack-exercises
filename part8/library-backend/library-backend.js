require('dotenv').config()
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const moon = require('mongoose')
const {GraphQLError} = require('graphql')
mongoose.set('strict', false)
const { default: mongoose } = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI
moongoose.connect(MONGODB_URI).then(() => {
  console.log('connected to MongoDB')
})
.catch((error) => {
  console.log(error.message)
})

// let authors = [
//   {
//     name: 'Robert Martin',
//     id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
//     born: 1952,
//   },
//   {
//     name: 'Martin Fowler',
//     id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
//     born: 1963
//   },
//   {
//     name: 'Fyodor Dostoevsky',
//     id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//     born: 1821
//   },
//   { 
//     name: 'Joshua Kerievsky', // birthyear not known
//     id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
//   },
//   { 
//     name: 'Sandi Metz', // birthyear not known
//     id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
//   },
// ]

// /*
//  * English:
//  * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
//  * However, for simplicity, we will store the author's name in connection with the book
// */

// let books = [
//   {
//     title: 'Clean Code',
//     published: 2008,
//     author: 'Robert Martin',
//     id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Agile software development',
//     published: 2002,
//     author: 'Robert Martin',
//     id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//     genres: ['agile', 'patterns', 'design']
//   },
//   {
//     title: 'Refactoring, edition 2',
//     published: 2018,
//     author: 'Martin Fowler',
//     id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Refactoring to patterns',
//     published: 2008,
//     author: 'Joshua Kerievsky',
//     id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'patterns']
//   },  
//   {
//     title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//     published: 2012,
//     author: 'Sandi Metz',
//     id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'design']
//   },
//   {
//     title: 'Crime and punishment',
//     published: 1866,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'crime']
//   },
//   {
//     title: 'The Demon ',
//     published: 1872,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'revolution']
//   },
// ]

/*
  you can remove the placeholder query once your first own has been implemented 
*/

const typeDefs = `
  type Book {
    title: String!
    published: String!
    author: Author!
    id: ID!
    genres: [String!]!
    me: User

  }
  type Author {
    name: String!
    id: ID!
    born: String
    bookCount: Int
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author:String, genres: String): [Book!]!
    allAuthors: [Author!]!

  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: String!
      genres: [String!]!
      ): Book

    editAuthor(
      name: String!
      born: String!
      ): Author
    
    createUser(
      username: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token

  }
`

const resolvers = {
  Query: {
    bookCount: async () => {
      return await Book.collection.countDocuments()
    },
    authorCount: async () => {
      return await Author.collection.countDocuments()
    },
    
    allAuthors: async () => {
      return await Author.find({})
    },
    allBooks: async (root, args) => {
      const resultAuthor = await Author.findOne({ name: args.author })
      if (args.author && args.genres) {
        return await Book.find({ author: args.author, genres: { $in: args.genres } }).populates('author')
      }
      if (args.author) {
        return await Book.find({ author: resultAuthor.id }).populates('author')
      }
      if (args.genres) {
        return await Book.find({ genres: { $in: args.genres } }).populates('author')
      }
      return await Book.find({}).populates('author')
    }
  },
  Author: {
    bookCount: async (root) => {
      const resultAuthor = await Author.findOne({ name: root.name })
      const resultBook = await Book.find({ author: resultAuthor.id })
      return resultBook.length
    }
  },
  me: async (root, args, context) => {
    return context.currentUser
  },
  Mutation: {
    addBook: async (root, args) => {
      const author = await Author.findOne({ name: args.author })
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('Not authenticated')
      }
      if (!author) {
        const newAuthor = new Author({ name: args.author })
        try {
          await newAuthor.save()
        } catch (error) {
          throw new GraphQLError(error.message)
        }
      }
      const resultAuthor = await Author.findOne({ name: args.author })
      const book = new Book({ ...args, resultAuthor })
      try {
        await book.save()
        return book
      } catch (error) {
        throw new GraphQLError(error.message)
      }
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('Not authenticated')
      }
      if (!author) {
        throw new GraphQLError('Author not found')
      } else {
        author.born = args.born
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError(error.message)
        }
      return author
      }
  },
  createUser: async (root, args) => {
    const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre})
    try {
      await user.save()
      return user
    } catch (error) {
      throw new GraphQLError(error.message)
    }
  },
  login: async (root, args) => {
    const user = await User.findOne({ username: args.username })
    if (!user || args.password !== 'password') {
      throw new GraphQLError('Invalid credentials')
    }
    const userData = {
      username: user.username,
      id: user._id
    }
    return { value: jwt.sign(userData, process.env.SECRET) }
  }
}}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})