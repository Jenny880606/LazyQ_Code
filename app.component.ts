import { Component } from '@angular/core';
import { AlertController,MenuController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../app/user.service';
import { Router } from '@angular/router'
import { HomePage } from './home/home.page';


//import { MenuController } from '@ionic/angular';




@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public appPages = [
    {
      title: '',
      url: '/money',
      icon: 'home'
    }/*,
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'book',
      url: '/booking',
      icon: 'list'
    }*/

  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public afstore: AngularFirestore,
    public alertController: AlertController,
    public user: UserService,
    public router: Router,
    public menu: MenuController,
    public home:HomePage
    
  ) {
    this.initializeApp();
   
  }

  logout(){
    this.menu.close()
    document.getElementById("menu").setAttribute("disabled", "true")
    this.router.navigate(['/login'])
  }

  
  initializeApp() {
    
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  menuclose() {
    close()
  }
  ngOnInit() {
    
  }
  menuisopen() {
    var username = this.user.getUsername();
    //console.log(username)
  
    var docRef_U = this.afstore.collection("user")
    docRef_U.doc(username).get().subscribe(function (doc) {
      console.log(username)
      var cash = doc.get("money")
      var alert=doc.get("alert")
      var floor=doc.get("floor")
      if (alert==0)
      {
        alert="Yes"
      }
      else
      {
        alert="NO"
      }
      document.getElementById("cash").innerHTML = "$ " + cash
      document.getElementById("userID").innerHTML = username;
      document.getElementById("alert").setAttribute("placeholder",alert)
      document.getElementById("perfer").setAttribute("placeholder",floor+"F")
    })
  }

  ngOnChanges() {

  }
  alertchoose($event) {
    console.log($event.target.value)
    var username = this.user.getUsername();
    var docRef_U = this.afstore.collection("user").doc(username)
    docRef_U.get().subscribe(function(doc){
      var wash = doc.get("washer")
      var dry = doc.get("dryer")
      var alert = doc.get("alert")
      var floor = doc.get("floor")
      var money =doc.get("money")

      alert=$event.target.value;
      docRef_U.set({
        alert:alert,
        dryer:dry,
        floor:floor,
        money:money,
        washer:wash
      }).then(() => {
        document.getElementById("alert").setAttribute("placeholder",alert)
      });
    })
  }
  perferchoose($event) {
    console.log($event.target.value)
    this.home.changefloor($event.target.value)
    var username = this.user.getUsername();
    var docRef_U = this.afstore.collection("user").doc(username)
    docRef_U.get().subscribe(function(doc){
      var wash = doc.get("washer")
      var dry = doc.get("dryer")
      var alert = doc.get("alert")
      var floor = doc.get("floor")
      var money =doc.get("money")

      floor=$event.target.value;
      
      docRef_U.set({
        alert:alert,
        dryer:dry,
        floor:floor,
        money:money,
        washer:wash
      }).then(() => {
        document.getElementById("perfer").setAttribute("placeholder",floor+"F")
        
      });
    })
  }
}


export function controlmenu(state:string){
  document.getElementById("menu").setAttribute("disabled", state)
}
