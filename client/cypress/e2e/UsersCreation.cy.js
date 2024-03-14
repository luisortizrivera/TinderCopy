import { faker } from "@faker-js/faker";
/* eslint-disable no-undef */

describe("Register and Login tests", () => {
  let users = [];
  const NUMBER_OF_USERS = 7;
  const userPassword = "P@asw0rd.";

  beforeEach(() => {
    cy.viewport(1024, 839);
    cy.visit("http://localhost:3000");
  });

  // #region Register users functions
  Cypress.Commands.add("goToProfileSetting", (name, surname) => {
    const userEmail = name + "." + surname + "@example.com";
    users.push({ email: userEmail });
    // cy.wait(1000);
    cy.get('[data-testid="change-btw-login-register-button"]').click();
    cy.wait(1000);
    cy.get("input[name=name]").type(name);
    cy.get("input[name=surname]").type(surname);
    cy.get("input[name=email]").type(userEmail);
    cy.get("input[name=password]").type(userPassword);
    cy.get('[data-testid="submit-button"]').click();
    cy.wait(2000);
    cy.get("#formFile").should("be.visible");
  });

  Cypress.Commands.add("createUserImage", () => {
    cy.exec(
      'powershell.exe -File "userImages/generateImages.ps1" -numberOfImagesToGenerate 1'
    );
  });

  Cypress.Commands.add("createNewuser", () => {
    const name = faker.person.firstName();
    const surname = faker.person.lastName();
    cy.goToProfileSetting(name, surname);
    cy.createUserImage();
    cy.get("input[type=file]").selectFile("userImages/image1.jpg");
    cy.wait(2000);
    cy.get("#bio-textarea").type(faker.lorem.sentence(10));
    cy.get('[data-testid="resgister-profile-submit-button"]').click();
    cy.wait(1000);
    cy.get("input[name=email]").should("be.visible");
  });
  // #endregion

  Cypress.Commands.add("loginWithUser", (userEmail) => {
    cy.get("input[name=email]").type(userEmail);
    cy.get("input[name=password]").type(userPassword);
    cy.get('[data-testid="submit-button"]').click();
    cy.wait(2000);
    cy.url().should("include", "/chatPage");
  });

  Cypress.Commands.add("logout", () => {
    cy.get("#logoutButton").click();
    cy.wait(1000);
    cy.url().should("equal", "http://localhost:3000/");
  });
  Cypress.Commands.add("openChatWithMatchedUser", () => {
    cy.get(".accordion-body > :nth-child(1) #openChatButton").click();
    cy.wait(2000);
    cy.get(".chatBox").should("exist");
  });

  Cypress.Commands.add("sendMessage", () => {
    const message = "Hello, how are you?";
    cy.openChatWithMatchedUser();
    cy.get("textarea").type(message);
    cy.get("#sendButton").click();
    cy.wait(2000);
    cy.get(".chatMessages > :last-child").should("contain", message);
  });

  Cypress.Commands.add("matchEveryoneWithFirst", () => {
    for (let i = 2; i < users.length; i++) {
      cy.loginWithUser(users[i].email);
      cy.get("#likeButton").click();
      cy.wait(2000);
      cy.logout();
      cy.wait(2000);
    }
  });

  Cypress.Commands.add("chatWithOneAndDislikeOne", () => {
    cy.get("#likeButton").click();
    cy.wait(2000);
    cy.get("#dislikeButton").click();
    cy.sendMessage();
  });

  Cypress.Commands.add("likeEveryone", () => {
    cy.loginWithUser(users[0].email);
    for (let i = 1; i < users.length; i++) {
      cy.get("#likeButton").click();
      cy.wait(2000);
    }
  });

  it("Create users", () => {
    for (let i = 0; i < NUMBER_OF_USERS; i++) {
      cy.createNewuser();
    }
  });

  it("Set Initial Database", () => {
    if (users.length === NUMBER_OF_USERS) {
      cy.likeEveryone();
      cy.logout();
      cy.loginWithUser(users[1].email);
      cy.chatWithOneAndDislikeOne();
      cy.logout();
      cy.loginWithUser(users[0].email);
      cy.openChatWithMatchedUser();
      cy.sendMessage();
      cy.logout();
      cy.matchEveryoneWithFirst();
    }
  });
});
