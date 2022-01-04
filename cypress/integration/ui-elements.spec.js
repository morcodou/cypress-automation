/// <reference types="cypress" />

describe('UI Element from automation-practice site', () => {

    beforeEach('', () => {
        const url = 'https://rahulshettyacademy.com/AutomationPractice/'
        cy.visit(url);
    })

    describe('[Radio Button]', () => {
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

    describe('[UI Visibility]', () => {
        it('should not be visible', () => {
            cy.get('#hide-textbox').click();

            cy.get('#displayed-text').should('not.be.visible');
        });

        it('should be visible', () => {
            cy.get('#hide-textbox').click();
            cy.get('#show-textbox').click();

            cy.get('#displayed-text').should('be.visible');
        });
    });

    describe('[DropDown]', () => {
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

    describe('[Checkbox]', () => {
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

});