describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'niko',
      name: 'Niko Oksanen',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.get('button').contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('niko')
      cy.get('#password').type('salainen')
      cy.get('button').click()
      cy.contains('Niko Oksanen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('niko')
      cy.get('#password').type('niko')
      cy.get('button').contains('login').click()
      cy.get('.error').contains('wrong username or password')
      /*cy.get('.error').should('contain', 'wrong username or password')
        .and('have css', 'color', 'rgb(255,0,0)')
        .and('have.css', 'border-style', 'solid')*/
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.get('#username').type('niko')
        cy.get('#password').type('salainen')
        cy.get('button').click()
      })

      it('A blog can be created', function() {
        cy.get('#togglable-button').click()
        cy.get('#title').type('testiteksti1')
        cy.get('#author').type('testiteksti2')
        cy.get('#url').type('testiteksti3')
        cy.get('#create-blog').click()
        cy.get('#blog-list').contains('testiteksti1')
        cy.get('#blog-list').contains('testiteksti2')
      })
    })
  })
})