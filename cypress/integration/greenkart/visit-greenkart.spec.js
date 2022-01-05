/// <reference types="cypress" />

describe('Browsing GreenKart website', () => {

    it('should open the website url', () => {
        const length = 2;
        cy.visit('/seleniumPractise/#/');

        cy.get('.search-keyword').type('Br');
        cy.wait(2000);

        cy.get('.products > .product').as('selectedProducts');

        cy.get('.products').find('.product').should('have.length', length);
        cy.get('@selectedProducts').should('have.length', length);
        cy.get('.product:visible').should('have.length', length);

        // cy.get('.products > .product').eq(1).contains('ADD TO CART').click();
        console.log('cypress - console browser output');

        const itemToAdd = 'Brinjal - 1 Kg';
        cy.get('@selectedProducts').each(($product, index, $list) => {

            const itemName = $product.find('.product-name').text();
            if (itemName.includes(itemToAdd)) {
                // $product.find('button').click();
                $product.find('.product-action > button').click();
                expect($product.find('.added').text()).equal('✔ ADDED');
            }
        });

        // Promise
        cy.get('.brand').then($logo =>{
            cy.log($logo.text());
        });

        cy.get('.brand').should('have.text', 'GREENKART');
    });
});