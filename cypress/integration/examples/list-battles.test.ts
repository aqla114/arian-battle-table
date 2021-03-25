describe('ListBattles', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('redirect and shows battle table header correctly.', () => {
        cy.url().should('include', '/list-battles');

        cy.get('.battles-list__header').contains('id');
    });

    it('contains battles.', () => {
        cy.get('.battles-list__session').should('have.lengthOf.gt', 0);
    });

    it('moves to battle session when the session card clicked.', () => {
        cy.get('.battles-list__session')
            .first()
            .click();
        cy.url().should('include', '/battle/9');
    });

    it('');
});
