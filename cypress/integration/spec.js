describe('Sapper template app', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('has the correct <h1>', () => {
		cy.contains('h1', 'This is home page of Sapper Sched!')
	});

	it('navigates to /about', () => {
		cy.get('nav a').contains('about').click();
		cy.url().should('include', '/about');
		cy.contains('h1', 'About this site');
	});

	it('navigates to /users', () => {
		cy.get('nav a').contains('users').click();
		cy.url().should('include', '/users');
	});
});