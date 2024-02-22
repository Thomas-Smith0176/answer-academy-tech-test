describe('Saucedemo login test', () => {
  it('Visits saucedemo.com', () => {
    cy.visit('https://www.saucedemo.com/')
    cy.url().should('include', 'www.saucedemo.com')
  })
  it('Holds username and password in correct fields', () => {
    cy.visit('https://www.saucedemo.com/')

    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')

    cy.get('[data-test="username"]').should('have.value', 'standard_user')
    cy.get('[data-test="password"]').should('have.value', 'secret_sauce')
  })
  it('Visits store page when given correct login info', () => {
    cy.visit('https://www.saucedemo.com/')

    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    cy.url().should('include', 'inventory.html')
  })
})