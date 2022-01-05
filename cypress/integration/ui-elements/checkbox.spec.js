/// <reference types="cypress" />

describe('[Checkbox]', () => {

    beforeEach('', () => {
        const url = 'https://rahulshettyacademy.com/AutomationPractice/'
        cy.visit(url);
    })

    it('should change the state to check/uncheck on single element', () => {
        cy.get('#checkBoxOption1').as('checkBoxOption');

        cy.get('@checkBoxOption').check();
        cy.get('@checkBoxOption')
            .should('be.checked')
            .and('have.value', 'option1');

        cy.get('@checkBoxOption').uncheck();
        cy.get('@checkBoxOption')
            .should('not.be.checked')
            .and('have.value', 'option1');
    });

    it('should change the state to check/uncheck on multiple elements', () => {
        const options = ['option2', 'option3'];
        cy.get('input[type="checkbox"]').check(options);

        cy.get('#checkBoxOption2')
            .should('be.checked')
            .and('have.value', 'option2');

        cy.get('#checkBoxOption3')
            .should('be.checked')
            .and('have.value', 'option3');

        cy.get('#checkBoxOption1')
            .should('not.be.checked')
            .and('have.value', 'option1');
    });
});