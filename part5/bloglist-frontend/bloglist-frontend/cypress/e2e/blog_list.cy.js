

// describe('Blog app', function() {
//   beforeEach(function() {
//     cy.request('POST', 'http://localhost:3003/api/testing/reset')
//     const user = {
//       name: 'Matti Luukkainen',
//       username: 'mluukkai',
//       password: 'salainen'
//     }
//     cy.request('POST', 'http://localhost:3003/api/users/', user)
//     cy.visit('http://localhost:5173')

//   })

//   it('Login form is shown', function() {
//     cy.visit('http://localhost:5173')
//     cy.contains('Log in to application')
//   })
// })

// describe('Login',function() {
//   beforeEach(function() {
//     cy.request('POST', 'http://localhost:3003/api/testing/reset')
//     const user = {
//       name: 'Matti Luukkainen',
//       username: 'mluukkai',
//       password: 'salainen'
//     }
//     cy.request('POST', 'http://localhost:3003/api/users/', user)
//     cy.visit('http://localhost:5173')

//   })
//   it('succeeds with correct credentials', function() {
//     cy.visit('http://localhost:5173')
//     cy.contains('Log in').click()
//     cy.get('input[name="Username"]').type('mluukkai')
//     cy.get('input[name="Password"]').type('salainen')
//     cy.get('#login-button').click()

//     cy.contains('mluukkai logged in')
//   })

//   it('fails with wrong credentials', function() {
//     cy.visit('http://localhost:5173')
//     cy.contains('Log in').click()
//     cy.get('input[name="Username"]').type('mluukkai')
//     cy.get('input[name="Password"]').type('wrongpassword')
//     cy.get('#login-button').click()

//     // Check for error message
//     cy.get('.message')
//       .should('contain', 'invalid username or password')


//     cy.contains('Log in to application')
//   })
// })

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'testpass'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    const user2 = {
      name: 'Test User',
      username: 'otherUser',
      password: 'otherPass'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user2)

    cy.visit('http://localhost:5173')

    cy.get('input[name="Username"]').type('testuser')
    cy.get('input[name="Password"]').type('testpass')
    cy.get('#login-button').click()

    cy.contains('new blog').click()
    cy.get('input[name="title"]').type('Initial Blog')
    cy.get('input[name="author"]').type('Initial Author')
    cy.get('input[name="url"]').type('http://initialblog.com')
    cy.get('#submit-blog').click()
  })

  describe('When logged in', function() {

    it('A blog can be created', function() {
      // cy.contains('new blog').click()

      cy.get('input[name="title"]').type('New Test Blog')
      cy.get('input[name="author"]').type('Test Author')
      cy.get('input[name="url"]').type('http://testblog.com')

      cy.get('#submit-blog').click()

      cy.contains('New Test Blog')
    })

    it('Users can like a blog', function() {
      cy.contains('View details').click()
      cy.contains('like it').click()
      cy.contains('Likes: 1')
    })

    it('The blog creator can delete the blog', function() {
      cy.contains('View details').click()
      cy.contains('remove blog').click()

      cy.on('window:confirm', () => true)

      cy.contains('New Test Blog').should('not.exist')
    })

    it('Only the blog creator can see the delete button', function() {
      cy.contains('View details').click()
      cy.contains('remove blog').should('be.visible')

      cy.contains('Log out').click()

      cy.get('input[name="Username"]').type('otherUser')
      cy.get('input[name="Password"]').type('otherPass')
      cy.get('#login-button').click()

      // Verify that the delete button is not visible for other users
      cy.contains('View details').click()
      cy.contains('remove blog').should('not.exist')
    })
  })

  it('Blogs are ordered according to likes', function() {

    cy.contains('Second Blog Title').parent().find('button').contains('View details').click()
    cy.contains('Second Blog Title').parent().find('button').contains('like it').click()
    cy.wait(500) // wait for state update
    cy.contains('Second Blog Title').parent().find('button').contains('like it').click()
    cy.wait(500) // wait for state update

    // Like the first blog once
    cy.contains('First Blog Title').parent().find('button').contains('View details').click()
    cy.contains('First Blog Title').parent().find('button').contains('like it').click()
    cy.wait(500) // wait for state update

    // Check the order
    cy.get('.blog').eq(0).should('contain', 'Second Blog Title')
    cy.get('.blog').eq(1).should('contain', 'First Blog Title')
    // Add more checks as necessary for other blogs
  })
})
