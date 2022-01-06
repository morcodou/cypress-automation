/// <reference types="cypress" />

beforeEach(() => {
    cy.fixture('user').then(function (user) {
        this.userFixture = user;
    });
})

