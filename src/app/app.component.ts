import { Component, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  public viewContainerRef: ViewContainerRef;

  constructor(public toastr: ToastsManager, viewContainerRef: ViewContainerRef) {
    this.viewContainerRef = viewContainerRef;

    this.toastr.setRootViewContainerRef(viewContainerRef);
  }
}
