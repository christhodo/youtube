import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '@project-angular/api-interfaces';

@Component({
  selector: 'project-angular-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent {
  currentProject: Project;
  originalTitle = '';
  @Input() set project(value: Project) {
    if (value) this.originalTitle = value.name;
    this.currentProject = { ...value };
  }
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();
}
