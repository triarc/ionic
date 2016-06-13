import {Directive, ElementRef, Renderer, Optional, Input, HostListener, HostBinding, OnChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {NavController} from './nav-controller';


/**
 * @name NavPush
 * @description
 * Directive for declaratively linking to a new page instead of using
 * {@link ../NavController/#push NavController.push}. Similar to ui-router's `ui-sref`.
 *
 * @usage
 * ```html
 * <button [navPush]="pushPage"></button>
 * ```
 *
 * To specify parameters you can use array syntax or the `navParams` property:
 *
 * ```html
 * <button [navPush]="pushPage" [navParams]="params">Go</button>
 * ```
 *
 * Where `pushPage` and `params` are specified in your component, and `pushPage`
 * contains a reference to a [@Page component](../../../config/Page/):
 *
 * ```ts
 * import {LoginPage} from './login';
 *
 * @Component({
 *   template: `<button [navPush]="pushPage" [navParams]="params">Go</button>`
 * })
 * class MyPage {
 *   constructor(){
 *     this.pushPage = LoginPage;
 *     this.params = { id: 42 };
 *   }
 * }
 * ```
 *
 * @demo /docs/v2/demos/navigation/
 * @see {@link /docs/v2/components#navigation Navigation Component Docs}
 * @see {@link ../NavPop NavPop API Docs}
 *
 */
@Directive({
  selector: '[navPush]'
})
export class NavPush implements OnChanges {
  private commands: any[] = [];

  // the url displayed on the anchor element.
  @HostBinding() href: string;

  /**
   * @input {Page} The Page to push onto the Nav.
   */
  @Input()
  set navPush(data: any[]|string) {
    if (Array.isArray(data)) {
      this.commands = <any>data;
    } else {
      this.commands = [data];
    }
  }

  /**
   * @input {any} Parameters to pass to the page.
   */
  @Input() navParams: {[k: string]: any};

  /**
   * @private
   */
  @Input() fragment: string;

  /**
   * @private
   */
  @Input() target: string;


  constructor(
    @Optional() private _nav: NavController,
    private router: Router,
    private route: ActivatedRoute,
    elementRef: ElementRef,
    renderer: Renderer
  ) {
    if (!_nav) {
      console.error('navPush must be within a NavController');
    }

    if (elementRef.nativeElement.tagName !== 'A') {
      renderer.setElementAttribute(elementRef.nativeElement, 'role', 'link');
    }
  }

  @HostListener('click')
  onClick(): boolean {
    // If no target, or if target is _self, prevent default browser behavior
    if (this._nav && (!(typeof this.target === 'string') || this.target == '_self')) {

    // const tree = this.router.createUrlTree(
    //     this.commands,
    //     {relativeTo: this.route, queryParams: this.navParams, fragment: this.fragment});

    //   this._nav.push(this.navPush, this.navParams);

      return false;
    }

    return true;
  }

  ngOnChanges(changes: {}): any { this.updateTargetUrlAndHref(); }

  private updateTargetUrlAndHref(): void {
    const tree = this.router.createUrlTree(
        this.commands,
        {relativeTo: this.route, queryParams: this.navParams, fragment: this.fragment});
    if (tree) {
      this.href = this.router.serializeUrl(tree) || '#';
    }
  }
}
