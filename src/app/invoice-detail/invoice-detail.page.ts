import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.page.html',
  styleUrls: ['./invoice-detail.page.scss'],
})

export class InvoiceDetailPage {
  order = {
    danhGia: 0,
    hoaDon: "9da2bf7c-979f-484b-a2a6-bba8eee953d3",
    ngayMua: "3/11/2024",
    products: [
      {
        category: "Drug",
        name: "Viên uống Pikolin Ocavill hỗ trợ tăng tuần hoàn máu não",
        price: 100000,
        product: "productId_01",
        quantity: 1,
      },
      {
        category: "Drug",
        name: "Viên uống Omexxel Ginkgo 120 Premium Omexxel hỗ trợ trí nhớ",
        price: 120000,
        product: "productId_02",
        quantity: 1,
      }
    ],
    thanhTien: 220000,
  };


  reoder(/** params*/) {
    console.log('Mua lại hóa đơn');
  }
}

