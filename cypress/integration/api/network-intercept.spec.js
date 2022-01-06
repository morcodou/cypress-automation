/// <reference types="cypress" />

describe('Network Request - intercept', () => {

    beforeEach('', () => {
        cy.visit('https://example.cypress.io/commands/network-requests');
    })

    it('should intercept GET comments', () => {
        cy.intercept('GET', '**/comments/*').as('getComment')

        cy.get('.network-btn').click()

        cy.wait('@getComment').its('response.statusCode').should('be.oneOf', [200, 304])
    });

    it('should intercept POST comments', () => {
        cy.intercept('POST', '**/comments').as('postComment')

        cy.get('.network-post').click()
        cy.wait('@postComment').should(({ request, response }) => {
            expect(request.body).to.include('email')
            expect(request.headers).to.have.property('content-type')
            expect(response && response.body).to.have.property('name', 'Using POST in cy.intercept()')
        })
    });

    it('should intercept PUT comments', () => {

        let message = 'whoa, this comment does not exist'
        cy.intercept({
            method: 'PUT',
            url: '**/comments/*',
        }, {
            statusCode: 404,
            body: { error: message },
            headers: { 'access-control-allow-origin': '*' },
            delayMs: 500,
        }).as('putComment')

        cy.get('.network-put').click()

        cy.wait('@putComment')

        cy.get('.network-put-comment').should('contain', message)
    });

});