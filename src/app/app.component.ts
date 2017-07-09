import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;
  //data arrays def
  allergens: Array<{id: string, allergen: any}>;
  cusines: Array<{id: string, cusine: any}>;
  services: Array<{id: string, serviceStyle: any}>;
  //selected val
  selectedalgs: Array<{id: string, allergen: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
   
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
    ];
    // init data arrays
    this.allergens = [
      {id: '1',allergen: 'Peanuts'},
      {id: '2',allergen: 'Mushrooms'},
      {id: '3',allergen: 'Woffels'},
      {id: '4',allergen: 'Nuts'},
    ];
    this.cusines = [
      {id: '1',cusine: 'Chinese'},
    ];
    this.services = [
      {id: '1',serviceStyle: 'Desi'},
    ];

    //selected val
    this.selectedalgs = [
      {id:'1',allergen: 'Peanuts'},
    ];

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
