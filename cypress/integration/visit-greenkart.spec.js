/// <reference types="cypress" />

describe('Browsing GreenKart website', () => {

    it('should open the website url', () => {
        const length = 2;
        cy.visit('/seleniumPractise/#/');

        cy.get('.search-keyword').type('Br');
        cy.wait(2000);

        cy.get('.products').find('.product').should('have.length', length);
        cy.get('.products > .product').should('have.length', length);
        cy.get('.product:visible').should('have.length', length);
    });

})