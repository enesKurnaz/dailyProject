describe("Login Formu Testleri", () => {
  const BASE_URL = "http://localhost:5173";

  beforeEach(() => {
    cy.visit(BASE_URL);
  });

  it("a) Başarılı form doldurulduğunda submit edebiliyorum ve success sayfasını açabiliyorum", () => {
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("StrongPass1!");
    cy.get('input[name="terms"]').check();

    cy.get('button[type="submit"]').should("not.be.disabled").click();

    cy.url().should("include", "/success");
    cy.contains("Giriş Başarılı!").should("be.visible");
  });

  it("b.1) Email yanlış girildiğinde 1 hata mesajı görünür, doğru mesaj çıkar ve buton disabled kalır", () => {
    cy.get('input[name="email"]').type("hatali-email");

    cy.get(".error-message").should("have.length", 1);
    cy.get('[data-cy="error-email"]')
      .should("be.visible")
      .and("contain.text", "Geçerli bir email adresi giriniz.");
    cy.get('button[type="submit"]').should("be.disabled");
  });

  it("b.2) Email ve password yanlış girildiğinde 2 hata mesajı görünür ve password hata mesajı ekrandadır", () => {
    cy.get('input[name="email"]').type("hatali-email");
    cy.get('input[name="password"]').type("zayif");

    cy.get(".error-message").should("have.length", 2);
    cy.get('[data-cy="error-password"]')
      .should("be.visible")
      .and(
        "contain.text",
        "Şifre en az 8 karakter olmalı; büyük harf, küçük harf, rakam ve özel karakter içermelidir."
      );
    cy.get('button[type="submit"]').should("be.disabled");
  });

  it("b.3) Email ve password doğru ama kurallar kabul edilmediyse buton disabled kalır", () => {
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("StrongPass1!");

    cy.get('button[type="submit"]').should("be.disabled");
  });
});