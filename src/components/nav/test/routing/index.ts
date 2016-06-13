import {Component, provide} from '@angular/core';
import {Location} from '@angular/common';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {provideRouter} from '@angular/router';
import * as router from '@angular/router';
import {ionicBootstrap, NavParams, ViewController} from '../../../../../src';


@Component({
  selector: 'ion-page',
  templateUrl: 'view1.html'
})
class View1Cmp {
  path: string;
  windowHash: string;

  constructor(location: Location, private viewCtrl: ViewController) {
    this.path = location.path();
    console.log(`View1Cmp, path: ${this.path}`);
  }

  ionViewDidEnter() {
    this.windowHash = window.location.hash;
  }
}


@Component({
  selector: 'ion-page',
  templateUrl: 'view2.html'
})
class View2Cmp {
  path: string;
  windowHash: string;

  constructor(location: Location, private viewCtrl: ViewController) {
    this.path = location.path();
    console.log(`View2Cmp, path: ${this.path}`);
  }

  ionViewDidEnter() {
    this.windowHash = window.location.hash;
  }
}


@Component({
  selector: 'ion-page',
  templateUrl: 'view3.html'
})
class View3Cmp {
  id: string;
  path: string;
  windowHash: string;

  constructor(params: NavParams, location: Location, private viewCtrl: ViewController) {
    this.id = params.get('id');
    this.path = location.path();
    console.log(`View3Cmp, path: ${this.path}, param id: ${this.id}`);
  }

  ionViewDidEnter() {
    this.windowHash = window.location.hash;
  }
}


@Component({
  template: '<ion-nav></ion-nav>'
})
class E2EApp {
  constructor() {

  }
}


const routes = [
  { path: '/',  component: View1Cmp, index: true },
  { path: 'view2', component: View2Cmp },
  { path: 'view3/:id', component: View3Cmp }
];


export const APP_ROUTER_PROVIDERS: any[] = [
  provideRouter(routes),
  provide(LocationStrategy, {useClass: HashLocationStrategy}),
];


ionicBootstrap(E2EApp, APP_ROUTER_PROVIDERS);
