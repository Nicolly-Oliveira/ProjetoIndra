/// <reference types="cypress" />

describe('Formulário de cadastro de usuário', () => {
    
    beforeEach('Visitar site e validar, fazer login, validar o login e ir para página do formulário de cadastro de usuário', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        cy.xpath('//div[@id="footer"]').should('contain', 'OrangeHRM 4.10.1')
        cy.xpath('//input[@id="txtUsername"]')
            .should('be.visible')
            .type('Admin')
            .should('have.value', 'Admin')
        cy.xpath('//input[@id="txtPassword"]')
            .should('be.visible')
            .type('admin123')
            .should('have.value', 'admin123')
        cy.xpath('//input[@id="btnLogin"]')
            .should('be.visible')
            .click()
        cy.xpath('//a[@id="welcome"]')
            .should('be.visible')
            .and('contain', 'Welcome')
        cy.xpath('//b[contains(text(),"Admin")]')
            .should('be.visible')
            .click()
        cy.xpath('//input[@id="btnAdd"]')
            .should('be.visible')
            .click()
        cy.xpath('//h1[@id="UserHeading"]')
            .should('be.visible')
            .and('have.text', 'Add User')
        
    })


    it('Adicionar usuários com entradas inválidas', () => {
        
        cy.xpath('//input[@id="systemUser_employeeName_empName"]')
            .should('be.visible')   
            .type('0000000')
            .should('have.value', '0000000')
        cy.xpath('//input[@id="systemUser_userName"]')
            .should('be.visible')
            .type('000')
            .should('have.value', '000')  
        cy.xpath('//input[@id="systemUser_password"]')
            .should('be.visible')    
            .type('12345')
            .should('have.value', '12345')  
        cy.xpath('//input[@id="systemUser_confirmPassword"]')
            .should('be.visible')    
            .type('12345')
            .should('have.value', '12345')    
        cy.xpath('//input[@id="btnSave"]')
            .should('be.visible')
            .click()
        cy.xpath('//span[@for="systemUser_employeeName_empName"]')
            .should('be.visible')
            .and('have.text', 'Employee does not exist')
        cy.xpath('//span[@for="systemUser_userName"]')
            .should('be.visible')
            .and('have.text', 'Should have at least 5 characters')
        cy.xpath('//span[@for="systemUser_password"]')
            .should('be.visible')
            .and('have.text', 'Should have at least 8 characters')
        cy.xpath('//span[@for="systemUser_confirmPassword"]')
            .should('be.visible')
            .and('have.text', 'Please enter at least 8 characters.')

    })


    it('Adicionar usuários com entradas vazias', () => {

        cy.xpath('//input[@id="systemUser_employeeName_empName"]')
            .should('be.visible')
            .and('be.empty')
        cy.xpath('//input[@id="systemUser_userName"]')
            .should('be.visible')
            .and('be.empty')
        cy.xpath('//input[@id="systemUser_password"]')
            .should('be.visible')
            .and('be.empty')
        cy.xpath('//input[@id="systemUser_confirmPassword"]')
            .should('be.visible')  
            .and('be.empty')  
        cy.xpath('//span[@for="systemUser_employeeName_empName"]').should('not.exist')
        cy.xpath('//span[@for="systemUser_userName"]').should('not.exist')
        cy.xpath('//span[@for="systemUser_password"]').should('not.exist')
        cy.xpath('//input[@id="btnSave"]')
            .should('be.visible')
            .click()
        cy.xpath('//span[@for="systemUser_employeeName_empName"]')
            .should('exist')
            .and('be.visible')
            .and('have.text', 'Employee does not exist')
        cy.xpath('//span[@for="systemUser_userName"]')
            .should('exist')
            .and('be.visible')
            .and('have.text', 'Required')
        cy.xpath('//span[@for="systemUser_password"]')
            .should('exist')
            .and('be.visible')
            .and('have.text', 'Required')

    })


    it('Validar as entradas dispóniveis no dropdrow User Role e Status', () => {

        cy.xpath('//select[@id="systemUser_userType"]//option')
            .should('have.length', 2)
        cy.xpath('//select[@id="systemUser_userType"]//option').then($arr => {
            const values = []
            $arr.each(function() {
                values.push(this.innerHTML)
            })
            expect(values).to.include.members(["Admin", "ESS"])
        })

        cy.xpath('//select[@id="systemUser_status"]//option')
            .should('have.length', 2)
        cy.xpath('//select[@id="systemUser_status"]//option').then($arr => {
            const values = []
            $arr.each(function() {
                values.push(this.innerHTML)
            })
            expect(values).to.include.members(["Enabled", "Disabled"])
        })

    })

    it('Adicionar usuários com entradas válidas', () => {

        cy.xpath('//select[@id="systemUser_userType"]')
            .should('be.visible')
            .select('Admin')
            .should('have.value', '1')
        cy.xpath('//input[@id="systemUser_employeeName_empName"]')
            .should('be.visible')   
            .type('A{downArrow}{enter}')
            .should('not.have.value', '')
        cy.xpath('//input[@id="systemUser_userName"]')
            .should('be.visible')
            .type('NovoUser15')
            .should('have.value', 'NovoUser15')
        cy.xpath('//select[@id="systemUser_status"]')
            .should('be.visible')
            .select('Enabled')
            .should('have.value', '1')
        cy.xpath('//input[@id="systemUser_password"]')
            .should('be.visible')    
            .type('DaUlVi3@')
            .should('have.value', 'DaUlVi3@')
        cy.xpath('//input[@id="systemUser_confirmPassword"]')
            .should('be.visible')    
            .type('DaUlVi3@')
            .should('have.value', 'DaUlVi3@')
        cy.xpath('//input[@id="btnSave"]')
            .should('be.visible')
            .click()
        cy.get('.message').should('be.visible')      

    })

})