/// <reference types="cypress" />

describe('[Radio Button]', () => {

    beforeEach('', () => {
        const url = 'https://rahulshettyacademy.com/AutomationPractice/'
        cy.visit(url);
    })

    it('should select radion button', () => {
        // cy.get('input[value="radio2"]')
        //     .click()
        //     .should('be.checked');

        cy.get('input[value="radio2"]')
            .check()
            .should('be.checked');

        cy.get('input[value="radio1"]')
            .should('not.be.checked');

        cy.get('input[value="radio3"]')
            .should('not.be.checked');
    });
});