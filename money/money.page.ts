import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { AlertController } from '@ionic/angular';
import { UserService } from '../user.service';



@Component({
  selector: 'app-money',
  templateUrl: './money.page.html',
  styleUrls: ['./money.page.scss'],
})
export class MoneyPage implements OnInit {

  constructor(
    public afstore: AngularFirestore,
    public alertController: AlertController,
    public user: UserService


  ) { }

  ngOnInit() {
  }
  cash = 0
  goback() {
    this.cash = 0
    document.getElementById("addM").innerHTML = "$ 0"
    document.getElementById("okgo").setAttribute("color", "light")
    document.getElementById("okgo").setAttribute("disabled", "true")

  }
  add10() {
    this.cash += 10
    document.getElementById("addM").innerHTML = "$ " + this.cash
    document.getElementById("okgo").setAttribute("color", "primary")
    document.getElementById("okgo").setAttribute("disabled", "false")

  }
  add100() {
    this.cash += 100
    document.getElementById("addM").innerHTML = "$ " + this.cash
    document.getElementById("okgo").setAttribute("color", "primary")
    document.getElementById("okgo").setAttribute("disabled", "false")

  }
  add500() {
    this.cash += 500
    document.getElementById("addM").innerHTML = "$ " + this.cash
    document.getElementById("okgo").setAttribute("color", "primary")
    document.getElementById("okgo").setAttribute("disabled", "false")


  }
  oktoadd() {
    //寫入檔案

    var username = this.user.getUsername();
    var buf = document.getElementById("addM").innerHTML
    var MM = this.cash;
    var docRef_U = this.afstore.collection("user").doc(username)
    console.log(username)

    docRef_U.get().subscribe(function (doc) {
      var wash = doc.get("washer")
      var dry = doc.get("dryer")
      var alert = doc.get("alert")
      var floor = doc.get("floor")
      var money = doc.get("money")

      money += MM

      console.log(MM)
      console.log(money)
      docRef_U.set({
        alert: alert,
        dryer: dry,
        floor: floor,
        money: money,
        washer: wash
      }).then(() => {
        document.getElementById("nowM").innerHTML = "$ " + money
        presentAlert()

      });


    })


    this.cash = 0
    document.getElementById("addM").innerHTML = "$ 0"
    document.getElementById("okgo").setAttribute("color", "light")
    document.getElementById("okgo").setAttribute("disabled", "true")


  }
  ionViewWillEnter() {
    var username = this.user.getUsername();
    var docRef_U = this.afstore.collection("user")
    docRef_U.doc(username).get().subscribe(function (doc) {
      var cash = doc.get("money")
      document.getElementById("nowM").innerHTML = "$ " + cash
    })



  }


}


function presentAlert() {
  const alert = document.createElement('ion-alert');
  alert.header = '通知';
  alert.subHeader = '';
  alert.message = '加值成功';
  alert.buttons = [{
    text: 'Ok',
    handler: () => {
      console.log('Confirm Okay')
      history.go(-1)
    }
  }];
  document.body.appendChild(alert);
  return alert.present();
}
