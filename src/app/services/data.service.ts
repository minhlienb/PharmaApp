import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private db: AngularFireDatabase) {}

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
  getNotificationsByDeviceId(deviceId:string):Observable<any[]>{
    return this.db.list(`/notifications/${deviceId}`).snapshotChanges().pipe(
      map(change=>
        change.map(c=>({
          notificationId:c.payload.key,
          ...c.payload.val()as object
        }))
      )
    );
  }
  getUserInfo(deviceId: string): Observable<any> {
    return this.db.object(`users/${deviceId}`).valueChanges().pipe(
      map((data: any) => ({
        addresses: data.address ? Object.keys(data.address).map(key => ({
          key: key,
          ...data.address[key]
        })) : [],
        telephone: data.telephone || ''
      }))
    );
  }

  updateNotificationStatus(deviceId:string,notificationId:string,status:boolean){
    this.db.object(`/notifications/${deviceId}/${notificationId}`).update({status:status});
  }

  checkNewNotification(deviceId:string): Observable<any[]>{
    return this.db.list(`/notifications/${deviceId}`,ref=>
      ref.orderByChild('status').equalTo(false)
    ).snapshotChanges();
  }
  setOrderById(deviceId:string,Data:object){
    
  }
}
