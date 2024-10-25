import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private db: AngularFireDatabase) {}

  getProducts(): Observable<any[]> {
    return this.db.list('products').valueChanges();
  }
}
