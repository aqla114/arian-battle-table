import { updateObject } from '../../../src/frontend/utils/reducer-commons';

describe('My First Test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8000');
    });

    it('finds the content "type"', () => {
        cy.contains('9').click();

        cy.url().should('include', '/battle/9');
    });

    it('updateObject', () => {
        const originObject = { a: 10, b: 'hoge' };
        const updatedObject = { a: 10, b: 'poyo' };
        expect(updateObject(originObject, { b: 'poyo' })).to.deep.equal(updatedObject);
    });
});
