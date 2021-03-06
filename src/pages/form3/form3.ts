import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { Camera, CameraOptions } from '@ionic-native/camera';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Dialogs } from '@ionic-native/dialogs';
import { MenuPage } from '../menu/menu';


/**
 * Generated class for the Form3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form3',
  templateUrl: 'form3.html',
})
export class Form3Page {
  theConsole: string = "Console Messages";
  options: any = {
    name: 'data.db',
    location: 'default',
    createFromLocation: 1
  }
  private db: SQLiteObject;
  matcont: string;
  numtrain: number;
  montant: number;
  cin: number;
  nompass: string;
  prenompass: string;
  adresse: string;
  //image:string;
  lieu: string;
  datepv: any;
  Type:number;
  destreele:string;
  /*today;
  image: string;
  options: CameraOptions = {
    quality:100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }*/

  constructor(/*private camera: Camera,*/ public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite, private dialogs: Dialogs) {
  //  this.today = new Date().toISOString();
  this.connectToDb();
  }
  private connectToDb(): void {
    this.sqlite.create(this.options)
      .then((db: SQLiteObject) => {
        this.db = db;
        var sql = 'create table IF NOT EXISTS `FichePV`(ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, Type INTEGER, cin NUMERIC NOT NULL, nompass TEXT NOT NULL, prenompass TEXT NOT NULL, adresse TEXT NOT NULL, matcont TEXT NOT NULL, numtrain INTEGER NOT NULL, datepv TEXT NOT NULL, montant REAL NOT NULL, lieu TEXT NOT NULL, classe INTEGER, destreele TEXT, typeabo TEXT, durestas INTEGER, datefinabo TEXT)';
        this.db.executeSql(sql, {})
          .then(() => this.theConsole += "\n" + 'Executed Sql' + sql)
          .catch(e => this.theConsole += "Error:" + JSON.stringify(e));
      })
      .catch(e => this.theConsole += JSON.stringify(e));
  }
  addPV(ev): void {
    if(this.numtrain &&  this.cin.toString.length == 8 && this.montant && this.nompass.length<20 && this.prenompass.length<20 && this.adresse.length<20 && this.lieu.length<20 && this.Type && this.destreele)
    {
    // add form control
    var date = new Date();
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var minutes = date.getMinutes();
    var hours = date.getHours();
  //  var seconds = date.getSeconds();
    this.datepv = day + "-" + (monthIndex + 1) + "-" + year + " " + hours + ":" + minutes;
    var sql = "INSERT INTO `FichePV`(datepv,cin,nompass,prenompass,adresse,matcont,numtrain,montant,lieu,Type,destreele) VALUES('"+this.datepv+"','"+this.cin+"','"+this.nompass+"','"+this.prenompass+ "','"+this.adresse+"','"+this.matcont+"','"+this.numtrain+ "','"+this.montant+"','"+this.lieu + "','"+3+ "','"+this.destreele + "')";
    this.db.executeSql(sql, {})
    .then(() => {
      this.dialogs.alert('تم تسجيل الخطية')
        .then(() => {
          console.log('Dialog dismissed');
          // this.navCtrl.push(MenuPage);
          this.navCtrl.setRoot(MenuPage);
        })
        .catch(e => console.log('Error displaying dialog', e))
    })
      .catch(err => {
        this.dialogs.alert(JSON.stringify(err))
          .then(() => console.log('Dialog dismissed'))
          .catch(e => console.log('Error displaying dialog', e))
      });
  }else
  {
    this.dialogs.alert("الرجاء التثبت من المعطيات")

  }
}
  /*async takePicture(): Promise<any>{
    try {
    this.image = await this.camera.getPicture(this.options);
  }
  catch(e){
    console.log(e);
  }
}*/
getConsoleMessages() {
  return this.theConsole;
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Form3Page');
  }

}
