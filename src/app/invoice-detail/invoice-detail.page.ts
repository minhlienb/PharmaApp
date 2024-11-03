import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.page.html',
  styleUrls: ['./invoice-detail.page.scss'],
})
export class InvoiceDetailPage implements OnInit {
  order: any;
  deviceId: string='';

  constructor(private route: ActivatedRoute, private db: DataService, private router: Router) {

  }

  ngOnInit() {
    // Lấy orderId từ tham số route
    const orderId = this.route.snapshot.paramMap.get('id');

    // Giả sử deviceId đã được lưu trong localStorage hoặc bạn có cách nào đó để lấy nó
    this.deviceId = localStorage.getItem('deviceId') || ''; // Hoặc cách lấy deviceId khác

    if (orderId && this.deviceId) {
      // Gọi dịch vụ để lấy thông tin hóa đơn bằng getOrderDetailByDeviceId
      this.db.getOrderDetailByDeviceId(this.deviceId, orderId).subscribe(
        data => {
          this.order = data; // Gán dữ liệu hóa đơn cho biến order
          console.log('Order data:', this.order); // Kiểm tra dữ liệu
        },
        error => {
          console.error('Error fetching order details:', error);
        }
      );
    } else {
      console.error('No order ID or device ID provided');
    }
  }

  reorder(order: any) {
    // Kiểm tra xem order có chứa sản phẩm không
    if (!order.products || order.products.length === 0) {
      console.error('Không có sản phẩm trong đơn hàng:', order);
      return; // Dừng lại nếu không có sản phẩm
    }

    const selectedProducts = order.products; // Lấy danh sách sản phẩm từ đơn hàng
    const totalAmount = order.thanhTien; // Lấy tổng số tiền từ đơn hàng

    console.log('Selected Products:', selectedProducts); // Kiểm tra sản phẩm được chọn
    console.log('Total Amount:', totalAmount); // Kiểm tra tổng giá trị

    // Điều hướng đến trang order-confirmation với các tham số đã chọn
    this.router.navigate(['/order-confirmation'], {
      queryParams: {
        products: JSON.stringify(selectedProducts), // Chuyển đổi danh sách sản phẩm thành chuỗi JSON
        totalAmount: totalAmount // Sử dụng tổng số tiền
      }
    });
  }
}
