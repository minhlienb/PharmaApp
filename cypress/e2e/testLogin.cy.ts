describe('Login Page Tests', () => {
    beforeEach(() => {
      // Chuyển hướng đến trang đăng nhập
      cy.visit('http://localhost:8100/login');
    });

    it('Hiển thị form đăng nhập', () => {
        // Check if email and password inputs and login button are visible
        cy.get('ion-input[type="email"]').should('be.visible');
        cy.get('ion-input[type="password"]').should('be.visible');
        cy.get('ion-button').contains('Đăng nhập').should('be.visible');

        cy.wait(2000)
      });
  
    it('Đăng nhập thành công với thông tin đã đăng ký', () => {
      // Giả lập yêu cầu đăng nhập với tài khoản đã đăng ký
      const email = 'dailoc@gmail.com';
      const password = 'dailoc';

      cy.intercept('POST', '/login', {
        statusCode: 200,
        body: {
          user: { uid: '12345', email: email },
          token: 'mockToken',
        },
      }).as('loginRequest');
  
      cy.get('ion-input[type="email"]').type(email);
      cy.get('ion-input[type="password"]').type(password);
      cy.get('ion-button').contains('Đăng nhập').click();
  
      // Đợi
    //   cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);
    cy.wait(5000)
      
      // Kiểm tra chuyển hướng đến trang chủ nếu đăng nhập thành công
      cy.url().should('include', 'tabs/home');
    });
  
    it('Đăng nhập thất bại khi nhập thông tin chưa được đăng ký', () => {
      // Giả lập yêu cầu đăng nhập với thông tin chưa đăng ký
      const email = 'invalid@example.com';
      const password = 'invalidPassword';
  
      cy.intercept('POST', '/login', {
        statusCode: 401,
        body: {
          error: 'Incorrect email or password',
        },
      }).as('loginRequest');
  
      cy.get('ion-input[type="email"]').type(email);
      cy.get('ion-input[type="password"]').type(password);
      cy.get('ion-button').contains('Đăng nhập').click();
  
      // Đợi
    //   cy.wait('@loginRequest').its('response.statusCode').should('eq', 401);
    cy.wait(5000)
      
      // Kiểm tra hiển thị thông báo lỗi
    //   cy.get('ion-toast', { timeout: 10000 }).should('be.visible');
    });
  });
  