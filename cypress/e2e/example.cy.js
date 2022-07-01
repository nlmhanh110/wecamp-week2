describe('Login successfully', () =>{
    it('should visit', ()=>{
        cy.visit('https://demo.guru99.com/test/newtours/');
        cy.wait(1000);
        cy.get('input[name="userName"]').click();
        cy.get('input[name="userName"]').type('tutorial');
        cy.get('input[name="password"]').click();
        cy.get('input[name="password"]').type('tutorial');
        cy.get('input[name="submit"]').click();
        cy.wait(1000);
        cy.get('h3').contains('Login Successfully')
        cy.get('h3').should('be.visible')
            .and('have.text','Login Successfully')
        cy.get('a[href="reservation.php"]').click()
        cy.get('select[name="fromMonth"]').select('12').should('have.value','12')
        cy.get('select[name="fromDay"]').select('5').should('have.value','5')
        cy.get('select[name="toMonth"]').select('12').should('have.value','12')
        cy.get('select[name="toDay"]').select('5').should('have.value','5')
        cy.get('input[name="findFlights"]').click();
        cy.get('font:nth-child(1) > b > font:nth-child(1)').contains('After flight finder - No Seats Avaialble')
    })
})