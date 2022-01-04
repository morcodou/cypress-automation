/// <reference types="cypress" />

describe('Place order from GreenKart website', () => {

    beforeEach('', () => {
        cy.visit('/seleniumPractise/#/');

        cy.get('.search-keyword').type('ca');
        cy.wait(2000);
    })

    it('should place order after searching with ca and items are added to the cart', () => {
        const itemNames = ['Carrot - 1 Kg', 'Cashews - 1 Kg'];
        cy.get('.products > .product').as('selectedProducts');

        cy.get('@selectedProducts').each(($product, index, $list) => {
            const itemName = $product.find('.product-name').text();
            if (itemNames.includes(itemName)) {
                $product.find('.product-action > button').click();
            }
        });

        cy.get('.cart-icon').click();
        cy.get('.action-block').contains('PROCEED TO CHECKOUT').click();
        cy.location('hash').should('equal', '#/cart');

        cy.get('button').contains('Place Order').click();
        cy.location('hash').should('equal', '#/country');

        cy.get('select').select('Canada');
        cy.get('.chkAgree').click();
        cy.get('button').contains('Proceed').click();

        cy.get('.wrapperTwo').should('be.visible');
    });

    it('should disable place order when no item is added to the cart', () => {
        cy.get('.cart-icon').click();

        cy.get('.empty-cart').should('be.visible');
        cy.get('.action-block > .disabled')
            .contains('PROCEED TO CHECKOUT')
            .should('be.visible');
    });
});