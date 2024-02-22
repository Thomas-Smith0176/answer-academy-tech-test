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
  it('Displays appropriate error for an incorrect username', () => {
    cy.visit('https://www.saucedemo.com/')

    cy.get('[data-test="username"]').type('not_a_user')
    cy.get('[data-test="password"]').type('not_a_password')
    cy.get('[data-test="login-button"]').click()

    cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username and password do not match any user in this service')
  })
  it('Displays appropriate error for a locked out user', () => {
    cy.visit('https://www.saucedemo.com/')

    cy.get('[data-test="username"]').type('locked_out_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Sorry, this user has been locked out.')
  })
  it('Logout button should return user to the login page', () => {
    cy.visit('https://www.saucedemo.com/')

    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.get('#react-burger-menu-btn').click()
    cy.get('#logout_sidebar_link').click()

    cy.url().should('not.include', 'inventory.html')
  })
})