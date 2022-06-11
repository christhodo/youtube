import { Component, OnInit } from '@angular/core';
import { AuthGuardService, ProjectsService } from '@project-angular/core-data';
import { Project } from '@project-angular/api-interfaces';
import { ProjectsFacade } from '@project-angular/core-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'project-angular-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  allProjects$: Observable<Project[]> = this.projectsFacade.allProjects$;
  selectedProject$: Observable<Project> = this.projectsFacade.selectedProjects$;
  videos: any[];

  constructor(
    private projectsFacade: ProjectsFacade,
    private projectsService: ProjectsService
  ) {}

  ngOnInit(): void {
    this.reset();
    this.projectsFacade.mutations$.subscribe((_) => this.reset());
  }

  reset() {
    this.loadProjects();
    this.selectProject(null);
  }

  resetForm() {
    this.selectProject(null);
  }

  selectProject(project: Project) {
    this.projectsFacade.selectProject(project?.id);
  }

  loadProjects() {
    this.projectsFacade.loadProjects();
  }

  saveProject(project: Project) {
    this.projectsFacade.saveProject(project);
  }

  deleteProject(project: Project) {
    this.projectsFacade.deleteProject(project);
  }
}
