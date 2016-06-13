import {Directive, ComponentRef, Attribute, ComponentFactory, ResolvedReflectiveProvider, ReflectiveInjector} from '@angular/core';
import {ActivatedRoute, RouterOutletMap, PRIMARY_OUTLET} from '@angular/router';

import {Nav} from './nav';
import {ViewController} from './view-controller';

/**
 * @private
 */
@Directive({
  selector: 'ion-nav'
})
export class NavRouter {
  private _activatedRoute: ActivatedRoute;
  public outletMap: RouterOutletMap;


  constructor(parentOutletMap: RouterOutletMap, @Attribute('name') name: string, private nav: Nav) {
    parentOutletMap.registerOutlet(name ? name : PRIMARY_OUTLET, <any>this);
    nav.registerRouter(this);
  }

  get isActivated(): boolean {
    return false;
  }

  get component(): Object {
    return null;
  }

  get activatedRoute(): ActivatedRoute {
    return null;
  }

  deactivate(): void {}

  activate(
      factory: ComponentFactory<any>, activatedRoute: ActivatedRoute,
      providers: ResolvedReflectiveProvider[], outletMap: RouterOutletMap): void {
debugger
    this.nav.push(activatedRoute.component);

    this.outletMap = outletMap;
    this._activatedRoute = activatedRoute;
    // const inj = ReflectiveInjector.fromResolvedProviders(providers, this.location.parentInjector);
    // this.activated = this.location.createComponent(factory, this.location.length, inj, []);
  }

  stateChange(direction: string, enteringView: ViewController) {
    console.debug(`nav router, state change, ${direction}, ${enteringView.name}`);


  }
}
