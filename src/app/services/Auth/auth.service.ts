import { Injectable } from '@angular/core';
import { Database, ref, set, get } from '@angular/fire/database';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, authState } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { idToken } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;
  idToken$: Observable<string | null>;

  constructor(private auth: Auth, private router: Router, private toastController: ToastController, private db: Database) {
    this.user$ = authState(this.auth);
    this.idToken$ = idToken(this.auth);
  }

  async register(fullName: string, email: string, password: string, telephone: string, address: { title: string, content: string }) {
    try {
        const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
        const userId = userCredential.user.uid;

        const toast = await this.toastController.create({
            message: 'Created account successfully',
            duration: 2000,
            color: 'success',
            position: 'top'
        });

        // Tạo đối tượng dữ liệu cho người dùng
        const userData = {
            fullName: fullName,
            email: email,
            telephone: telephone,
            address: {
                [uuidv4()]: { // Tạo ID cho địa chỉ
                    title: address.title,
                    content: address.content
                }
            }
        };

        // Lưu thông tin người dùng và địa chỉ chỉ bằng một lần set
        const userRef = ref(this.db, `users/${userId}`);
        await set(userRef, userData);

        await toast.present();
        await this.router.navigate(['/login']);
    } catch (error) {
        console.error('Registration Error:', error); // Ghi lỗi ra console
        const toast = await this.toastController.create({
            message: "Đã xảy ra lỗi khi tạo tài khoản. Vui lòng thử lại.",
            duration: 2000,
            color: 'danger',
            position: 'top'
        });
        await toast.present();
    }
}



  async login(email: string, password: string): Promise<void> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
      if (user) {
        const token = await user.getIdToken();
        const toast = await this.toastController.create({
          message: "Login successful",
          duration: 2000,
          color: 'success',
          position: 'top'
        });
        await localStorage.setItem('userToken', token);
        await localStorage.setItem('userData', JSON.stringify(user));
        await localStorage.setItem('deviceId', user.uid);
        await toast.present();
        await this.router.navigate(['tabs/home']);
      }
    } catch (error) {
      const toast = await this.toastController.create({
        message: "Incorrect email or password",
        duration: 2000,
        color: 'danger',
        position: 'top'
      });
      await toast.present();
    }
  }

  logout() {
    return signOut(this.auth)
      .then(async () => {
        const toast = await this.toastController.create({
          message: 'Signed out successfully',
          duration: 2000,
          color: 'success',
          position: 'top'
        });
        await localStorage.removeItem('userToken');
        await localStorage.removeItem('userData');
        await localStorage.removeItem('deviceId');
        await toast.present();
        await this.router.navigate(['/login']);
      })
      .catch(async (err) => {
        const toast = await this.toastController.create({
          message: "Error signing out",
          duration: 2000,
          color: 'danger',
          position: 'top'
        });
        await toast.present();
      });
  }

  async getUser(uid: string): Promise<any> {
    const userRef = ref(this.db, `users/${uid}`);
    try {
      const userSnapshot = await get(userRef);
      if (userSnapshot.exists()) {
        return userSnapshot.val();
      } else {
        console.log('No data available');
        return null;
      }
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  }

  async update() {
    // Function cập nhật có thể bổ sung tại đây
  }
}
