import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
public data: any;
lat: number = 51.678418;
  lng: number = 7.809007;

  constructor(private storage: Storage,public navCtrl: NavController,public geo: Geolocation,public loadingCtrl: LoadingController,public http: Http) {
 
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
        
        this.storage.set("allergens",data.allergens);
        this.storage.set("cuisines",data.cuisines);
        this.storage.set("service",data.service);
        console.log(data.allergens);
        loading.dismiss();
      }, err => {
         loading.dismiss();
        console.log("Oops!");
    });




}).catch((error) => {
  loading.dismiss();
  alert('Error getting location');
});
  }, 3000);





  }

}
