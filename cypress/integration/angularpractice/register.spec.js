/// <reference types="cypress" />

describe('Register User', () => {

    let userFixture;

    beforeEach('', () => {
        cy.fixture('user').then(user => userFixture = user);
        cy.visit('/angularpractice/');
    })

    it('should submit user informations', () => {

        cy.get('input[name="name"]').as('username');

        cy.get('@username')
            .first()
            .type(userFixture.name)
            .should('have.attr', 'minlength', 2)
            .and('have.attr', 'required');

        cy.get('@username')
            .last()
            .should('have.value', userFixture.name);

        cy.get('input[name="email"]')
            .type(userFixture.email)
            .and('have.attr', 'required');

        cy.get('#exampleInputPassword1')
            .type(userFixture.password)
            .should('have.attr', 'type', 'password');

        cy.get('#exampleCheck1').click();

        cy.get('#inlineRadio3').should('be.disabled');

        cy.get('#inlineRadio2').click();

        cy.get('input[name="bday"]')
            .type(userFixture.birthday)
            .should('have.attr', 'type', 'date')
            .and('have.value', userFixture.birthday);

        cy.get('form').submit();

        cy.get('.alert')
            .should('be.visible')
            .and('contain', 'Success! The Form has been submitted successfully!.');
    });

});