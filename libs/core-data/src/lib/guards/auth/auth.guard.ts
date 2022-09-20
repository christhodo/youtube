import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthGuardService } from '../../auth/auth-guard.service';
import { NotifyService } from '../../notify.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private route: Router,
    private authGuardService: AuthGuardService,
    private notify: NotifyService
  ) {}

  canActivate() {
    if (!this.authGuardService.isAuthenticated.value) {
      this.notify.notify('Invaild User');
      return false;
    } else {
      this.notify.notify('Succesfully Logged In');
      return true;
    }
  }
}
