describe("Test Cart Active", () => {
    beforeEach(() => {
        cy.visit('http://localhost:8100/tabs/cart');
        cy.wait(2000); // Chờ trang tải
    })
    // it("Kiểm tra nút xem sản phẩm", () => {
    //     cy.get('ion-button').contains('Xem sản phẩm').click();
    //     // cy.url().should('include', '/billing-history'); // Kiểm tra URL
    //     cy.wait(1000)
    // })
})