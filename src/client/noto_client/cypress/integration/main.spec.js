describe("Basic", () => {
  it("login redirect", () => {
    cy.visit("http://localhost:3000");
    cy.url().should("match", "/login");
  });
});
