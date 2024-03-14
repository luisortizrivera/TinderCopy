import { faker } from "@faker-js/faker";
/* eslint-disable no-undef */
describe("Register and Login tests", () => {
  let userEmail;
  const userPassword = "P@asw0rd.";
  beforeEach(() => {
    cy.viewport(1024, 839);
    cy.visit("http://localhost:3000");
  });

  Cypress.Commands.add("goToProfileSetting", (name, surname) => {
    userEmail = name + "." + surname + "@example.com";
    cy.wait(1000);
    cy.get('[data-testid="change-btw-login-register-button"]').click();
    cy.wait(1000);
    cy.get("input[name=name]").type(name);
    cy.get("input[name=surname]").type(surname);
    cy.get("input[name=email]").type(userEmail);
    cy.get("input[name=password]").type(userPassword);
    cy.get('[data-testid="submit-button"]').click();
    cy.wait(1000);
    cy.get("#formFile").should("be.visible");
  });

  Cypress.Commands.add("createUserImage", () => {
    cy.exec(
      'powershell.exe -File "userImages/generateImages.ps1" -numberOfImagesToGenerate 1'
    );
  });

  it("Fill registering form", () => {
    const name = faker.person.firstName();
    const surname = faker.person.lastName();
    cy.goToProfileSetting(name, surname);
  });

  it("Register a new user", () => {
    const name = faker.person.firstName();
    const surname = faker.person.lastName();
    cy.goToProfileSetting(name, surname);
    cy.createUserImage();
    cy.get("input[type=file]").selectFile("userImages/image1.jpg");
    cy.get("#bio-textarea").type(faker.lorem.sentence(10));
    cy.get('[data-testid="resgister-profile-submit-button"]').click();
    cy.wait(1000);
    cy.get("input[name=email]").should("be.visible");
  });

  it("Login with registered user", () => {
    cy.get("input[name=email]").type(userEmail);
    cy.get("input[name=password]").type(userPassword);
    cy.get('[data-testid="submit-button"]').click();
    cy.wait(1000);
    cy.url().should("include", "/chatPage");
  });
});
