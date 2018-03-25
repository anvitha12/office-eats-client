import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { StorageService } from '../services/storage.service';

@Injectable()
export class AuthorizeGuard implements CanActivate {
  constructor(private router: Router, private storageService: StorageService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.storageService.retrieve('currentUser')) {
        // logged in so return true
        return true;
    }

    // not logged in so redirect to login page
    this.router.navigate(['/auth/sign-in'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
