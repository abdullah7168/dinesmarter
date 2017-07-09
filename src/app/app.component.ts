import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'app.html'
})



export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;
  public test=[];

  public data: any;
  lat: number = 51.678418;
  lng: number = 7.809007;

  //data arrays def
  allergens: any;
  cusines: Array<{id: string, cusine: any}>;
  services: Array<{id: string, serviceStyle: any}>;
  //selected val
  selectedalgs: Array<{id: string, allergen: any}>;

  constructor(private storage: Storage,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public geo: Geolocation,public loadingCtrl: LoadingController,public http: Http) {
   
    this.initializeApp();
this.test.push("waleed");
var duplicates = [1,3,4,2,1,2,3,8];
var duplicates = duplicates.filter(function(item, pos) {
    return duplicates.indexOf(item) == pos;
})
console.log(duplicates);
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
    ];
    // init data arrays
    let loading = this.loadingCtrl.create({
    content: 'Trying to get your location...'
  });

  loading.present();

  setTimeout(() => {
    
     this.geo.getCurrentPosition().then((resp) => {
 // resp.coords.latitude
 // resp.coords.longitude
 this.lat=resp.coords.latitude;
 this.lng=resp.coords.longitude;

 //alert(resp.coords.latitude+" "+resp.coords.longitude);
 //alert(resp.coords.latitude);


 this.http.get('http://menudriven.net/prototype/api/appload')
      .map(res => res.json())
      .subscribe(data => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        
        //this.storage.set("lat",data.allergens);
        // this.storage.set("cuisines",data.cuisines);
        // this.storage.set("service",data.service);
        this.allergens=data.allergens;
        this.cusines=data.cuisines;
        this.services=data.service;
        console.log(data.allergens);
        loading.dismiss();
        this.nav.setRoot(HomePage,{lat:this.lat,lng:this.lng});
        console.log({lat:this.lat,lng:this.lng});
    }, err => {
         loading.dismiss();
        console.log("Oops!");
        this.platform.exitApp();
    });




}).catch((error) => {
  loading.dismiss();
  this.platform.exitApp();
 // alert('Error getting location');
});
  }, 3000);



  }
  compareAllergens(allergens, selectedalgs){
    allergens.forEach(alg => {
      if (alg.id == selectedalgs.id) {
        alert(alg.id);
        //console.log(alg.id);
        //break;
      }else{
        console.log('nothing is selected');
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
