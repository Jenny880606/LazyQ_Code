import { Component, ɵConsole } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { UserService } from '../user.service';
import { AlertController } from "@ionic/angular";

import { INT_TYPE, IfStmt } from '@angular/compiler/src/output/output_ast';
import { async } from 'q';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  WashDate: string = ""
  DryDate: string = ""
  c: any

  constructor(
    public alert: AlertController,
    public afstore: AngularFirestore,
    public user: UserService,
    
  ) { }


  changefloor(floor: any) {
    console.log(floor)
    for (let i = 1; i < 10; i++) {
      document.getElementById("w" + i).setAttribute("style", "--background:white")
      document.getElementById("d" + i).setAttribute("style", "--background:white")
    }
    document.getElementById("w" + floor).setAttribute("style", "--background:#63c0e9")
    document.getElementById("d" + floor).setAttribute("style", "--background:#93D7A5")
  }
  washdate() {
    var time = this.WashDate[11] + this.WashDate[12] + this.WashDate[13] + this.WashDate[14] + this.WashDate[15]
    for (let i = 1; i < 10; i++) {
      //console.log(i)
      var b = ""
      var docRef = this.afstore.collection("washer").doc(b + i);

      washdatechange(docRef, time)
      /*
            docRef.get().subscribe(function (doc) {
              if (doc.exists) {
                var order = doc.get("order")
                var schedule = doc.get("schedule")
                var endtime = doc.get("endtime")
                var floor = doc.get("floor")
                //console.log(floor)
                document.getElementById("wf" + floor).innerHTML = ""
                document.getElementById("wim" + floor).setAttribute("src", 'assets/img/good.png')
                if (endtime == ":") {
                  for (var x = 0; x < schedule.length; x++) {
                    console.log(floor + "in")
                    var hh = Number(schedule[x][0] + schedule[x][1])
                    var mm = Number(schedule[x][3] + schedule[x][4])
                    var nhh = Number(time[0] + time[1])
                    var nmm = Number(time[3] + time[4])
      
      
                    if (hh < 6) {
                      hh += 24
                    }
                    if (nhh < 6) {
                      nhh += 24
                    }
                    if (nhh - hh <= 0) {
                      var h = hh - nhh
                      var m = mm - nmm
                      var t = m + h * 60
                      if (t < 50) {
                        document.getElementById("wf" + floor).innerHTML = "已被預約"
                        document.getElementById("wim" + floor).setAttribute("src", 'assets/img/NoThings.png')
                        break
                      }
                      else {
                        document.getElementById("wf" + floor).innerHTML = "可以使用"
                      }
                    }
                    else {
                      document.getElementById("wf" + floor).innerHTML = "可以使用"
                    }
                  }
                  if (document.getElementById("wf" + floor).innerHTML == "")
                    document.getElementById("wf" + floor).innerHTML = "可以使用"
                }
                else {
      
                  var hh = Number(endtime[0] + endtime[1])
                  var mm = Number(endtime[3] + endtime[4])
                  var nhh = Number(time[0] + time[1])
                  var nmm = Number(time[3] + time[4])
                  //console.log(nhh+" "+nmm)
                  if (hh < 6) {
                    hh += 24
                  }
                  if (nhh < 6) {
                    nhh += 24
                  }
                  if (nhh - hh <= 0) {
      
                    var h = hh - nhh
                    var m = mm - nmm
                    var t = m + h * 60
                    if (t > 0) {
                      //console.log("in")
                      document.getElementById("wf" + floor).innerHTML = "預計等待" + t + "分鐘"
                      document.getElementById("wim" + floor).setAttribute("src", 'assets/img/NoThings.png')
      
                    }
                    else {
      
                      for (var x = 0; x < schedule.length; x++) {
                        var hh = Number(schedule[x][0] + schedule[x][1])
                        var mm = Number(schedule[x][3] + schedule[x][4])
                        var nhh = Number(time[0] + time[1])
                        var nmm = Number(time[3] + time[4])
      
                        if (hh < 6) {
                          hh += 24
                        }
                        if (nhh < 6) {
                          nhh += 24
                        }
                        if (nhh - hh <= 0) {
                          var h = hh - nhh
                          var m = mm - nmm
                          var t = m + h * 60
                          if (t < 50) {
                            document.getElementById("wf" + floor).innerHTML = "已被預約"
                            document.getElementById("wim" + floor).setAttribute("src", 'assets/img/NoThings.png')
                            break
                          }
                          else {
                            document.getElementById("wf" + floor).innerHTML = "可以使用"
                          }
                        }
                        else {
                          document.getElementById("wf" + floor).innerHTML = "可以使用"
                        }
                      }
                      if (document.getElementById("wf" + floor).innerHTML == "")
                        document.getElementById("wf" + floor).innerHTML = "可以使用"
                    }
                  }
                  else {
      
                    for (var x = 0; x < schedule.length; x++) {
                      var hh = Number(schedule[x][0] + schedule[x][1])
                      var mm = Number(schedule[x][3] + schedule[x][4])
                      var nhh = Number(time[0] + time[1])
                      var nmm = Number(time[3] + time[4])
      
                      if (hh < 6) {
                        hh += 24
                      }
                      if (nhh < 6) {
                        nhh += 24
                      }
                      if (nhh - hh <= 0) {
                        var h = hh - nhh
                        var m = mm - nmm
                        var t = m + h * 60
                        if (t < 50) {
                          document.getElementById("wf" + floor).innerHTML = "已被預約"
                          document.getElementById("wim" + floor).setAttribute("src", 'assets/img/NoThings.png')
                          break
                        }
                        else {
                          document.getElementById("wf" + floor).innerHTML = "可以使用"
                        }
                      }
                      else {
                        document.getElementById("wf" + floor).innerHTML = "可以使用"
                      }
                    }
                    if (document.getElementById("wf" + floor).innerHTML == "")
                      document.getElementById("wf" + floor).innerHTML = "可以使用"
                  }
                }
      
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
              }
            })
            */
    }



  }

  drydate() {
    var time = this.DryDate[11] + this.DryDate[12] + this.DryDate[13] + this.DryDate[14] + this.DryDate[15]
    for (let i = 1; i < 10; i++) {
      //console.log(i)
      var b = ""
      var docRef = this.afstore.collection("dryer").doc(b + i);
      drydatechange(docRef, time)
      /*
            docRef.get().subscribe(function (doc) {
              if (doc.exists) {
                var order = doc.get("order")
                var schedule = doc.get("schedule")
                var endtime = doc.get("endtime")
                var floor = doc.get("floor")
                document.getElementById("df" + floor).innerHTML = ""
                document.getElementById("dim" + floor).setAttribute("src", 'assets/img/good_G.png')
                if (endtime == ":") {
                  for (var x = 0; x < schedule.length; x++) {
                    var hh = Number(schedule[x][0] + schedule[x][1])
                    var mm = Number(schedule[x][3] + schedule[x][4])
                    var nhh = Number(time[0] + time[1])
                    var nmm = Number(time[3] + time[4])
      
                    if (hh < 6) {
                      hh += 24
                    }
                    if (nhh < 6) {
                      nhh += 24
                    }
                    if (nhh - hh <= 0) {
                      var h = hh - nhh
                      var m = mm - nmm
                      var t = m + h * 60
                      if (t < 50) {
                        document.getElementById("df" + floor).innerHTML = "已被預約"
                        document.getElementById("dim" + floor).setAttribute("src", 'assets/img/NoThings.png')
                        break
                      }
                      else {
                        document.getElementById("df" + floor).innerHTML = "可以使用"
                      }
                    }
                    else {
                      document.getElementById("df" + floor).innerHTML = "可以使用"
                    }
                  }
                  if (document.getElementById("df" + floor).innerHTML == "")
                    document.getElementById("df" + floor).innerHTML = "可以使用"
                }
                else {
                  var hh = Number(endtime[0] + endtime[1])
                  var mm = Number(endtime[3] + endtime[4])
                  var nhh = Number(time[0] + time[1])
                  var nmm = Number(time[3] + time[4])
                  //console.log(floor)
      
                  if (hh < 6) {
                    hh += 24
                  }
                  if (nhh < 6) {
                    nhh += 24
                  }
                  if (nhh - hh <= 0) {
      
                    var h = hh - nhh
                    var m = mm - nmm
                    var t = m + h * 60
                    if (t > 0) {
                      //console.log("in")
                      document.getElementById("df" + floor).innerHTML = "預計等待" + t + "分鐘"
                      document.getElementById("dim" + floor).setAttribute("src", 'assets/img/NoThings.png')
      
                    }
                    else {
      
                      for (var x = 0; x < schedule.length; x++) {
                        var hh = Number(schedule[x][0] + schedule[x][1])
                        var mm = Number(schedule[x][3] + schedule[x][4])
                        var nhh = Number(time[0] + time[1])
                        var nmm = Number(time[3] + time[4])
      
                        if (hh < 6) {
                          hh += 24
                        }
                        if (nhh < 6) {
                          nhh += 24
                        }
                        if (nhh - hh <= 0) {
                          var h = hh - nhh
                          var m = mm - nmm
                          var t = m + h * 60
                          if (t < 50) {
                            document.getElementById("df" + floor).innerHTML = "已被預約"
                            document.getElementById("dim" + floor).setAttribute("src", 'assets/img/NoThings.png')
                            break
                          }
                          else {
                            document.getElementById("df" + floor).innerHTML = "可以使用"
                          }
                        }
                        else {
                          document.getElementById("df" + floor).innerHTML = "可以使用"
                        }
                      }
                      if (document.getElementById("df" + floor).innerHTML == "")
                        document.getElementById("df" + floor).innerHTML = "可以使用"
                    }
                  }
                  else {
      
                    for (var x = 0; x < schedule.length; x++) {
                      var hh = Number(schedule[x][0] + schedule[x][1])
                      var mm = Number(schedule[x][3] + schedule[x][4])
                      var nhh = Number(time[0] + time[1])
                      var nmm = Number(time[3] + time[4])
      
                      if (hh < 6) {
                        hh += 24
                      }
                      if (nhh < 6) {
                        nhh += 24
                      }
                      if (nhh - hh <= 0) {
                        var h = hh - nhh
                        var m = mm - nmm
                        var t = m + h * 60
                        if (t < 50) {
                          document.getElementById("df" + floor).innerHTML = "已被預約"
                          document.getElementById("dim" + floor).setAttribute("src", 'assets/img/NoThings.png')
                          break
                        }
                        else {
                          document.getElementById("df" + floor).innerHTML = "可以使用"
                        }
                      }
                      else {
                        document.getElementById("df" + floor).innerHTML = "可以使用"
                      }
                    }
                    if (document.getElementById("df" + floor).innerHTML == "")
                      document.getElementById("df" + floor).innerHTML = "可以使用"
                  }
                }
      
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
              }
            })
      */
    }

  }



  again() {
    if (this.WashDate != "") {
      this.washdate()
      console.log("siisisis")
    }
    if (this.DryDate != "") {
      this.drydate()
      console.log("siisisis12321")
    }
    this.ionViewWillEnter()
    }

  async presentAlert() {
    var username = this.user.getUsername();
    var docRef_D = this.afstore.collection("dryer")
    var docRef_W = this.afstore.collection("washer")
    var docRef_U = this.afstore.collection("user")

    var buf = document.getElementById("userwash_time").innerHTML
    var state = buf[0] + buf[1] + buf[2]
    var word_h = ""
    var word_sub = ""
    var word_mes = ""
    console.log(state)
    if (state == "目前無") {
      word_h = "通知"
      word_mes = "目前洗衣機都要排隊喔"

      docRef_U.doc(username).get().subscribe(function (doc) {
        var floor = doc.get("floor")
        var min = 9999;
        var at = -1;
        for (let i = 0; i < 9; i++) {
          var buf = Number(floor) + i;
          var buf2 = Number(floor) - i;

          if (buf < 10) {
            if (document.getElementById("wf" + buf).innerHTML == "可以使用") {
              at = buf
              word_sub = buf + "F 洗衣機目前可以使用"
              word_mes = "是否要開始使用?"
              break;
            }
            else if (document.getElementById("wf" + buf).innerHTML != "已被預約") {
              var waitT = "";
              for (let x = 4; x < document.getElementById("wf" + buf).innerHTML.length - 2; x++) {
                waitT += document.getElementById("wf" + buf).innerHTML[x]
              }
              console.log(document.getElementById("wf" + buf).innerHTML[4])
              var waitTT = Number(waitT);
              console.log(waitTT)
              if (waitTT < min) {
                console.log(min)
                min = waitTT
                at = buf;
              }
            }
          }
          if (buf2 > 0) {
            if (document.getElementById("wf" + buf2).innerHTML == "可以使用") {
              at = buf2
              word_sub = buf2 + "F 洗衣機目前可使用"
              word_mes = "是否要開始使用?"

              break;
            }
            else if (document.getElementById("wf" + buf2).innerHTML != "已被預約") {
              var waitT = "";
              for (let x = 4; x < document.getElementById("wf" + buf2).innerHTML.length - 2; x++) {
                waitT += document.getElementById("wf" + buf2).innerHTML[x]
              }
              var waitTT = Number(waitT);
              console.log(waitT)

              if (waitTT < min) {
                console.log(min)
                min = waitTT
                at = buf2;
              }
            }
          }
          else {
            break
          }
        }
        if (word_mes == "目前洗衣機都要排隊喔") {
          word_h = at + "F 洗衣機預計等" + min + "分鐘";
          word_mes = "是否要加入排隊?"
          presentAlertConfirm(word_h, word_mes,docRef_D,docRef_W,docRef_U,username,at)
        }
        else
        presentAlertConfirm(word_h, word_mes,docRef_D,docRef_W,docRef_U,username,at)

      })

    }
    else if (state == "已預約") {//可能動到endtime
      word_h = "通知"
      word_sub = document.getElementById("userwash_time").innerHTML
      word_mes = "要取消預約嗎??"
      const alert = await this.alert.create({
        header: word_h,
        subHeader: word_sub,
        message: word_mes,
        buttons: [
          {
            text: 'NO',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'YES',
            handler: () => {
              console.log('Confirm Okay');
              var floorat = document.getElementById("userwash_at").innerHTML[5]
              document.getElementById("userwash_at").innerHTML = "Wash"
              document.getElementById("userwash_time").innerHTML = "目前無預約跟排隊"
              docRef_U.doc(username).get().subscribe(function (doc) {
                var wash = doc.get("washer")
                var dry = doc.get("dryer")
                var alert = doc.get("alert")
                var floor = doc.get("floor")
                var money = doc.get("money")
                wash = "0"
                docRef_U.doc(username).set({
                  alert: alert,
                  dryer: dry,
                  washer: wash,
                  floor: floor,
                  money: money

                })
              })
              docRef_W.doc(floorat).get().subscribe(function (doc) {
                var endtime = doc.get("endtime")
                var floor = doc.get("floor")
                var order = doc.get("order")
                var schedule = doc.get("schedule")
                var sbuf = []
                order -= 1
                for (let i = 0; i < schedule.length; i++) {
                  var ID = ""
                  for (let x = 0; x < schedule[i].length; x++) {
                    if (x > 5 && x < schedule[i].length - 2) {
                      ID += schedule[i][x]
                    }
                  }
                  if (ID != username) {
                    sbuf.push(schedule[i])
                  }
                }
                console.log(sbuf)
                docRef_W.doc(floorat).set({
                  endtime: endtime,
                  floor: floor,
                  order: order,
                  schedule: sbuf
                })
              })

            }
          }
        ]
      });
      await alert.present();
    }
    else if (state == "可開始") {
      word_h = "通知"
      word_mes = "是否扣款開始洗衣??"
      const alert = await this.alert.create({
        header: word_h,
        subHeader: word_sub,
        message: word_mes,
        buttons: [
          {
            text: 'NO',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'YES',
            handler: () => {
              console.log('Confirm Okay');
              var nowtime = String(new Date())
              var time = nowtime[16] + nowtime[17] + nowtime[18] + nowtime[19] + nowtime[20] + "";
              var nhh = Number(time[0] + time[1])
              var nmm = Number(time[3] + time[4])
              nmm += 40 //要存結束時間還是開始時間??
              if (nmm > 60) {
                nmm -= 60
                nhh += 1
              }

              var timetoend = this.changetime(nhh, nmm)
              document.getElementById("userwash_time").innerHTML = "預計 " + timetoend + " 結束洗衣"
              var floorat = document.getElementById("userwash_at").innerHTML[5]
              docRef_U.doc(username).get().subscribe(function (doc) {
                var wash = doc.get("washer")
                var dry = doc.get("dryer")
                var alert = doc.get("alert")
                var floor = doc.get("floor")
                var money = doc.get("money")
                wash = "3 " + floorat + " " + timetoend //is washing
                console.log(wash)
                docRef_U.doc(username).set({
                  alert: alert,
                  dryer: dry,
                  washer: wash,
                  floor: floor,
                  money: money

                })
              })
            }
          }
        ]
      });
      await alert.present();
    }
    else if (state == "預計等") {//可能動到endtime
      word_h = "通知"
      word_sub = "目前" + document.getElementById("userwash_time").innerHTML
      word_mes = "要取消排隊ㄇ??"
      const alert = await this.alert.create({
        header: word_h,
        subHeader: word_sub,
        message: word_mes,
        buttons: [
          {
            text: 'NO',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'YES',
            handler: () => {
              console.log('Confirm Okay');
              var floorat = document.getElementById("userwash_at").innerHTML[5]
              document.getElementById("userwash_at").innerHTML = "Wash"
              document.getElementById("userwash_time").innerHTML = "目前無預約跟排隊"
              docRef_U.doc(username).get().subscribe(function (doc) {
                var wash = doc.get("washer")
                var dry = doc.get("dryer")
                var alert = doc.get("alert")
                var floor = doc.get("floor")
                var money = doc.get("money")
                wash = "0"
                docRef_U.doc(username).set({
                  alert: alert,
                  dryer: dry,
                  washer: wash,
                  floor: floor,
                  money: money

                })
              })
              docRef_W.doc(floorat).get().subscribe(function (doc) {
                var endtime = doc.get("endtime")
                var floor = doc.get("floor")
                var order = doc.get("order")
                var schedule = doc.get("schedule")
                var sbuf = []

                for (let i = 0; i < schedule.length; i++) {
                  var ID = ""
                  for (let x = 0; x < schedule[i].length; x++) {
                    if (x > 5 && x < schedule[i].length - 2) {
                      ID += schedule[i][x]
                    }
                  }
                  if (ID != username) {
                    sbuf.push(schedule[i])
                  }
                }
                console.log(sbuf)
                docRef_W.doc(floorat).set({
                  endtime: endtime,
                  floor: floor,
                  order: order,
                  schedule: sbuf
                })
              })

            }
          }
        ]
      });
      await alert.present();
    }
    else if (buf[0] + buf[1] == "完成") {//可能要刪除schedule的東西
      word_h = "通知"
      word_mes = "可以拿衣服囉~!"
      const alert = await this.alert.create({
        header: word_h,
        subHeader: word_sub,
        message: word_mes,
        buttons: [
          {
            text: 'Okay',
            handler: () => {
              console.log('Confirm Okay');
              document.getElementById("userwash_time").innerHTML = "目前無預約跟排隊"
              document.getElementById("userwash_at").innerHTML = "Wash"
              docRef_U.doc(username).get().subscribe(function (doc) {
                var wash = doc.get("washer")
                var dry = doc.get("dryer")
                var alert = doc.get("alert")
                var floor = doc.get("floor")
                var money = doc.get("money")
                wash = "0" //is washing
                console.log(wash)
                docRef_U.doc(username).set({
                  alert: alert,
                  dryer: dry,
                  washer: wash,
                  floor: floor,
                  money: money

                })
              })
            }
          }
        ]
      });
      await alert.present();
    }



  }

  ionViewDidEnter(){
    import('../app.component').then(module => {
      module.controlmenu("false")
    })
  }

  ionViewWillEnter() {
    /*
    import('../app.component').then(module => {
      module.controlmenu("false")
    })*/
    
    
    var docRef12 = this.afstore.collection("user").doc(this.user.getUsername());
    docRef12.get().subscribe(function (doc) {
      if (doc.exists) {
        document.getElementById("M").innerHTML = doc.get("money")
        document.getElementById("W").innerHTML = doc.get("washer")[0]
        document.getElementById("D").innerHTML = doc.get("dryer")[0]
      }
    })

    /*
    //-----------計時
        let timer = setInterval(function() { 
          console.log("in")
        }, 1000);
        */
    var username = this.user.getUsername()
    //this.user.getUsername();
    var docRef_D = this.afstore.collection("dryer")
    var docRef_W = this.afstore.collection("washer")
    var docRef_U = this.afstore.collection("user")
    Userinforamtion(docRef_U, docRef_W, docRef_D, username)


    //------------old-------------
    //console.log(time)

    for (let i = 1; i < 10; i++) {
      //console.log(i)
      var page = "wf" + i
      var b = ""
      var docRef = this.afstore.collection("washer").doc(b + i);
      Washinformation(docRef)

    }

    for (let i = 1; i < 10; i++) {
      //console.log(i)
      var page = "wf" + i
      var b = ""
      var docRef = this.afstore.collection("dryer").doc(b + i);
      dryinformation(docRef)
    }

  }

  changetime(h, m) {
    if (h < 10) {
      if (m < 10) {
        return "0" + h + ":" + "0" + m
      }
      else {
        return "0" + h + ":" + m
      }
    }
    else {
      if (m < 10) {
        return h + ":" + "0" + m
      }
      else {
        return h + ":" + m
      }
    }

  }
  /*
  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header:header,
      message:message,
      buttons: ["OK"]
    });

    await alert.present();
  }*/
  CheckOrder(floor, HHt, MMt, Machine) {
    var username = this.user.getUsername()
    //this.user.getUsername();
    var docRef_D = this.afstore.collection("dryer")
    var docRef_W = this.afstore.collection("washer")
    var docRef_U = this.afstore.collection("user")
    var wtime = ""
    var dtime = ""

    if (this.WashDate != "") {
      wtime = this.WashDate[11] + this.WashDate[12] + this.WashDate[13] + this.WashDate[14] + this.WashDate[15]

    }
    if (this.DryDate != "") {
      dtime = this.DryDate[11] + this.DryDate[12] + this.DryDate[13] + this.DryDate[14] + this.DryDate[15]
    }
//-----------------xxu


    console.log(HHt)
    console.log(MMt)
    var bbb = 0
    var docRef = this.afstore.collection(Machine).doc(floor);
    var name = this.user.getUsername()
    docRef.get().subscribe(function (doc) {
      if (doc.exists) {
        var order = doc.get("order")
        if (floor == doc.get("floor") && parseInt(order) < 3) {
          console.log("order0 " + order)
          console.log('CheckOrderCollision')
          var endtime = doc.get("endtime")
          var schedule = doc.get("schedule") //CheckOrderCollision
          this.c = 0
          if (schedule.length != 0) {
            var HHs: any
            var MMs: any
            var sss: any
            var ttt = HHt * 60 + MMt
            for (let i = 0; i < schedule.length; i++) {
              HHs = parseInt(schedule[i][0] + schedule[i][1])
              MMs = parseInt(schedule[i][3] + schedule[i][4])
              sss = HHs * 60 + MMs
              console.log(sss - ttt)
              if (Math.abs(sss - ttt) <= 50)
                this.c = 1
            }
            console.log("CheckOrderCollision")
          } //CheckOrderCollision
          if (this.c) {
            console.log("Collision!")
            presentAlert2("Collision", "Please choose other time.")
          }
          else {//insert
            bbb = 1
            console.log('insert')
            if (schedule.length == 0)
              schedule.push((HHt < 10 ? '0' : '') + HHt.toString() + ':' + (MMt < 10 ? '0' : '') + MMt.toString() + ' ' + name + " 1")
            else {
              var HHs: any
              var MMs: any
              var buf = []
              var sss: any
              var ttt = HHt * 60 + MMt
              for (let i = schedule.length - 1; i >= 0; i--) {
                HHs = parseInt(schedule[i][0] + schedule[i][1])
                MMs = parseInt(schedule[i][3] + schedule[i][4])
                sss = HHs * 60 + MMs
                if (ttt > sss) {
                  for (let j = 0; j < schedule.length; j++) {
                    buf.push(schedule[j])
                    if (i == j)
                      buf.push((HHt < 10 ? '0' : '') + HHt.toString() + ':' + (MMt < 10 ? '0' : '') + MMt.toString() + ' ' + name + " 1")
                  }
                  break
                }
                else if (i == 0 && ttt < sss) {
                  buf.push((HHt < 10 ? '0' : '') + HHt.toString() + ':' + (MMt < 10 ? '0' : '') + MMt.toString() + ' ' + name + " 1")
                  for (let j = 0; j < schedule.length; j++)
                    buf.push(schedule[j])
                  break
                }
              }
              schedule = buf
            }
            order = parseInt(order) + 1
            console.log("success!")
            presentAlert2("Success", "Wait in line.")
            docRef.set({
              endtime: endtime,
              schedule: schedule,
              floor: floor,
              order: order
            }).then(() => {
              Userinforamtion(docRef_U, docRef_W, docRef_D, username)
              Washinformation(docRef_W.doc(floor))
              dryinformation(docRef_D.doc(floor))
              if (wtime != "") {
                washdatechange(docRef_W.doc(floor), wtime)
              }
              if (dtime!="") {
                drydatechange(docRef_D.doc(floor), wtime)
              }
  
  
            });
          }//insert
          console.log('end')
        }
        else {
          presentAlert2("Failure", "Already 3 people ordered.")
        }
      } else {
        console.log("No such document!");
      }
      console.log('end1')
    })
    var docRef1 = this.afstore.collection('user').doc(this.user.getUsername());
    docRef1.get().subscribe(function (doc) {
      if (doc.exists) {
        var washer = doc.get("washer")
        var dryer = doc.get("dryer")
        var floor1 = doc.get("floor")
        var alert = doc.get("alert")
        var money = doc.get("money")
        if (Machine == 'dryer') {
          document.getElementById("D").innerHTML = '1'
          docRef1.set({
            dryer: '1 ' + floor + ' ' + (HHt < 10 ? '0' : '') + HHt.toString() + ':' + (MMt < 10 ? '0' : '') + MMt.toString(),
            floor: floor1,
            alert: alert,
            money: parseInt(money) - 10,
            washer: washer
          }).then(() => {
            Userinforamtion(docRef_U, docRef_W, docRef_D, username)
            Washinformation(docRef_W.doc(floor))
            dryinformation(docRef_D.doc(floor))
            if (wtime != "") {
              washdatechange(docRef_W.doc(floor), wtime)
            }
            if (dtime!="") {
              drydatechange(docRef_D.doc(floor), wtime)
            }


          });
        }
        else {
          document.getElementById("W").innerHTML = '1'
          docRef1.set({
            dryer: dryer,
            floor: floor1,
            alert: alert,
            money: parseInt(money) - 10,
            washer: '1 ' + floor + ' ' + (HHt < 10 ? '0' : '') + HHt.toString() + ':' + (MMt < 10 ? '0' : '') + MMt.toString()
          }).then(() => {
            Userinforamtion(docRef_U, docRef_W, docRef_D, username)
            Washinformation(docRef_W.doc(floor))
            dryinformation(docRef_D.doc(floor))
            if (wtime != "") {
              washdatechange(docRef_W.doc(floor), wtime)
            }
            if (dtime!="") {
              drydatechange(docRef_D.doc(floor), wtime)
            }


          });
        }
        document.getElementById("M").innerHTML = (parseInt(money) - 10).toString()
      }
    })
    console.log('111')
  }

  CheckWaitingLine(floor, HHt, MMt, Machine) {
    var username = this.user.getUsername()
    //this.user.getUsername();
    var docRef_D = this.afstore.collection("dryer")
    var docRef_W = this.afstore.collection("washer")
    var docRef_U = this.afstore.collection("user")
    var wtime = ""
    var dtime = ""

    if (this.WashDate != "") {
      wtime = this.WashDate[11] + this.WashDate[12] + this.WashDate[13] + this.WashDate[14] + this.WashDate[15]

    }
    if (this.DryDate != "") {
      dtime = this.DryDate[11] + this.DryDate[12] + this.DryDate[13] + this.DryDate[14] + this.DryDate[15]
    }
//-----------------xxu

    console.log('floor' + floor)
    var docRef = this.afstore.collection(Machine).doc(floor);
    //console.log(this.user.getUsername())
    var name = this.user.getUsername()
    console.log("CheckWaitingLine")
    docRef.get().subscribe(function (doc) {
      if (doc.exists) {
        if (floor == doc.get("floor")) {
          var order = doc.get("order")
          var schedule = doc.get("schedule")
          //insert
          console.log('insert')
          if (schedule.length == 0)
            schedule.push((HHt < 10 ? '0' : '') + HHt.toString() + ':' + (MMt < 10 ? '0' : '') + MMt.toString() + ' ' + name + " 2")
          else {
            console.log('0000')
            var HHs: any
            var MMs: any
            HHs = parseInt(schedule[0][0] + schedule[0][1])
            MMs = parseInt(schedule[0][3] + schedule[0][4])
            var buf = []
            var sss = HHs * 60 + MMs
            var ttt = HHt * 60 + MMt
            if (schedule[0][14] == '1' && Math.abs(sss - ttt) >= 50) {
              console.log("1111")
              buf.push((HHt < 10 ? '0' : '') + HHt.toString() + ':' + (MMt < 10 ? '0' : '') + MMt.toString() + ' ' + name + " 2")
              for (let j = 0; j < schedule.length; j++)
                buf.push(schedule[j])
              schedule = buf
            }
            else {
              var HHh: any
              var MMm: any
              var hhh: any
              console.log(schedule.length)
              for (let j = 0; j < schedule.length; j++) {
                if (j != schedule.length - 1) {
                  HHs = parseInt(schedule[j][0] + schedule[j][1])
                  MMs = parseInt(schedule[j][3] + schedule[j][4])
                  HHh = parseInt(schedule[j + 1][0] + schedule[j + 1][1])
                  MMm = parseInt(schedule[j + 1][3] + schedule[j + 1][4])
                  sss = HHs * 60 + MMs
                  hhh = HHh * 60 + MMm
                  if (Math.abs(sss - hhh) >= 100) {
                    for (let i = 0; i < schedule.length; i++) {
                      buf.push(schedule[j])
                      if (i == j) {
                        sss = sss + 50
                        HHs = Math.floor(sss / 60)
                        MMs = sss % 60
                        if (HHs > 23)
                          HHs = HHs - 24
                        buf.push((HHs < 10 ? '0' : '') + HHs.toString() + ':' + (MMs < 10 ? '0' : '') + MMs.toString() + ' ' + name + " 2")
                      }
                    }
                    schedule = buf
                    break
                  }
                }
                else if (j == schedule.length - 1) {
                  console.log(j)
                  HHs = parseInt(schedule[schedule.length - 1][0] + schedule[schedule.length - 1][1])
                  MMs = parseInt(schedule[schedule.length - 1][3] + schedule[schedule.length - 1][4])
                  sss = HHs * 60 + MMs + 50
                  HHs = Math.floor(sss / 60)
                  MMs = sss % 60
                  if (HHs > 23)
                    HHs = HHs - 24
                  schedule.push((HHs < 10 ? '0' : '') + HHs.toString() + ':' + (MMs < 10 ? '0' : '') + MMs.toString() + ' ' + name + " 2")
                  break
                }
              }
            }
            console.log('insert')
          } //insert
          var endtime: string //DetermineEndtime
          if (schedule[schedule.length - 1][14] == '2') {
            var HHs: any
            var MMs: any
            HHs = parseInt(schedule[0][0] + schedule[0][1])
            MMs = parseInt(schedule[0][3] + schedule[0][4])
            MMs = HHs * 60 + MMs + 45
            HHs = Math.floor(MMs / 60)
            console.log(HHs)
            MMs = MMs % 60
            if (HHs > 23)
              HHs = HHs - 24
            endtime = (HHs < 10 ? '0' : '') + HHs.toString() + ':' + (MMs < 10 ? '0' : '') + MMs.toString()
          }
          else
            endtime = ':'//DetermineEndtime
          console.log("success!")
          console.log('floor' + floor)
          presentAlert2("Success", "Wait in line.")
          docRef.set({
            endtime: endtime,
            schedule: schedule,
            floor: floor,
            order: order
          }).then(() => {
            Userinforamtion(docRef_U, docRef_W, docRef_D, username)
            Washinformation(docRef_W.doc(floor))
            dryinformation(docRef_D.doc(floor))
            if (wtime != "") {
              washdatechange(docRef_W.doc(floor), wtime)
            }
            if (dtime!="") {
              drydatechange(docRef_D.doc(floor), wtime)
            }


          });
        }
      }
      else {
        console.log("No such document!");
      }
    })
    console.log('inuser')
    var docRef1 = this.afstore.collection('user').doc(this.user.getUsername());
    docRef1.get().subscribe(function (doc) {
      if (doc.exists) {
        var washer = doc.get("washer")
        var dryer = doc.get("dryer")
        var floor1 = doc.get("floor")
        var alert = doc.get("alert")
        var money = doc.get("money")
        if (Machine == 'dryer') {
          document.getElementById("D").innerHTML = '2'
          document.getElementById("M").innerHTML = (parseInt(money) - 10).toString()
          docRef1.set({
            dryer: '2 ' + floor,
            floor: floor1,
            alert: alert,
            money: parseInt(money) - 10,
            washer: washer
          }).then(() => {
            Userinforamtion(docRef_U, docRef_W, docRef_D, username)
            Washinformation(docRef_W.doc(floor))
            dryinformation(docRef_D.doc(floor))
            if (wtime != "") {
              washdatechange(docRef_W.doc(floor), wtime)
            }
            if (dtime!="") {
              drydatechange(docRef_D.doc(floor), wtime)
            }


          });
        }
        else {
          document.getElementById("W").innerHTML = '2'
          docRef1.set({
            dryer: dryer,
            floor: floor1,
            alert: alert,
            money: parseInt(money) - 10,
            washer: '2 ' + floor
          }).then(() => {
            Userinforamtion(docRef_U, docRef_W, docRef_D, username)
            Washinformation(docRef_W.doc(floor))
            dryinformation(docRef_D.doc(floor))
            if (wtime != "") {
              washdatechange(docRef_W.doc(floor), wtime)
            }
            if (dtime!="") {
              drydatechange(docRef_D.doc(floor), wtime)
            }


          });
        }
        document.getElementById("D").innerHTML = (parseInt(money) - 10).toString()
      }
      console.log('inuser')
    })
  }

  async ChoseWasher(floor, Machine) {
    console.log(document.getElementById("M").innerHTML)
    console.log(document.getElementById("W").innerHTML)
    console.log(document.getElementById("D").innerHTML)
    console.log('floor' + floor)
    var nowtime = String(new Date())
    var docRef = this.afstore.collection(Machine).doc(floor);
    var HHt = parseInt(nowtime[16] + nowtime[17])
    var MMt = parseInt(nowtime[19] + nowtime[20])
    console.log(this.WashDate)
    console.log('wa')
    if (parseInt(document.getElementById("M").innerHTML) >= 10) {
      if (Machine == 'washer') {
        if (document.getElementById("W").innerHTML == '0') {
          console.log('in')
          console.log(document.getElementById("W").innerHTML == '0')
          if (this.WashDate == '')
            this.CheckWaitingLine(floor, HHt, MMt, 'washer')
          else {
            if (HHt < 3 || HHt > 5) {
              HHt = parseInt(this.WashDate[11] + this.WashDate[12])
              MMt = parseInt(this.WashDate[14] + this.WashDate[15])
              this.CheckOrder(floor, HHt, MMt, Machine)
            }
            else {
              console.log('Failure')
              presentAlert2("Failure", "Not allowed to order.")
            }
          }
        }
        else {
          console.log('Failure')
          presentAlert2("Failure", "Already have one washing machine inline.")
        }
      }

      if (Machine == 'dryer') {
        if (document.getElementById("D").innerHTML == '0') {
          if (this.DryDate == '')
            this.CheckWaitingLine(floor, HHt, MMt, 'dryer')
          else {
            if (HHt < 3 || HHt > 5) {
              HHt = parseInt(this.DryDate[11] + this.DryDate[12])
              MMt = parseInt(this.DryDate[14] + this.DryDate[15])
              this.CheckOrder(floor, HHt, MMt, Machine)
            }
            else {
              console.log('Failure')
              presentAlert2("Failure", "Not allowed to order.")
            }
          }
        }
        else {
          console.log('Failure')
          presentAlert2("Failure", "Already have one drying machine inline.")
        }
      }
    }
    else {
      console.log('Failure')
      presentAlert2("Failure", "Money is not enough.")
    }
    //this.again()
  }
}
function presentAlert2(h, m) {
  const alert = document.createElement('ion-alert');
  alert.header = h;
  alert.message = m;
  alert.buttons = ['OK'];

  document.body.appendChild(alert);
  return alert.present();
}




function presentAlertConfirm(h, m,docRef_D,docRef_W,docRef_U,name,at) {//加入排隊，開始洗衣
  const alert = document.createElement('ion-alert');
  alert.header = h;
  alert.message = m;
  alert.buttons = [
    {
      text: 'Cancel',
      role: 'cancel',
      cssClass: 'secondary',
      handler: (blah) => {
        console.log('Confirm Cancel: blah');
      }
    }, {
      text: 'Okay',
      handler: () => {
        console.log('Confirm Okay')
        var nowtime = String(new Date())
        var HHt = parseInt(nowtime[16] + nowtime[17])
        var MMt = parseInt(nowtime[19] + nowtime[20])
        console.log(at)
        docRef_W.doc(at.toString()).get().subscribe(function (doc) {
          var order = doc.get("order")
          var schedule = doc.get("schedule")
          //
          if(schedule.length == 0)
              schedule.push((HHt < 10 ? '0' : '') + HHt.toString() + ':' + (MMt < 10 ? '0' : '') + MMt.toString() + ' ' + name + " 2")
            else{
              console.log('0000')
              var HHs : any
              var MMs : any
              HHs = parseInt(schedule[0][0] + schedule[0][1])
              MMs = parseInt(schedule[0][3] + schedule[0][4])
              var buf = []
              var sss = HHs * 60 + MMs
              var ttt = HHt * 60 + MMt
              if(schedule[0][14] == '1' && Math.abs(sss - ttt) >= 50){
                console.log("1111")
                buf.push((HHt < 10 ? '0' : '') + HHt.toString() + ':' + (MMt < 10 ? '0' : '') + MMt.toString() + ' ' + name + " 2")
                for (let j = 0; j < schedule.length; j++)
                    buf.push(schedule[j])
                schedule = buf
              }
              else{
                var HHh : any
                var MMm : any
                var hhh : any
                console.log(schedule.length)
                for (let j = 0; j < schedule.length; j++){
                  if(j != schedule.length - 1){
                    HHs = parseInt(schedule[j][0] + schedule[j][1])
                    MMs = parseInt(schedule[j][3] + schedule[j][4])
                    HHh = parseInt(schedule[j + 1][0] + schedule[j + 1][1])
                    MMm = parseInt(schedule[j + 1][3] + schedule[j + 1][4])
                    sss = HHs * 60 + MMs
                    hhh = HHh * 60 + MMm
                    if(Math.abs(sss - hhh) >= 100){
                      for (let i = 0; i < schedule.length; i++){
                        buf.push(schedule[j]) 
                        if(i == j){
                          sss = sss + 50
                          HHs = Math.floor(sss / 60)
                          MMs = sss % 60
                          if(HHs > 23)
                            HHs = HHs - 24 
                          buf.push((HHs < 10 ? '0' : '') + HHs.toString() + ':' + (MMs < 10 ? '0' : '') + MMs.toString() + ' ' + name + " 2")
                        }
                      }
                      schedule = buf 
                      break
                    }
                  }
                  else if(j == schedule.length - 1){
                    console.log(j)
                    HHs = parseInt(schedule[schedule.length - 1][0] + schedule[schedule.length - 1][1])
                    MMs = parseInt(schedule[schedule.length - 1][3] + schedule[schedule.length - 1][4])
                    sss = HHs * 60 + MMs + 50
                    HHs = Math.floor(sss / 60)
                    MMs = sss % 60
                    if(HHs > 23)
                      HHs = HHs - 24 
                    schedule.push((HHs < 10 ? '0' : '') + HHs.toString() + ':' + (MMs < 10 ? '0' : '') + MMs.toString() + ' ' + name + " 2")
                    break
                  }
                }
              }
              console.log('insert')
            } //insert
          //
          var endtime : string //DetermineEndtime
            if(schedule[schedule.length - 1][14] == '2'){
              var HHs : any
              var MMs : any
              HHs = parseInt(schedule[0][0] + schedule[0][1])
              MMs = parseInt(schedule[0][3] + schedule[0][4])
              MMs = HHs * 60 + MMs + 45
              HHs = Math.floor(MMs / 60)
              console.log(HHs)
              MMs = MMs % 60
              if(HHs > 23)
                HHs = HHs - 24 
              endtime = (HHs < 10 ? '0' : '') + HHs.toString() + ':' + (MMs < 10 ? '0' : '') + MMs.toString()
            } 
            else
              endtime = ':'//DetermineEndtime
          //
          docRef_W.doc(at.toString()).set({
            endtime : endtime,
            schedule: schedule,
            floor : at.toString(),
            order : order
          })
        })
        docRef_U.doc(name).get().subscribe(function (doc) {
          var dryer = doc.get("dryer")
          var floor1 = doc.get("floor")
          var alert = doc.get("alert")
          var money = doc.get("money")
          docRef_U.doc(name).set({
            dryer : dryer,
            floor : floor1,
            alert : alert,
            money : parseInt(money) - 10,
            washer : '2 ' + at.toString()
          })
        })
      }
    }
  ];

  document.body.appendChild(alert);
  return alert.present();
}




function Userinforamtion(U, W, D, username) {
  U.doc(username).get().subscribe(function (doc) {
    var wash = doc.get("washer")
    var dry = doc.get("dryer")
    var alert = doc.get("alert")
    var floor = doc.get("floor")
    var money = doc.get("money")
    document.getElementById("w" + floor).setAttribute("style", "--background:#63c0e9;")
    document.getElementById("d" + floor).setAttribute("style", "--background:#93D7A5;")
    console.log(wash)
    if (wash[0] == "0") {
      document.getElementById("userwash_time").innerHTML = "目前無預約跟排隊"

    }
    else if (wash[0] == "1") {

      document.getElementById("userwash_at").innerHTML = "Wash " + wash[2] + "F"
      var nowtime = String(new Date())
      var time = nowtime[16] + nowtime[17] + nowtime[18] + nowtime[19] + nowtime[20] + "";
      var attime = wash[4] + wash[5] + wash[6] + wash[7] + wash[8]
      document.getElementById("userwash_time").innerHTML = "已預約 " + attime + " 洗衣"

      var hh = Number(attime[0] + attime[1])
      var mm = Number(attime[3] + attime[4])
      var nhh = Number(time[0] + time[1])
      var nmm = Number(time[3] + time[4])

      if (hh < 6) {
        hh += 24
      }
      if (nhh < 6) {
        nhh += 24
      }
      var h = hh - nhh
      var m = mm - nmm
      var t = m + h * 60
      if (t > 0) {
        document.getElementById("userwash_time").innerHTML = "已預約 " + attime + " 洗衣"
        let timer = setInterval(function () {
          console.log(t)
          t -= 1
          if (t == 0) {
            document.getElementById("userwash_time").innerHTML = "可開始洗衣"
          }
          if (t == -10) {
            document.getElementById("userwash_time").innerHTML = "預約已過號"
          }

        }, 60000);
      }
      else if (t <= 0 && t > -10) {
        document.getElementById("userwash_time").innerHTML = "可開始洗衣"
      }
      else {
        document.getElementById("userwash_time").innerHTML = "預約已過號"
      }

    }
    else if (wash[0] == "3") {
      document.getElementById("userwash_at").innerHTML = "Wash " + wash[2] + "F"
      var attime = wash[4] + wash[5] + wash[6] + wash[7] + wash[8]
      var nowtime = String(new Date())
      var time = nowtime[16] + nowtime[17] + nowtime[18] + nowtime[19] + nowtime[20] + "";

      document.getElementById("userwash_time").innerHTML = "預計 " + attime + " 結束洗衣"

      var hh = Number(attime[0] + attime[1])
      var mm = Number(attime[3] + attime[4])
      var nhh = Number(time[0] + time[1])
      var nmm = Number(time[3] + time[4])

      if (hh < 6) {
        hh += 24
      }
      if (nhh < 6) {
        nhh += 24
      }
      var h = hh - nhh
      var m = mm - nmm
      var t = m + h * 60
      console.log(t)
      if (t > 0) {
        document.getElementById("userwash_time").innerHTML = "預計 " + attime + " 結束洗衣"
        let timer = setInterval(function () {
          console.log(t)
          t -= 1
          if (t == 0) {
            document.getElementById("userwash_time").innerHTML = "完成洗衣"
          }

        }, 60000);
      }
      else {
        document.getElementById("userwash_time").innerHTML = "完成洗衣"
      }
    }
    else {
      document.getElementById("userwash_at").innerHTML = "Wash " + wash[2] + "F"
      W.doc(wash[2]).get().subscribe(function (doc2) {
        var schedule = doc2.get("schedule")
        for (let i = 0; i < schedule.length; i++) {
          var ID = ""
          for (let x = 0; x < schedule[i].length; x++) {
            if (x > 5 && x < schedule[i].length - 2) {
              ID += schedule[i][x]
            }
          }
          if (ID == username) {
            var waittime = schedule[i][0] + schedule[i][1] + schedule[i][2] + schedule[i][3] + schedule[i][4]
            document.getElementById("userwash_time").innerHTML = "預計等待至 " + waittime
            var nowtime = String(new Date())
            var time = nowtime[16] + nowtime[17] + nowtime[18] + nowtime[19] + nowtime[20] + "";

            var hh = Number(waittime[0] + waittime[1])
            var mm = Number(waittime[3] + waittime[4])
            var nhh = Number(time[0] + time[1])
            var nmm = Number(time[3] + time[4])

            if (hh < 6) {
              hh += 24
            }
            if (nhh < 6) {
              nhh += 24
            }
            var h = hh - nhh
            var m = mm - nmm
            var t = m + h * 60
            if (t > 0) {
              document.getElementById("userwash_time").innerHTML = "預計等待至 " + waittime
              let timer = setInterval(function () {
                console.log(t)
                t -= 1
                if (t == 0) {
                  document.getElementById("userwash_time").innerHTML = "可開始洗衣"
                }
                if (t == -10) {
                  document.getElementById("userwash_time").innerHTML = "排隊已過號"
                }

              }, 60000);
            }
            else if (t <= 0 && t > -10) {
              document.getElementById("userwash_time").innerHTML = "可開始洗衣"
            }
            else {
              document.getElementById("userwash_time").innerHTML = "排隊已過號"
            }
            break
          }
        }
      })

    }

    if (dry[0] == "0") {
      document.getElementById("userdry_time").innerHTML = "目前無預約跟排隊"

    }
    else if (dry[0] == "1") {
      document.getElementById("userdry_at").innerHTML = "Dry " + dry[2] + "F"
      var nowtime = String(new Date())
      var time = nowtime[16] + nowtime[17] + nowtime[18] + nowtime[19] + nowtime[20] + "";
      var attime = dry[4] + dry[5] + dry[6] + dry[7] + dry[8]
      document.getElementById("userdry_time").innerHTML = "已預約 " + attime + " 洗衣"

      var hh = Number(attime[0] + attime[1])
      var mm = Number(attime[3] + attime[4])
      var nhh = Number(time[0] + time[1])
      var nmm = Number(time[3] + time[4])

      if (hh < 6) {
        hh += 24
      }
      if (nhh < 6) {
        nhh += 24
      }
      var h = hh - nhh
      var m = mm - nmm
      var t = m + h * 60
      if (t > 0) {
        document.getElementById("userdry_time").innerHTML = "已預約 " + attime + " 洗衣"
        let timer = setInterval(function () {
          console.log(t)
          t -= 1
          if (t == 0) {
            document.getElementById("userdry_time").innerHTML = "可開始洗衣"
          }
          if (t == -10) {
            document.getElementById("userdry_time").innerHTML = "預約已過號"
          }

        }, 60000);
      }
      else if (t <= 0 && t > -10) {
        document.getElementById("userdry_time").innerHTML = "可開始洗衣"
      }
      else {
        document.getElementById("userdry_time").innerHTML = "預約已過號"
      }

    }
    else if (dry[0] == "3") {
      console.log("in3")
      document.getElementById("userdry_at").innerHTML = "Dry " + dry[2] + "F"
      var attime = dry[4] + dry[5] + dry[6] + dry[7] + dry[8]
      var nowtime = String(new Date())
      var time = nowtime[16] + nowtime[17] + nowtime[18] + nowtime[19] + nowtime[20] + "";

      document.getElementById("userdry_time").innerHTML = "預計 " + attime + " 結束烘衣"

      var hh = Number(attime[0] + attime[1])
      var mm = Number(attime[3] + attime[4])
      var nhh = Number(time[0] + time[1])
      var nmm = Number(time[3] + time[4])

      if (hh < 6) {
        hh += 24
      }
      if (nhh < 6) {
        nhh += 24
      }
      var h = hh - nhh
      var m = mm - nmm
      var t = m + h * 60
      console.log(t)
      if (t > 0) {
        document.getElementById("userdry_time").innerHTML = "預計 " + attime + " 結束烘衣"
        let timer = setInterval(function () {
          console.log(t)
          t -= 1
          if (t == 0) {
            document.getElementById("userdry_time").innerHTML = "完成烘衣"
          }

        }, 60000);
      }
      else {
        document.getElementById("userdry_time").innerHTML = "完成烘衣"
      }

    }
    else {
      document.getElementById("userdry_at").innerHTML = "Dry " + dry[2] + "F"
      D.doc(dry[2]).get().subscribe(function (doc2) {
        var schedule = doc2.get("schedule")
        for (let i = 0; i < schedule.length; i++) {
          var ID = ""
          for (let x = 0; x < schedule[i].length; x++) {
            if (x > 5 && x < schedule[i].length - 2) {
              ID += schedule[i][x]
            }
          }
          if (ID == username) {
            var waittime = schedule[i][0] + schedule[i][1] + schedule[i][2] + schedule[i][3] + schedule[i][4]
            document.getElementById("userdry_time").innerHTML = "預計等待至 " + waittime
            var nowtime = String(new Date())
            var time = nowtime[16] + nowtime[17] + nowtime[18] + nowtime[19] + nowtime[20] + "";

            var hh = Number(waittime[0] + waittime[1])
            var mm = Number(waittime[3] + waittime[4])
            var nhh = Number(time[0] + time[1])
            var nmm = Number(time[3] + time[4])

            if (hh < 6) {
              hh += 24
            }
            if (nhh < 6) {
              nhh += 24
            }
            var h = hh - nhh
            var m = mm - nmm
            var t = m + h * 60
            if (t > 0) {
              document.getElementById("userdry_time").innerHTML = "預計等待至 " + waittime
              let timer = setInterval(function () {
                console.log(t)
                t -= 1
                if (t == 0) {
                  document.getElementById("userdry_time").innerHTML = "可開始洗衣"
                }
                if (t == -10) {
                  document.getElementById("userdry_time").innerHTML = "排隊已過號"
                }

              }, 60000);
            }
            else if (t <= 0 && t > -10) {
              document.getElementById("userdry_time").innerHTML = "可開始洗衣"
            }
            else {
              document.getElementById("userdry_time").innerHTML = "排隊已過號"
            }
            break
          }
        }
      })

    }

    var www = document.getElementById("userwash_time").innerHTML
    if (www[2] + www[3] + www[4] == "已過號") {
      wash = "0"
    }
    var ddd = document.getElementById("userdry_time").innerHTML
    if (ddd[2] + ddd[3] + ddd[4] == "已過號") {
      dry = "0"
    }
    U.doc(username).set({
      alert: alert,
      dryer: dry,
      washer: wash,
      floor: floor,
      money: money

    })


  })
}

function Washinformation(W) {
  W.get().subscribe(function (doc) {
    if (doc.exists) {
      var nowtime = String(new Date())
      var time = nowtime[16] + nowtime[17] + nowtime[18] + nowtime[19] + nowtime[20] + "";

      var order = doc.get("order")
      var schedule = doc.get("schedule")
      var endtime = doc.get("endtime")
      var floor = doc.get("floor")
      //console.log(floor)

      document.getElementById("wim" + floor).setAttribute("src", 'assets/img/good.png')
      if (endtime == ":") {//沒有人排隊
        for (var x = 0; x < schedule.length; x++) {
          var hh = Number(schedule[x][0] + schedule[x][1])
          var mm = Number(schedule[x][3] + schedule[x][4])
          var nhh = Number(time[0] + time[1])
          var nmm = Number(time[3] + time[4])

          if (hh < 6) {
            hh += 24
          }
          if (nhh < 6) {
            nhh += 24
          }
          if (nhh - hh <= 0) {
            var h = hh - nhh
            var m = mm - nmm
            var t = m + h * 60
            if (t < 50) {
              document.getElementById("wf" + floor).innerHTML = "已被預約"
              document.getElementById("wim" + floor).setAttribute("src", 'assets/img/NoThings.png')
              break
            }
            else {
              document.getElementById("wf" + floor).innerHTML = "可以使用"
            }
          }
          else {
            document.getElementById("wf" + floor).innerHTML = "可以使用"
          }
        }
        if (document.getElementById("wf" + floor).innerHTML == "")
          document.getElementById("wf" + floor).innerHTML = "可以使用"
      }
      else {//有人排隊
        var hh = Number(endtime[0] + endtime[1])
        var mm = Number(endtime[3] + endtime[4])
        var nhh = Number(time[0] + time[1])
        var nmm = Number(time[3] + time[4])
        if (hh < 6) {
          hh += 24
        }
        if (nhh < 6) {
          nhh += 24
        }
        if (nhh - hh <= 0) {

          var h = hh - nhh
          var m = mm - nmm
          var t = m + h * 60
          if (t > 0) {
            //console.log("in")
            document.getElementById("wf" + floor).innerHTML = "預計等待" + t + "分鐘"
            document.getElementById("wim" + floor).setAttribute("src", 'assets/img/NoThings.png')

          }
          else {

            for (var x = 0; x < schedule.length; x++) {
              var hh = Number(schedule[x][0] + schedule[x][1])
              var mm = Number(schedule[x][3] + schedule[x][4])
              var nhh = Number(time[0] + time[1])
              var nmm = Number(time[3] + time[4])

              if (hh < 6) {
                hh += 24
              }
              if (nhh < 6) {
                nhh += 24
              }
              if (nhh - hh <= 0) {
                var h = hh - nhh
                var m = mm - nmm
                var t = m + h * 60
                if (t < 50) {
                  document.getElementById("wf" + floor).innerHTML = "已被預約"
                  document.getElementById("wim" + floor).setAttribute("src", 'assets/img/NoThings.png')
                  break
                }
                else {
                  document.getElementById("wf" + floor).innerHTML = "可以使用"
                }
              }
              else {
                document.getElementById("wf" + floor).innerHTML = "可以使用"
              }
            }
            if (document.getElementById("wf" + floor).innerHTML == "")
              document.getElementById("wf" + floor).innerHTML = "可以使用"
          }
        }
        else {

          for (var x = 0; x < schedule.length; x++) {
            var hh = Number(schedule[x][0] + schedule[x][1])
            var mm = Number(schedule[x][3] + schedule[x][4])
            var nhh = Number(time[0] + time[1])
            var nmm = Number(time[3] + time[4])

            if (hh < 6) {
              hh += 24
            }
            if (nhh < 6) {
              nhh += 24
            }
            if (nhh - hh <= 0) {
              var h = hh - nhh
              var m = mm - nmm
              var t = m + h * 60
              if (t < 50) {
                document.getElementById("wf" + floor).innerHTML = "已被預約"
                document.getElementById("wim" + floor).setAttribute("src", 'assets/img/NoThings.png')
                break
              }
              else {
                document.getElementById("wf" + floor).innerHTML = "可以使用"
              }
            }
            else {
              document.getElementById("wf" + floor).innerHTML = "可以使用"
            }
          }
          if (document.getElementById("wf" + floor).innerHTML == "")
            document.getElementById("wf" + floor).innerHTML = "可以使用"
        }
      }

    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  })
}
function dryinformation(D) {
  D.get().subscribe(function (doc) {
    if (doc.exists) {
      var nowtime = String(new Date())
      var time = nowtime[16] + nowtime[17] + nowtime[18] + nowtime[19] + nowtime[20] + "";

      var order = doc.get("order")
      var schedule = doc.get("schedule")
      var endtime = doc.get("endtime")
      var floor = doc.get("floor")

      document.getElementById("dim" + floor).setAttribute("src", 'assets/img/good_G.png')
      if (endtime == ":") {
        for (var x = 0; x < schedule.length; x++) {
          var hh = Number(schedule[x][0] + schedule[x][1])
          var mm = Number(schedule[x][3] + schedule[x][4])
          var nhh = Number(time[0] + time[1])
          var nmm = Number(time[3] + time[4])

          if (hh < 6) {
            hh += 24
          }
          if (nhh < 6) {
            nhh += 24
          }
          if (nhh - hh <= 0) {
            var h = hh - nhh
            var m = mm - nmm
            var t = m + h * 60
            if (t < 50) {
              document.getElementById("df" + floor).innerHTML = "已被預約"
              document.getElementById("dim" + floor).setAttribute("src", 'assets/img/NoThings.png')
              break
            }
            else {
              document.getElementById("df" + floor).innerHTML = "可以使用"
            }
          }
          else {
            document.getElementById("df" + floor).innerHTML = "可以使用"
          }
        }
        if (document.getElementById("df" + floor).innerHTML == "")
          document.getElementById("df" + floor).innerHTML = "可以使用"
      }
      else {
        var hh = Number(endtime[0] + endtime[1])
        var mm = Number(endtime[3] + endtime[4])
        var nhh = Number(time[0] + time[1])
        var nmm = Number(time[3] + time[4])
        //console.log(floor)

        if (hh < 6) {
          hh += 24
        }
        if (nhh < 6) {
          nhh += 24
        }
        if (nhh - hh <= 0) {

          var h = hh - nhh
          var m = mm - nmm
          var t = m + h * 60
          if (t > 0) {
            //console.log("in")
            document.getElementById("df" + floor).innerHTML = "預計等待" + t + "分鐘"
            document.getElementById("dim" + floor).setAttribute("src", 'assets/img/NoThings.png')

          }
          else {

            for (var x = 0; x < schedule.length; x++) {
              var hh = Number(schedule[x][0] + schedule[x][1])
              var mm = Number(schedule[x][3] + schedule[x][4])
              var nhh = Number(time[0] + time[1])
              var nmm = Number(time[3] + time[4])

              if (hh < 6) {
                hh += 24
              }
              if (nhh < 6) {
                nhh += 24
              }
              if (nhh - hh <= 0) {
                var h = hh - nhh
                var m = mm - nmm
                var t = m + h * 60
                if (t < 50) {
                  document.getElementById("df" + floor).innerHTML = "已被預約"
                  document.getElementById("dim" + floor).setAttribute("src", 'assets/img/NoThings.png')
                  break
                }
                else {
                  document.getElementById("df" + floor).innerHTML = "可以使用"
                }
              }
              else {
                document.getElementById("df" + floor).innerHTML = "可以使用"
              }
            }
            if (document.getElementById("df" + floor).innerHTML == "")
              document.getElementById("df" + floor).innerHTML = "可以使用"
          }
        }
        else {

          for (var x = 0; x < schedule.length; x++) {
            var hh = Number(schedule[x][0] + schedule[x][1])
            var mm = Number(schedule[x][3] + schedule[x][4])
            var nhh = Number(time[0] + time[1])
            var nmm = Number(time[3] + time[4])

            if (hh < 6) {
              hh += 24
            }
            if (nhh < 6) {
              nhh += 24
            }
            if (nhh - hh <= 0) {
              var h = hh - nhh
              var m = mm - nmm
              var t = m + h * 60
              if (t < 50) {
                document.getElementById("df" + floor).innerHTML = "已被預約"
                document.getElementById("dim" + floor).setAttribute("src", 'assets/img/NoThings.png')
                break
              }
              else {
                document.getElementById("df" + floor).innerHTML = "可以使用"
              }
            }
            else {
              document.getElementById("df" + floor).innerHTML = "可以使用"
            }
          }
          if (document.getElementById("df" + floor).innerHTML == "")
            document.getElementById("df" + floor).innerHTML = "可以使用"
        }
      }

    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  })
}

function washdatechange(W, time) {
  W.get().subscribe(function (doc) {
    if (doc.exists) {
      var order = doc.get("order")
      var schedule = doc.get("schedule")
      var endtime = doc.get("endtime")
      var floor = doc.get("floor")
      //console.log(floor)
      document.getElementById("wf" + floor).innerHTML = ""
      document.getElementById("wim" + floor).setAttribute("src", 'assets/img/good.png')
      if (endtime == ":") {
        for (var x = 0; x < schedule.length; x++) {
          console.log(floor + "in")
          var hh = Number(schedule[x][0] + schedule[x][1])
          var mm = Number(schedule[x][3] + schedule[x][4])
          var nhh = Number(time[0] + time[1])
          var nmm = Number(time[3] + time[4])


          if (hh < 6) {
            hh += 24
          }
          if (nhh < 6) {
            nhh += 24
          }
          if (nhh - hh <= 0) {
            var h = hh - nhh
            var m = mm - nmm
            var t = m + h * 60
            if (t < 50) {
              document.getElementById("wf" + floor).innerHTML = "已被預約"
              document.getElementById("wim" + floor).setAttribute("src", 'assets/img/NoThings.png')
              break
            }
            else {
              document.getElementById("wf" + floor).innerHTML = "可以使用"
            }
          }
          else {
            document.getElementById("wf" + floor).innerHTML = "可以使用"
          }
        }
        if (document.getElementById("wf" + floor).innerHTML == "")
          document.getElementById("wf" + floor).innerHTML = "可以使用"
      }
      else {

        var hh = Number(endtime[0] + endtime[1])
        var mm = Number(endtime[3] + endtime[4])
        var nhh = Number(time[0] + time[1])
        var nmm = Number(time[3] + time[4])
        //console.log(nhh+" "+nmm)
        if (hh < 6) {
          hh += 24
        }
        if (nhh < 6) {
          nhh += 24
        }
        if (nhh - hh <= 0) {

          var h = hh - nhh
          var m = mm - nmm
          var t = m + h * 60
          if (t > 0) {
            //console.log("in")
            document.getElementById("wf" + floor).innerHTML = "預計等待" + t + "分鐘"
            document.getElementById("wim" + floor).setAttribute("src", 'assets/img/NoThings.png')

          }
          else {

            for (var x = 0; x < schedule.length; x++) {
              var hh = Number(schedule[x][0] + schedule[x][1])
              var mm = Number(schedule[x][3] + schedule[x][4])
              var nhh = Number(time[0] + time[1])
              var nmm = Number(time[3] + time[4])

              if (hh < 6) {
                hh += 24
              }
              if (nhh < 6) {
                nhh += 24
              }
              if (nhh - hh <= 0) {
                var h = hh - nhh
                var m = mm - nmm
                var t = m + h * 60
                if (t < 50) {
                  document.getElementById("wf" + floor).innerHTML = "已被預約"
                  document.getElementById("wim" + floor).setAttribute("src", 'assets/img/NoThings.png')
                  break
                }
                else {
                  document.getElementById("wf" + floor).innerHTML = "可以使用"
                }
              }
              else {
                document.getElementById("wf" + floor).innerHTML = "可以使用"
              }
            }
            if (document.getElementById("wf" + floor).innerHTML == "")
              document.getElementById("wf" + floor).innerHTML = "可以使用"
          }
        }
        else {

          for (var x = 0; x < schedule.length; x++) {
            var hh = Number(schedule[x][0] + schedule[x][1])
            var mm = Number(schedule[x][3] + schedule[x][4])
            var nhh = Number(time[0] + time[1])
            var nmm = Number(time[3] + time[4])

            if (hh < 6) {
              hh += 24
            }
            if (nhh < 6) {
              nhh += 24
            }
            if (nhh - hh <= 0) {
              var h = hh - nhh
              var m = mm - nmm
              var t = m + h * 60
              if (t < 50) {
                document.getElementById("wf" + floor).innerHTML = "已被預約"
                document.getElementById("wim" + floor).setAttribute("src", 'assets/img/NoThings.png')
                break
              }
              else {
                document.getElementById("wf" + floor).innerHTML = "可以使用"
              }
            }
            else {
              document.getElementById("wf" + floor).innerHTML = "可以使用"
            }
          }
          if (document.getElementById("wf" + floor).innerHTML == "")
            document.getElementById("wf" + floor).innerHTML = "可以使用"
        }
      }

    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  })
}

function drydatechange(D, time) {
  D.get().subscribe(function (doc) {
    if (doc.exists) {
      var order = doc.get("order")
      var schedule = doc.get("schedule")
      var endtime = doc.get("endtime")
      var floor = doc.get("floor")
      document.getElementById("df" + floor).innerHTML = ""
      document.getElementById("dim" + floor).setAttribute("src", 'assets/img/good_G.png')
      if (endtime == ":") {
        for (var x = 0; x < schedule.length; x++) {
          var hh = Number(schedule[x][0] + schedule[x][1])
          var mm = Number(schedule[x][3] + schedule[x][4])
          var nhh = Number(time[0] + time[1])
          var nmm = Number(time[3] + time[4])

          if (hh < 6) {
            hh += 24
          }
          if (nhh < 6) {
            nhh += 24
          }
          if (nhh - hh <= 0) {
            var h = hh - nhh
            var m = mm - nmm
            var t = m + h * 60
            if (t < 50) {
              document.getElementById("df" + floor).innerHTML = "已被預約"
              document.getElementById("dim" + floor).setAttribute("src", 'assets/img/NoThings.png')
              break
            }
            else {
              document.getElementById("df" + floor).innerHTML = "可以使用"
            }
          }
          else {
            document.getElementById("df" + floor).innerHTML = "可以使用"
          }
        }
        if (document.getElementById("df" + floor).innerHTML == "")
          document.getElementById("df" + floor).innerHTML = "可以使用"
      }
      else {
        var hh = Number(endtime[0] + endtime[1])
        var mm = Number(endtime[3] + endtime[4])
        var nhh = Number(time[0] + time[1])
        var nmm = Number(time[3] + time[4])
        //console.log(floor)

        if (hh < 6) {
          hh += 24
        }
        if (nhh < 6) {
          nhh += 24
        }
        if (nhh - hh <= 0) {

          var h = hh - nhh
          var m = mm - nmm
          var t = m + h * 60
          if (t > 0) {
            //console.log("in")
            document.getElementById("df" + floor).innerHTML = "預計等待" + t + "分鐘"
            document.getElementById("dim" + floor).setAttribute("src", 'assets/img/NoThings.png')

          }
          else {

            for (var x = 0; x < schedule.length; x++) {
              var hh = Number(schedule[x][0] + schedule[x][1])
              var mm = Number(schedule[x][3] + schedule[x][4])
              var nhh = Number(time[0] + time[1])
              var nmm = Number(time[3] + time[4])

              if (hh < 6) {
                hh += 24
              }
              if (nhh < 6) {
                nhh += 24
              }
              if (nhh - hh <= 0) {
                var h = hh - nhh
                var m = mm - nmm
                var t = m + h * 60
                if (t < 50) {
                  document.getElementById("df" + floor).innerHTML = "已被預約"
                  document.getElementById("dim" + floor).setAttribute("src", 'assets/img/NoThings.png')
                  break
                }
                else {
                  document.getElementById("df" + floor).innerHTML = "可以使用"
                }
              }
              else {
                document.getElementById("df" + floor).innerHTML = "可以使用"
              }
            }
            if (document.getElementById("df" + floor).innerHTML == "")
              document.getElementById("df" + floor).innerHTML = "可以使用"
          }
        }
        else {

          for (var x = 0; x < schedule.length; x++) {
            var hh = Number(schedule[x][0] + schedule[x][1])
            var mm = Number(schedule[x][3] + schedule[x][4])
            var nhh = Number(time[0] + time[1])
            var nmm = Number(time[3] + time[4])

            if (hh < 6) {
              hh += 24
            }
            if (nhh < 6) {
              nhh += 24
            }
            if (nhh - hh <= 0) {
              var h = hh - nhh
              var m = mm - nmm
              var t = m + h * 60
              if (t < 50) {
                document.getElementById("df" + floor).innerHTML = "已被預約"
                document.getElementById("dim" + floor).setAttribute("src", 'assets/img/NoThings.png')
                break
              }
              else {
                document.getElementById("df" + floor).innerHTML = "可以使用"
              }
            }
            else {
              document.getElementById("df" + floor).innerHTML = "可以使用"
            }
          }
          if (document.getElementById("df" + floor).innerHTML == "")
            document.getElementById("df" + floor).innerHTML = "可以使用"
        }
      }

    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  })
}