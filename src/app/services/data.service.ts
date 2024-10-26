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
        change.map(c=>({key:c.payload.key,...c.payload.val()as object}))
      )
    );
  }
}
