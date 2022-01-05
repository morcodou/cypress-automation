/// <reference types="cypress" />
/// <reference types="cypress-iframe" />

describe('[IFrame]', () => {

    beforeEach('', () => {
        const url = 'https://rahulshettyacademy.com/AutomationPractice/'
        cy.visit(url);

        cy.frameLoaded("#courses-iframe");
    });

    it('should access element in the frame', () => {

        cy.iframe().find('li > a[href="#/mentorship"]')
            .contains('Mentorship')
            .click();

        cy.iframe().find('h1[class*="pricing-title"]').as('packages')
        cy.get('@packages')
            .should('have.length', 2);

        cy.get('@packages')
            .contains('BRONZE')
            .next()
            .should('have.text', '( For Short-term Use )');

        cy.get('@packages')
            .contains('PLATINUM')
            .next()
            .should('have.text', '( For Long-term Use )');

    });

});