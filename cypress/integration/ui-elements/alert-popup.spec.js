/// <reference types="cypress" />

describe('[Alert Popup]', () => {

    beforeEach('', () => {
        const url = 'https://rahulshettyacademy.com/AutomationPractice/'
        cy.visit(url);

        Cypress.on("uncaught:exception", (err, runnable) => {
            // returning false here prevents Cypress from failing the test
            return false;
        });
    })

    it('should open alert popup', () => {
        cy.on("window:alert", (str) => {
            //window:alert is the event which get fired on alert open
            expect(str).to.equal('Hello , share this practice page and share your knowledge');
            cy.get('#alertbtn').click();
        });
    });

    it('should confirm popup', () => {
        cy.on("window:confirm", (str) => {
            //window:confirm is the event which get fired on confirm open
            expect(str).to.equal('Hello , Are you sure you want to confirm?');
            cy.get('#confirmbtn').click();
        });
    });

});