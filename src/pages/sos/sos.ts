import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Geofence } from '@ionic-native/geofence';
import { SMS } from '@ionic-native/sms';
import { Geolocation } from '@ionic-native/geolocation'
import { ActivePage } from '../active/active';

/**
 * Generated class for the SosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sos',
  templateUrl: 'sos.html',
})
export class SosPage {
  radius: number = 100;
  error: any;
  success:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private platform: Platform, 
    private geofence: Geofence,
    private geolocation: Geolocation,
    private sms: SMS) {
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
          transitionType: 2
        }
      
        this.geofence.addOrUpdate(fence).then(
          () => this.success = true,
          (err) => this.error = "Failed to add or update the fence."
        );

        this.geofence.onTransitionReceived().subscribe(resp => {
          this.sms.send('0244588584', 'Nana just left the premises');
        });
        console.log('setlocation >>>',fence);
        this.navCtrl.push(ActivePage);


    }).catch((error) => {
      this.error = error;
      console.log('error: true', this.error);
    });
  }
  

}
