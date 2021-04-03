/// <reference types="Cypress" />
let Chance = require('chance');
let chance = new Chance();

describe('Cadastrar um novo Usuário', () => {
    it('Efetuar cadastro de um novo usuário', () => {
        //Acessar o site automation practice
        cy.visit('/');
        //Clicar no botão de Sign in
        cy.get('.login').should('be.visible').click();
        //Preencher as informações de e-mail 
        cy.url().should('equal', 'http://automationpractice.com/index.php?controller=authentication&back=my-account');
        cy.get('#email_create').should('be.visible').type(chance.email());
        //Clicar no botão Create an Account
        cy.get('#SubmitCreate').should('be.visible').click();
        //Preencher as informações do formulário de cadastro
        cy.url().should('contain', 'http://automationpractice.com/index.php?controller=authentication&back=my-account#account-creation');
        //Title
        cy.get('#id_gender1').should('be.visible').check();
        //First Name
        cy.get('#customer_firstname').should('be.visible').type(chance.first());
        //Last Name
        cy.get('#customer_lastname').should('be.visible').click().type(chance.last());
        //Password
        cy.get('#passwd').should('be.visible').type(chance.string({ length: 10, alpha: true, numeric: true }));
        // Date of Bird
        let day = (chance.natural({ min: 1, max: 31 }));
        let days = day.toString();
        let month = chance.natural({ min: 1, max: 12 });
        let months = month.toString();
        let year = chance.natural({ min: 1950, max: 2021 });
        let years = year.toString();
        cy.get('select#days').should('be.visible').select(days);
        cy.get('#months').should('be.visible').select(months);
        cy.get('#years').should('be.visible').select(years);
        //Company
        cy.get('#company').should('be.visible').type(chance.company());
        //Adress
        cy.get('#address1').should('be.visible').type(chance.address());
        cy.get('#city').should('be.visible').type(chance.city());
        let state = chance.natural({ min: 1, max: 53 });
        let states = state.toString();
        cy.get('#id_state').should('be.visible').select(states);
        cy.get('#postcode').should('be.visible').type(chance.zip());
        cy.get('#phone_mobile').should('be.visible').type(chance.phone());
        cy.get('#alias').should('be.visible').clear().type(chance.address());
        //Clicar no botão Register
        cy.get('#submitAccount').should('be.visible').click();
        //Validar que foi redirecionado para a url correta
        cy.url().should('contain', 'http://automationpractice.com/index.php?controller=my-account');
        //Validar exibição do texto 'Welcome to your account'
        cy.get('.info-account').should('contain', 'Welcome to your account');

    });

});