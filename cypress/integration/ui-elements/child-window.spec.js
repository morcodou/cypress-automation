/// <reference types="cypress" />

describe('[Child Window]', () => {

    beforeEach('', () => {
        const url = 'https://rahulshettyacademy.com/AutomationPractice/'
        cy.visit(url);

        Cypress.on("uncaught:exception", (err, runnable) => {
            // returning false here prevents Cypress from failing the test
            return false;
        });
    });

    it('should navigate to the url using href property', () => {

        cy.get('#opentab')
            .then(element => {
                cy.visit(element.attr('href'))
            });

        cy.location('hash').should('equal', '#/index');

        cy.go(-1);
        cy.url().should('equal', 'https://rahulshettyacademy.com/AutomationPractice/');
    });

});