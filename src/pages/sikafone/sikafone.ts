import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';


import { ActivePage } from '../active/active';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-sikafone',
  templateUrl: 'sikafone.html'
})
export class SikafonePage {
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private platform: Platform, 
   ) {
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SikafonePage');
  }

  removeFence() {
    this.navCtrl.push(HomePage);
  }

}
