/// <reference types="cypress" />

describe('[Open Tab]', () => {

    beforeEach('', () => {
        const url = 'https://rahulshettyacademy.com/AutomationPractice/'
        cy.visit(url);

        Cypress.on("uncaught:exception", (err, runnable) => {
            // returning false here prevents Cypress from failing the test
            return false;
        });
    });

    it('should open in the new tab and come back', () => {
        cy.get('#opentab')
            .invoke("removeAttr", "target")
            .click();

        cy.location('hash').should('equal', '#/index');

        cy.go('back');
        // cy.go(-1);

        cy.location('pathname').should('equal', '/AutomationPractice/');
    });

});