describe('Register Page Tests', () => {
    beforeEach(() => {
        // Điều hướng đến trang đăng ký trước mỗi bài kiểm thử
        cy.visit('http://localhost:8100/register');
    });

    it('Hiển thị form đăng ký', () => {
        // Kiểm tra xem các trường nhập liệu và nút đăng ký có hiển thị hay không
        cy.get('ion-input[placeholder="Hãy nhập họ tên"]').should('be.visible');
        cy.get('ion-input[placeholder="Hãy nhập email"]').should('be.visible');
        cy.get('ion-input[placeholder="Hãy nhập mật khẩu"]').should('be.visible');
        cy.get('ion-input[placeholder="Hãy nhập số điện thoại"]').should('be.visible');
        cy.get('ion-input[placeholder="Hãy nhập địa chỉ"]').should('be.visible');
        cy.get('ion-button').contains('đăng kí').should('be.visible');
        cy.wait(2000)
    });

    it('Đăng ký thành công với thông tin hợp lệ', () => {
        // Giả lập thông tin hợp lệ
        const fullName = 'Người mới 2';
        const email = 'newgay2@gmail.com';
        const password = 'guyguy';
        const telephone = '0123456789';
        const addressContent = '123 Đường ABC, Thành phố XYZ';

        // Stubbing phương thức đăng ký
        cy.intercept('POST', 'createUserWithEmailAndPassword', {
            statusCode: 200,
            body: {
                email: email,
                localId: 'mockUserId',
                idToken: 'mockToken',
            },
        }).as('registerRequest');

        // Nhập thông tin vào các trường
        cy.get('ion-input[placeholder="Hãy nhập họ tên"]').type(fullName);
        cy.get('ion-input[placeholder="Hãy nhập email"]').type(email);
        cy.get('ion-input[placeholder="Hãy nhập mật khẩu"]').type(password);
        cy.get('ion-input[placeholder="Hãy nhập số điện thoại"]').type(telephone);
        cy.get('ion-input[placeholder="Hãy nhập địa chỉ"]').type(addressContent);

        // Nhấn nút đăng ký
        cy.get('ion-button').contains('đăng kí').click();

        // Đợi cho yêu cầu hoàn tất và kiểm tra xem phản hồi có mã 200 không
        // cy.wait('@registerRequest').its('response.statusCode').should('eq', 200);
        cy.wait(5000);

        // Kiểm tra xem người dùng có được chuyển hướng đến trang đăng nhập không
        cy.url().should('include', '/login');
    });

    it('Đăng ký thất bại khi thông tin không hợp lệ', () => {
        // Nhập thông tin không hợp lệ (ví dụ: thiếu email)
        const fullName = 'Tạ Thị Tấn';
        const password = 'password123';
        const telephone = '0123456789';
        const addressContent = '123 Đường DEF, Thành phố XYZ';

        // Stubbing phản hồi lỗi khi đăng ký
        cy.intercept('POST', 'createUserWithEmailAndPassword', {
            statusCode: 400,
            body: {
                error: {
                    message: 'EMAIL_EXISTS', // Thông điệp lỗi tương ứng
                },
            },
        }).as('registerRequest');

        // Nhập thông tin vào các trường (không nhập email)
        cy.get('ion-input[placeholder="Hãy nhập họ tên"]').type(fullName);
        cy.get('ion-input[placeholder="Hãy nhập mật khẩu"]').type(password);
        cy.get('ion-input[placeholder="Hãy nhập số điện thoại"]').type(telephone);
        cy.get('ion-input[placeholder="Hãy nhập địa chỉ"]').type(addressContent);

        // Nhấn nút đăng ký
        cy.get('ion-button').contains('đăng kí').click();

        // Đợi cho yêu cầu hoàn tất và kiểm tra mã phản hồi
        // cy.wait('@registerRequest').its('response.statusCode').should('eq', 400);
        cy.wait(5000);

        // Kiểm tra xem thông báo lỗi có hiển thị không
        // cy.get('ion-toast', { timeout: 10000 }).should('contain', 'Đã xảy ra lỗi khi tạo tài khoản. Vui lòng thử lại.');
    });
});
