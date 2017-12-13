import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geofence } from '@ionic-native/geofence';
import { SMS } from '@ionic-native/sms';
import { Geolocation } from '@ionic-native/geolocation';
import { EmailComposer } from '@ionic-native/email-composer';
import { CallNumber } from '@ionic-native/call-number';

import { ActivePage } from '../active/active';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  emergencyNumber: any[] = ['0244612822','0267771306','0208234608'];
  centralNumber: string = '0244588584';
  centralEmail: any = 'pymira@gmail.com'
  error: any;
  success: any;

  constructor(public navCtrl: NavController,
    private platform: Platform,
    private geofence: Geofence,
    private geolocation: Geolocation,
    private sms: SMS,
    private email: EmailComposer,
    private call: CallNumber) {
    this.platform.ready().then(() => {

      geofence.initialize().then(
        () => console.log('Geofence Plugin Ready'),
        (err) => console.log(err)
      );

    });
  }

  sendByEmail(phone: string, email: string) {
    console.log('Submit geolocation via email');
    /**
     * get geolocation
     * get emergency numbers
     * send via email
     */

    this.geolocation.getCurrentPosition({
      enableHighAccuracy: true
    }).then((resp) => {
      let longitude = resp.coords.longitude;
      let latitude = resp.coords.latitude;
      let date = resp.timestamp;

      const phone = this.emergencyNumber,
            sender = this.centralEmail,
            to = 'hanson.peprah@outlook.com';

      const fence = {
        id: "001",
        latitude: latitude,
        longitude: longitude,
        date: new Date(date),
        emergencyNumber: this.emergencyNumber

      }

      // http.post() fence object to database here...
      
      //send fence via email
      let email = {
        to: [to,sender],
        cc: ['akrongeconnect@gmail.com','ayekoalex@gmail.com','oswaldano@gmail.com'],
        subject: 'FindMe Extreme Help',
        body: JSON.stringify(fence),
        isHtml: true
      };
      this.email.open(email);
      
      // send SMS
      this.sms.send(phone, 'An emergency alert check email!!!');      
    
      console.log('data sent  >>>', fence);
      console.log('Send email body >>>', email);
      
      this.navCtrl.push(ActivePage);

    }).catch((error) => {
      this.error = error;
      console.log('error: true', this.error);
    });

  }

  callCentral() {
    console.log('call our center ');
    /**
     * get geolocation
     * get emergency numbers
     * send via email
     * save in db
     * phone call to the center
     */
    this.call.callNumber(this.centralNumber, true)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));

    this.navCtrl.push(ActivePage);    
  }
}
