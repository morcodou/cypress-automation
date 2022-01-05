/// <reference types="cypress" />

describe('[Mouse Over]', () => {

    beforeEach('', () => {
        const url = 'https://rahulshettyacademy.com/AutomationPractice/'
        cy.visit(url);
    })

    it(' (FORCE) - should click on top item in hidden mode', () => {

        cy.contains('Top').click({ force: true });

        cy.location('hash').should('equal', '#top');
    });

    it(' (BTN) - should open list popup on mouse over and click on top item', () => {

        cy.get('#mousehover')
            .next()
            .invoke('show');

        cy.contains('Top').click();

        cy.location('hash').should('equal', '#top');
    });

    it(' (CONTENT) - should open list popup on mouse over and click on top item', () => {

        cy.get('.mouse-hover-content')
            .invoke('show');

        cy.get('a[href="#top"]').click();

        cy.location('hash').should('equal', '#top');
    });

});