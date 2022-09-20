import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from './toolbar/toolbar/toolbar.component';
import { WildComponent } from './wild/wild/wild.component';
import { LoginComponent } from './login/login/login.component';
import { MaterialModule } from '@project-angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ToolbarComponent, WildComponent, LoginComponent],
  exports: [ToolbarComponent, WildComponent, LoginComponent],
})
export class UiLoginModule {}
