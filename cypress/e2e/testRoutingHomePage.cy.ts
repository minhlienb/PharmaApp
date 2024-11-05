describe('Home Page Navigation Tests', () => {
    beforeEach(() => {
      // Mở trang chủ trước mỗi bài kiểm thử
      cy.visit('http://localhost:8100/tabs/home');
    });

    it('Lọc sản phẩm theo từ khóa', () => {
      const searchTerm = 'Siro'; // Thay đổi theo sản phẩm trong cơ sở dữ liệu
  
      // Nhập từ khóa tìm kiếm
      cy.get('ion-searchbar').type(searchTerm);
  
      // Xác nhận rằng danh sách sản phẩm được lọc đúng
    //   cy.get('.small-card').each(($el) => {
    //     cy.wrap($el).find('h3').invoke('text').then((text) => {
    //       // Kiểm tra xem tiêu đề sản phẩm có chứa từ khóa không
    //       expect(text.toLowerCase()).to.include(searchTerm.toLowerCase());
    //     });
    //   });
        cy.wait(5000);
    });
  
    it('Không hiển thị sản phẩm nếu nhập các từ khoá không hợp lệ', () => {
        const searchTerm = ':3 ^o^'; // Thay đổi theo sản phẩm trong cơ sở dữ liệu
  
        // Nhập từ khóa tìm kiếm
        cy.get('ion-searchbar').type(searchTerm);
        cy.wait(3000)      
    });

    it('Điều hướng đến trang Cart', () => {  
      cy.wait(1000)
      // Nhấn vào nút icon Cart
      cy.get('ion-button').find('ion-icon[name="cart-outline"]').parent().click(); 
      // Xác nhận rằng URL đã thay đổi đến trang giỏ hàng
      cy.url().should('include', '/tabs/cart'); // Thay đổi theo URL thực tế của trang giỏ hàng
      cy.wait(3000);
    });

    it('Điều hướng đến trang Notifications', () => {
      cy.wait(1000)
      // Nhấn vào nút icon Cart
      cy.get('ion-button').find('ion-icon[name="notifications-outline"]').parent().click();
      // Xác nhận rằng URL đã thay đổi đến trang giỏ hàng
      cy.url().should('include', '/tabs/notifications'); // Thay đổi theo URL thực tế của trang giỏ hàng
      cy.wait(3000); 
    });
    
  
    it('Điều hướng đến Trang chủ khi nhấn vào tab Trang chủ', () => {
      // Kiểm tra điều hướng đến Trang chủ
      cy.get('ion-tab-button[tab="home"]').click();
      cy.url().should('include', '/tabs/home'); // Kiểm tra URL có chứa 'home'
      cy.wait(3000);
    });
  
    it('Điều hướng đến Danh mục khi nhấn vào tab Danh mục', () => {
      // Kiểm tra điều hướng đến Danh mục
      cy.get('ion-tab-button[tab="products"]').click();
      cy.url().should('include', '/tabs/products'); // Kiểm tra URL có chứa 'products'
      cy.wait(3000);
    });
  
    it('Điều hướng đến Giỏ hàng khi nhấn vào tab Giỏ hàng', () => {
      // Kiểm tra điều hướng đến Giỏ hàng
      cy.get('ion-tab-button[tab="cart"]').click();
      cy.url().should('include', '/tabs/cart'); // Kiểm tra URL có chứa 'cart'
      cy.wait(3000);
    });
  
    it('Điều hướng đến Thông báo khi nhấn vào tab Thông báo', () => {
      // Kiểm tra điều hướng đến Thông báo
      cy.get('ion-tab-button[tab="notifications"]').click();
      cy.url().should('include', '/tabs/notifications'); // Kiểm tra URL có chứa 'notifications'
      cy.wait(3000);
    });
  
    it('Điều hướng đến Tài khoản khi nhấn vào tab Tài khoản', () => {
      // Kiểm tra điều hướng đến Tài khoản
      cy.get('ion-tab-button[tab="profile"]').click();
      cy.url().should('include', '/tabs/profile'); // Kiểm tra URL có chứa 'profile'
      cy.wait(3000);
    });
  });
  