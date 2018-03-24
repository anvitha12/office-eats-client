import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ManagerService } from './manager.service';

@Injectable()
export class ManagerGuard implements CanActivate {

  constructor( private managerService: ManagerService ) {
  }

  canActivate() {
      return this.managerService.getManagerDetails().map((data) => {
        if (data.status === 200) {
          this.managerService._setManagerDetails(data.user_details);
          return true;
        }
      });
  }
}
