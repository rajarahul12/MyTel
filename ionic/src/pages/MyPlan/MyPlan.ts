import { Component, Renderer, NgZone } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { DataStore } from '../../app/dataStore';
@Component({
  selector: 'page-MyPlan',
  templateUrl: 'MyPlan.html'
})
export class MyPlanPage {
  constructor(
    private zone: NgZone,
    public navCtrl: NavController,
    public renderer: Renderer,
    public dataStore: DataStore
  ) {}
  username = (this.dataStore as any).username || 'USER';
  items = [];
  details = [];
  getUserDet() {
    console.log(this);
    const self = this;
    var resourceRequest = new WLResourceRequest(
      'https://my-json-server.typicode.com/sangeetmanghnani/tele/posts',
      WLResourceRequest.GET,
      { useAPIProxy: false }
    );
    resourceRequest.send().then(
      response => {
        alert('Success: ' + response.responseText);
        // initalize values here
        let details = JSON.parse(response.responseText);
        console.log(details);
        self.zone.run(() => {
          this.details = details[0];
          this.items = [...details[0].plans];
          console.log(this.items);
        });
      },
      response => {
        alert('Failure: ' + JSON.stringify(response));
      }
    );
  }
  ionViewDidLoad() {
    this.getUserDet();
    WL.Analytics.log(
      {
        fromPage: this.navCtrl.getPrevious(this.navCtrl.getActive()).name,
        toPage: this.navCtrl.getActive().name
      },
      'PageTransition '
    );
    WL.Analytics.send();
      WL.Analytics.log({ fromPage: this.navCtrl.getPrevious(this.navCtrl.getActive()).name, toPage: this.navCtrl.getActive().name }, 'PageTransition ');
  }
}
