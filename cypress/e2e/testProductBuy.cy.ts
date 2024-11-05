describe('Test Buy Product', () => {
    it('Nhấn vào sản phẩm và thêm vào giỏ hàng', () => {
      // Mở trang chủ
      cy.visit('http://localhost:8100/tabs/home');
      cy.wait(2000);
  
      // Nhấn vào sản phẩm đầu tiên trong danh sách sản phẩm
      cy.get('.small-card').first().click(); // Chọn sản phẩm đầu tiên
      cy.wait(1000)
  
      // Đảm bảo rằng đang ở trang chi tiết sản phẩm
      cy.url().should('include', '/product-detail-page/');
      
      // Kiểm tra sự tồn tại của tiêu đề sản phẩm
      cy.get('ion-card-title').should('exist'); 
      cy.get('.current-price').should('exist'); // Kiểm tra giá sản phẩm
  
      // Nhấn nút "Mua" để thêm sản phẩm vào giỏ hàng
      cy.get('ion-button').contains('Mua').should('be.visible').click();
  
      // Kiểm tra thông báo thành công
      cy.on('window:alert', (txt) => {
        expect(txt).to.contains('Đã thêm vào giỏ hàng!'); // Kiểm tra thông báo
      });
    });
  });
  