/// <reference types="cypress" />

describe('[DropDown]', () => {

    beforeEach('', () => {
        const url = 'https://rahulshettyacademy.com/AutomationPractice/'
        cy.visit(url);
    })

    it('should select option from static dropDown', () => {
        cy.get('#dropdown-class-example').as('staticDropdown');
        cy.get('@staticDropdown').select('option2');
        cy.get('@staticDropdown').should('have.value', 'option2');

        cy.get('select')
            .select('option3')
            .should('have.value', 'option3');
    });

    it('should select option from dynamic dropDown', () => {
        cy.get('#autocomplete').as('dynamicDropdown');
        cy.get('@dynamicDropdown').type('can');

        // cy.get('.ui-menu-item > .ui-menu-item-wrapper')
        cy.get('.ui-menu-item-wrapper')
            .each(($country, index, $list) => {
                if ($country.text() === 'Canada') {
                    $country.click();
                }
            });

        cy.get('@dynamicDropdown')
            .should('have.value', 'Canada');
    });

});