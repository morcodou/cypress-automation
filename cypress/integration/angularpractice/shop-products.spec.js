/// <reference types="cypress" />

describe('Shop Products', () => {

    let userFixture;

    beforeEach('', () => {
        cy.fixture('user').then(user => userFixture = user);
        cy.visit('/angularpractice/');

        cy.get('a[href="/angularpractice/shop"]').click();
    })

    it('should checout the selected product', () => {

        const productNames = ['Samsung Note 8', 'Nokia Edge'];
        cy.location('pathname').should('equal', '/angularpractice/shop');

        cy.get('.card-body > .card-title').as('products');
        cy.get('.card-footer > .btn').as('addbuttoons');

        cy.get('@products').should('have.length', 4);
        cy.get('@addbuttoons').should('have.length', 4);

        // cy.get('@products')
        //     .contains('Samsung Note 8')
        //     .parentsUntil('app-card')
        //     .children('.card-footer')
        //     .contains('Add ')
        //     .click();

        // cy.get('@products')
        //     .contains('Nokia Edge')
        //     .parentsUntil('app-card')
        //     .children('.card-footer')
        //     .contains('Add ')
        //     .click();

        cy.get('@products').each(($product, $index, $list) => {
            if (productNames.includes($product.text().trim())) {
                cy.get('@addbuttoons')
                    .eq($index)
                    .click();
            }
        });

        cy.get('.nav-link')
            .contains('a', 'Checkout').as('checkoutlink');

        cy.get('@checkoutlink')
            .should('contain', '( 2 )');

        cy.get('@checkoutlink').click();

        // cy.get('tr td:nth-child(4) strong').should('have.length', 2);
        cy.get('tr > td:nth-child(4) > strong').as('productprice');
        let totalPrice = 0;
        cy.get('@productprice')
            .should('have.length', 2)
            .each(($price, $index, $list) => {
                const values = $price.text().trim().split(' ');
                const price = +values[values.length - 1];
                totalPrice = totalPrice + price;
            })
            .then(() => cy.get('h3 > strong')
                .should('have.text', `???. ${totalPrice}`)
            );

        cy.get('.btn')
            .contains('Checkout').as('checkoutbtn');
        cy.get('@checkoutbtn').click();

        cy.get('.checkbox').as('iagree');
        cy.get('@iagree').click();

        // Cypress.config('defaultCommandTimeout', 8000);

        cy.get('#country').type('Mon');
        cy.get('.suggestions')
            .contains('ul', 'Monaco').click();
        cy.get('#country').should('have.value', 'Monaco');

        cy.get('.btn')
            .contains('Purchase')
            .as('purchase');

        cy.get('@purchase').click();
        cy.get('.alert.alert-success.alert-dismissible')
            .should('be.visible')
            .and('contain', 'Success! Thank you! Your order will be delivered in next few weeks :-).');
    });

});