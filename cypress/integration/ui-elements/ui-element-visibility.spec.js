/// <reference types="cypress" />

describe('[UI Visibility]', () => {

    beforeEach('', () => {
        const url = 'https://rahulshettyacademy.com/AutomationPractice/'
        cy.visit(url);
    })

    it('should not be visible', () => {
        cy.get('#hide-textbox').click();

        cy.get('#displayed-text').should('not.be.visible');
    });

    it('should be visible', () => {
        cy.get('#hide-textbox').click();
        cy.get('#show-textbox').click();

        cy.get('#displayed-text').should('be.visible');
    });

});