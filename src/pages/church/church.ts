import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Geofence } from '@ionic-native/geofence';
import { SMS } from '@ionic-native/sms';
import { Geolocation } from '@ionic-native/geolocation';
import { CallNumber } from '@ionic-native/call-number';

import { ActivePage } from '../active/active';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  radius: number = 100;
  error: any;
  success:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private platform: Platform, 
    private geofence: Geofence,
    private geolocation: Geolocation,
    private sms: SMS,
    private call: CallNumber) {
      this.platform.ready().then(() => {
        
     geofence.initialize().then(
       () => console.log('Geofence Plugin Ready'),
       (err) => console.log(err)
     );
     
   });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SosPage');
  }

  setGeofence(value: number) {
    this.geolocation.getCurrentPosition({
      enableHighAccuracy: true
    }).then((resp) => {
      var longitude = resp.coords.longitude;
      var latitude = resp.coords.latitude;
      var radius = value;

      let fence = {
          id: "myGeofenceID1", 
          latitude:       latitude, 
          longitude:      longitude,
          radius:         radius,  
          transitionType: 2,
          phone: '0244588584, 0267771306'
        }
      
        this.geofence.addOrUpdate(fence).then(
          () => this.success = true,
          (err) => this.error = "Failed to add or update the fence."
        );

        this.geofence.onTransitionReceived().subscribe(resp => {
          this.sms.send('0244612822', JSON.stringify(fence));
        });
        console.log('setlocation >>>',fence);
        this.navCtrl.push(ActivePage);

    }).catch((error) => {
      this.error = error;
      console.log('error: true', this.error);
    });
  }
  
  callCenter(value: number){
    console.log('get value', value);
    this.call.callNumber('024412822', true)
    this.sms.send('0244588584', JSON.stringify(this.success))
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));

    this.navCtrl.push(ActivePage);
  }

}
