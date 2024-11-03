import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Title } from '@angular/platform-browser';
import { key } from 'ionicons/icons';
import { map, Observable } from 'rxjs';
interface NotificationData {
  status: boolean; // Đảm bảo là boolean
  newNotification: boolean; // Đảm bảo là boolean
}

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private db: AngularFireDatabase) {
  }

  getProducts(): Observable<any[]> {
    return this.db.list('products').snapshotChanges().pipe(
      map(change=>
        change.map(c=>(
          {
            key:c.payload.key,
            ...c.payload.val()as object
          }
        ))
      )
    );
  }
  getProductsByCate(categoriId:string):Observable<any[]>{
    return this.db.list('/products',ref=>
      ref.orderByChild('categoriId').equalTo(categoriId)
    ).snapshotChanges().pipe(
      map(action=>
        action.map(a=>({
          key:a.key,
          ...a.payload.val() as object
        }))
      )
    );
  }
  getCategories():Observable<any[]>{
    return this.db.list('categories').snapshotChanges().pipe(
      map(change=>
        change.map(c=>(
          {
            key:c.payload.key,
            ...c.payload.val() as object
          }
        ))
      )
    )
  }
  
  getUserInfo(deviceId: string): Observable<any> {
    return this.db.object(`users/${deviceId}`).valueChanges().pipe(
      map((data: any) => {
        const addresses = data.address ? Object.keys(data.address).map(key => ({
          key: key,
          ...data.address[key]
        })) : [];
  
        return {
          addresses: addresses,
          telephone: data.telephone || ''
        };
      })
    );
  }

  getOrderDetails(deviceId: string): Observable<any[]> {
    return this.db.list(`/orders/${deviceId}`).snapshotChanges().pipe(
      map(change =>
        change.map(c => {
          const orderData = c.payload.val() as any;
          return {
            orderId: c.payload.key,
            address: orderData.address,
            createAt: orderData.createAt,
            totalAmount:orderData.totalAmount,
            rating:orderData?.rating,
            products: orderData.products || [],
            telephone: orderData.telephone || '',
            paid:orderData.paid,
            status:orderData.status
          };
        })
      )
    );
  }
  getOrderDetailByDeviceId(deviceId: string, orderId: string) {
    // Truy cập vào đường dẫn của đơn hàng cụ thể
    return this.db.object(`/orders/${deviceId}/${orderId}`).snapshotChanges().pipe(
      map(c => {
        const orderData = c.payload.val() as any; // Lấy dữ liệu đơn hàng
        return {
          orderId: c.payload.key,
          address: orderData?.address,
          createAt: orderData?.createAt,
          totalAmount: orderData?.totalAmount,
          rating:orderData?.rating,
          products: orderData?.products || [],
          telephone: orderData?.telephone || '',
          paid: orderData?.paid,
          status: orderData?.status
        };
      })
    );
  }
  submitRating(deviceId: string, orderId: string, rating: number): Promise<void> {
    const ratingRef = this.db.object(`/orders/${deviceId}/${orderId}`);
    return ratingRef.update({ rating: rating });
  }
  getNotificationsByDeviceId(deviceId:string):Observable<any[]>{
    return this.db.list(`notifications/${deviceId}`).snapshotChanges().pipe(
      map(change=>
        change.map(c=>({
          notificationId:c.payload.key,
          ...c.payload.val()as object
        }))
      )
    );
  }
  setNotificationsByDeviceId(deviceId:string,notificationKey:string,notificationData:object){
    this.db.object(`/notifications/${deviceId}/${notificationKey}`).set(notificationData).then(()=>{
      console.log('Đã thêm thông báo mới');
    })
    .catch((error)=>{
      console.log('Lỗi thêm thông báo');
    })
  }
  setOrderByDeviceId(deviceId: string, data: object, orderId: string): Promise<void> {
    return this.db.object(`/orders/${deviceId}/${orderId}`).set(data)
      .then(() => {
        console.log('Đã tạo đơn hàng mới');
      })
      .catch((error) => {
        console.log('Lỗi tạo đơn hàng mới: ', error);
        throw error; // Ném lỗi ra ngoài để có thể xử lý bên ngoài
      });
  }
  updateNotificationStatus(deviceId:string,notificationId:string,status:boolean,newNotification:boolean){
    this.db.object(`/notifications/${deviceId}/${notificationId}`).update(
      {
        status:status,
        newNotification:newNotification
      }
    );
  }

  checkNewNotification(deviceId:string): Observable<any[]>{
    return this.db.list(`/notifications/${deviceId}`,ref=>
      ref.orderByChild('newNotification').equalTo(true)
    ).snapshotChanges();
  }
  removeProductInCartById(deviceId:string,productId:string):Promise<void>{
    return this.db.object(`cart/${deviceId}/${productId}`).remove();
  }
  removeNotificationById(deviceId:string):Promise<void>{
    return this.db.object(`notifications/${deviceId}`).remove();
  }
}
