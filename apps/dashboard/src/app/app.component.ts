import { Component } from '@angular/core';
import { AuthGuardService } from '@project-angular/core-data';

@Component({
  selector: 'project-angular-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = '';

  links = [{ path: '/projects', icon: 'view_list', title: 'Directory' }];

  userIsAuthenticated = this.authService.isAuthenticated;
  constructor(private authService: AuthGuardService) {}
}
