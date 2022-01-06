/// <reference types="cypress" />

describe('Network API - Request', () => {

    it('should add a book to the api', () => {
        const endpoint = 'http://216.10.245.166/Library/Addbook.php';
        const payload = {
            "name": "Learn Appium Automation with Java",
            "isbn": "bcggsss",
            "aisle": "22s7",
            "author": "John foe"
        };

        cy.request('POST', endpoint, payload)
            .then(response => {
                expect(response.body).to.have.property("Msg", "successfully added")
                expect(response.status).to.eq(200)
            });
    });
});