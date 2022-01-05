/// <reference types="cypress" />

describe('[Web Table]', () => {

    beforeEach('', () => {
        const url = 'https://rahulshettyacademy.com/AutomationPractice/'
        cy.visit(url);
    });

    it('(TR) - should find the associated course line of table for the given price', () => {

        const course = 'WebSecurity Testing for Beginners-QA knowledge to next level';
        const price = '20';

        cy.get('fieldset > #product > tbody > tr')
            .as('trcourses');

        // header will be included
        cy.get('@trcourses').should('have.length', 11);
        cy.get('@trcourses')
            .contains(course)
            .next()
            .should('have.text', price);
    });

    it('(TD) - should find the associated course line of table for the given price', () => {

        const course = 'Master Selenium Automation in simple Python Language';
        const price = '25';

        cy.get('fieldset > #product > tbody > tr> td:nth-child(2)')
            .as('tdcourses');

        cy.get('@tdcourses').should('have.length', 10);
        cy.get('@tdcourses').each(($course, $index, $list) => {
            if ($course.text() === course) {
                cy.get('@tdcourses')
                    .eq($index)
                    .next()
                    .then($price => expect($price.text()).equal(price))
            };
        });
    });

});