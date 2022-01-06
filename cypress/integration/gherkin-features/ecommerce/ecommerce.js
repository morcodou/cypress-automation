/// <reference types="cypress" />

import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Given(/^I open ecommerce page$/, () => {
    cy.visit('/angularpractice/');
});

When(/^I add item to cart$/, () => {
    cy.get('a[href="/angularpractice/shop"]')
        .click();

    const productNames = ['Samsung Note 8', 'Nokia Edge'];
    cy.get('.card-body > .card-title').as('products');
    cy.get('.card-footer > .btn').as('addbuttoons');
    cy.get('@products').each(($product, $index, $list) => {
        if (productNames.includes($product.text().trim())) {
            cy.get('@addbuttoons')
                .eq($index)
                .click();
        }
    });
    cy.get('.nav-link').contains('a', 'Checkout').as('checkoutlink');
    cy.get('@checkoutlink').click();
});



And(/^Validate the total of price$/, () => {
    cy.get('tr > td:nth-child(4) > strong').as('productprice');
    let totalPrice = 0;
    cy.get('@productprice')
        .each(($price, $index, $list) => {
            const values = $price.text().trim().split(' ');
            const price = +values[values.length - 1];
            totalPrice = totalPrice + price;
        })
        .then(() => cy.get('h3 > strong')
            .should('have.text', `₹. ${totalPrice}`)
        );
});

Then(/^Select the contry submit and verify Thank you message$/, () => {
    cy.get('.btn').contains('Checkout').as('checkoutbtn');
    cy.get('@checkoutbtn').click();

    cy.get('.checkbox').as('iagree');
    cy.get('@iagree').click();

    cy.get('#country').type('Mon');
    cy.get('.suggestions').contains('ul', 'Monaco').click();
    cy.get('#country').should('have.value', 'Monaco');
    cy.get('.btn').contains('Purchase').as('purchase');

    cy.get('@purchase').click();
    cy.get('.alert.alert-success.alert-dismissible')
        .should('be.visible')
        .and('contain', 'Success! Thank you! Your order will be delivered in next few weeks :-).');
});


When(/^I fill the form details$/, (dataTable) => {
    const [name, gender, email, password, birthday] = dataTable.rawTable[1];

    cy.get('input[name="name"]').as('username');
    cy.get('@username').first().type(name);
    cy.get('input[name="email"]').type(email);
    cy.get('#exampleInputPassword1').type(password);
    cy.get('#exampleFormControlSelect1').select(gender);
    cy.get('#exampleCheck1').click();
    cy.get('#inlineRadio2').click();
    cy.get('input[name="bday"]').type(birthday);
});

And(/^Validate the form fields$/, (dataTable) => {
    const [name, birthday] = dataTable.rawTable[1];

    cy.get('input[name="name"]').as('username');
    cy.get('@username')
        .first()
        .should('have.attr', 'minlength', 2)
        .and('have.attr', 'required');

    cy.get('@username').last().should('have.value', name);
    cy.get('input[name="email"]').and('have.attr', 'required');
    cy.get('#exampleInputPassword1').should('have.attr', 'type', 'password');
    cy.get('#inlineRadio3').should('be.disabled');
    cy.get('input[name="bday"]')
        .should('have.attr', 'type', 'date')
        .and('have.value', birthday);
});

Then(/^Submit and verify Thank you message$/, () => {
    cy.get('form').submit();
    cy.get('.alert')
        .should('be.visible')
        .and('contain', 'Success! The Form has been submitted successfully!.');
});
