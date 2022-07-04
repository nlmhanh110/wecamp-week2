//Web: https://demo.guru99.com/test/newtours/
describe('Login successfully and Check Flight Finder flow', () =>{
    it('should visit, login successfully and Flight Finder work', ()=>{
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

describe("Check the login flow (negative case)",()=>{
    it('should not login',()=>{
        cy.visit('https://demo.guru99.com/test/newtours/');
        cy.get('input[name="userName"]').click();
        cy.get('input[name="userName"]').type('wrongUsername');
        cy.get('input[name="password"]').click();
        cy.get('input[name="password"]').type('wrongPassword');
        cy.get('input[name="submit"]').click();
        cy.get('span').should('be.visible')
            .and('include.text','Enter your userName and password correct')
    })
})

//Web: https://demo.guru99.com/payment-gateway/index.php
describe('Check payment flow (positive case)',()=>{
    it('should pay successfully',()=>{
        cy.visit('https://demo.guru99.com/payment-gateway/index.php');
        cy.get('select[name="quantity"]').select('4').should('have.value','4');
        cy.get('input[value="Buy Now"]').click();
        cy.get('font:nth-child(2)').should('be.visible').and('include.text','$80.00')
        cy.get('input[name="submit"]').should('have.value','Pay $80.00')
        cy.get('input[name="card_nmuber"]').type("1234567890123456")
        cy.get('select[name="month"]').select('11').should('have.value','11')
        cy.get('select[name="year"]').select('2026').should('have.value','2026')
        cy.get('input[name="cvv_code"]').type("766")
        cy.get('input[name="submit"]').click()
        cy.get('h2').should('have.text','Payment successfull!')
        
    })
})

describe('Check payment flow (negative case if Card Number had characters)',()=>{
    it('should be impossible to pay',()=>{
        cy.visit('https://demo.guru99.com/payment-gateway/index.php');
        cy.get('select[name="quantity"]').select('4').should('have.value','4');
        cy.get('input[value="Buy Now"]').click();
        cy.get('input[name="card_nmuber"]').type("z")
        cy.get('label[id="message1"]').should('be.visible').and('include.text','Characters are not allowed')
    })
})

describe('Check payment flow (negative case if leaves Expiration Month not selected)',()=>{
    it('should be impossible to pay',()=>{
        cy.visit('https://demo.guru99.com/payment-gateway/index.php');
        cy.get('select[name="quantity"]').select('4').should('have.value','4');
        cy.get('input[value="Buy Now"]').click();
        cy.get('input[name="card_nmuber"]').type("1234567890123456")
        cy.get('select[name="year"]').select('2026').should('have.value','2026')
        cy.get('input[name="cvv_code"]').type("766")
        cy.get('select[name="month"]').then($el => $el[0].checkValidity()).should('be.false')
        cy.get('select[name="month"]').invoke('prop','validationMessage').should('equal','Please select an item in the list.')
    })
})

describe('Check payment flow (negative case if Card Number had shorter than 16 numbers)',()=>{
    it('should appear an error dialog',()=>{
        cy.visit('https://demo.guru99.com/payment-gateway/index.php');
        cy.get('select[name="quantity"]').select('4').should('have.value','4');
        cy.get('input[value="Buy Now"]').click();
        cy.get('input[name="card_nmuber"]').type("1234567890")
        cy.get('select[name="month"]').select('11').should('have.value','11')
        cy.get('select[name="year"]').select('2026').should('have.value','2026')
        cy.get('input[name="cvv_code"]').type("766")
        cy.get('input[name="submit"]').click()
        cy.on('window:alert',(str)=>{
            expect(str).to.equal('Check card number is 16 digits!')
        })
    })
})