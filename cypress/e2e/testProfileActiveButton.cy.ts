describe('Test Profile Page', () => {
    beforeEach(() => {
      // Mở trang hồ sơ
      cy.visit('http://localhost:8100/tabs/profile');
      cy.wait(2000); // Chờ trang tải
    });
  
    it('Hiển thị thông tin người dùng', () => {
      cy.wait(2000)
    });
  
    it('Nhấn vào nút "Chỉnh sửa thông tin"', () => {
      cy.get('ion-item').contains('Chỉnh sửa thông tin').click();
      cy.url().should('include', '/tabs/profile/info'); // Kiểm tra URL
      cy.wait(2000)
    });
  
    it('Nhấn vào nút "Lịch sử đơn hàng"', () => {
      cy.get('ion-item').contains('Lịch sử đơn hàng').click();
      cy.url().should('include', '/billing-history'); // Kiểm tra URL
      cy.wait(2000)
    });
  
    it('Nhấn vào nút "Đăng xuất"', () => {
      cy.get('ion-button').contains('Đăng xuất').click();
      cy.wait(2000)
  
      // Kiểm tra thông báo đăng xuất
      cy.on('window:alert', (txt) => {
        expect(txt).to.contains('Signed out successfully'); // Kiểm tra thông báo
      });
  
      cy.url().should('include', '/login'); // Kiểm tra điều hướng
    });
  });
  