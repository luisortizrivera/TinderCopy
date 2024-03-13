/* eslint-disable no-undef */
describe("Interactions tests", () => {
  const userEmail = "emma.brown@example.com";
  const userPassword = "P@asw0rd.";
  Cypress.Commands.add("loginWithExistingUser", () => {
    cy.visit("http://localhost:3000");
    cy.get("input[name=email]").type(userEmail);
    cy.get("input[name=password]").type(userPassword);
    cy.get('[data-testid="submit-button"]').click();
    cy.wait(1000);
    cy.url().should("include", "/chatPage");
  });

  Cypress.Commands.add("openChatWithMatchedUser", () => {
    cy.get(".accordion-body > :nth-child(1) #openChatButton").click();
    cy.wait(2000);
    cy.get(".chatBox").should("exist");
  });

  beforeEach(() => {
    cy.viewport(1024, 839);
    cy.loginWithExistingUser();
  });

  it("Like a random user", () => {
    const randomUserName = cy.get("h3").invoke("text");
    cy.get("#likeButton").click();
    cy.wait(2000);
    cy.get("h3").invoke("text").should("not.equal", randomUserName);
  });

  it("Dislike a random user", () => {
    const randomUserName = cy.get("h3").invoke("text");
    cy.get("#dislikeButton").click();
    cy.wait(2000);
    cy.get("h3").invoke("text").should("not.equal", randomUserName);
  });

  it("Open matched Profile", () => {
    cy.get(".accordion-body > :nth-child(1) #openProfileButton").then(
      ($button) => {
        const matchedUserName = $button.text();
        cy.get(".accordion-body > :nth-child(1) #openProfileButton").click();
        cy.wait(2000);
        cy.get("h3").invoke("text").should("contain", matchedUserName);
      }
    );
  });

  it("Open chat with a matched user", () => {
    cy.openChatWithMatchedUser();
  });

  it("Send message", () => {
    const message = "Hello, how are you?";
    cy.openChatWithMatchedUser();
    cy.get("textarea").type(message);
    cy.get("#sendButton").click();
    cy.wait(1000);
    cy.get(".chatMessages > :last-child").should("contain", message);
  });

  it("Logout", () => {
    cy.get("#logoutButton").click();
    cy.wait(1000);
    cy.url().should("equal", "http://localhost:3000/");
  });
});
