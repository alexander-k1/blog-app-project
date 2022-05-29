/* eslint-disable testing-library/await-async-query */
/* eslint-disable testing-library/prefer-screen-queries */
describe('app', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear()
    })
    cy.visit('/')
  })
  it('allows reading posts by users as well as comments', () => {
    //list of authors
    cy.findByRole('heading', {
      name: /authors/i,
    }).should('exist')
    //10 users are on the author list
    cy.findAllByRole('article').should('have.length', 10)
    //choose the first author
    cy.get('[data-cy=user-1]').click()
    //selectedUser class is added
    cy.get('[data-cy=user-1]')
      .invoke('attr', 'class')
      .should('contain', 'selectedUser')
    //choose the first post by the user
    cy.get('[data-cy=post-1]').click()
    //check the post's title
    cy.findByRole('heading', {
      name: /sunt aut facere repellat provident occaecati excepturi optio reprehenderit/i,
    }).should('exist')
    //check the post's initial words
    cy.findByText(/quia et suscipit/i).should('exist')
    //check comments
    cy.findAllByRole('listitem').should('have.length', 5)
  })
  it('allows to leave comments as a logged-in user', () => {
    //log in
    cy.login('John Doe', '123456')
    //choose the first author
    cy.get('[data-cy=user-1]').click()
    //choose the first post by the user
    cy.get('[data-cy=post-1]').click()
    //enter the comment title
    cy.findByRole('textbox', {
      name: /title/i,
    }).type('New comment title')
    //enter the text
    cy.findByRole('textbox', {
      name: /comment/i,
    }).type('New comment text')
    cy.findByRole('button', {
      name: /submit/i,
    }).click()
    //check for the new comment
    cy.findByText(/new comment title/i).should('exist')
    cy.findByText(/new comment text/i).should('exist')
  })
  it('allows to create new posts as a logged-in users', () => {
    //log in
    cy.login('John Doe', '123456')
    //go to new post page
    cy.findByRole('link', {
      name: /new post/i,
    }).click()
    //enter the new post title
    cy.findByRole('textbox', {
      name: /title/i,
    }).type('New interesting post title')
    //enter the new post text
    cy.findByRole('textbox', {
      name: /post/i,
    }).type('New interesting post text')
    cy.findByRole('button', {
      name: /submit/i,
    }).click()
    //choose the author
    cy.findByText(/john doe/i).click()
    //check for the new post
    cy.findByText(/new interesting post title/i).should('exist')
  })
})
