import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreDataModule } from '@project-angular/core-data';
import { CoreStateModule } from '@project-angular/core-state';
import { EnvironmentModule } from '@project-angular/environment';
import { MaterialModule } from '@project-angular/material';
import { UiLoginModule } from '@project-angular/ui-login';
import { AppComponent } from './app.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { ProjectsListComponent } from './projects/projects-list/projects-list.component';
import { ProjectsComponent } from './projects/projects.component';
import { RoutingModule } from './routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    ProjectsListComponent,
    ProjectDetailsComponent,
    ProfilesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CoreDataModule,
    CoreStateModule,
    MaterialModule,
    UiLoginModule,
    EnvironmentModule,
    RoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
