import { Injectable } from '@angular/core';
import { Database, ref, get, child } from '@angular/fire/database';
@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private db: Database) { }

  async getList() {
    const dbRef = ref(this.db);
    try {
      const snapshot = await get(child(dbRef, 'products'));
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log('No data available');
        return null;
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      return null;
    }
  }
}
