import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { UserService } from '../user.service';
import { Router } from '@angular/router'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = ""
  password: string = ""
  constructor(public afAuth: AngularFireAuth, public user: UserService, public router: Router,
    public alertController: AlertController
    ) { }

  ngOnInit() {
  }
async login() {
    const { username, password } = this
    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(username + '@lazyq.com', password);
      if (res.user) {
        this.user.setUser({
          username,
          uid: res.user.uid
        })
        this.router.navigate(['/home'])
      }
    } catch (err) {
      console.dir(err)
      if (err.code == "auth/user-not-found") {
        console.log("user not found") 
      }
      this.presentAlert()
    }
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      header: '帳號密碼錯誤',
      message: '請在重新輸入一次',
      buttons: ['OK']
    });

    await alert.present();
  }
}
