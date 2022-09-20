import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { select, Store, Action, ActionsSubject } from '@ngrx/store';
import { Project } from '@project-angular/api-interfaces';
import * as ProjectsActions from './projects.actions';
import * as ProjectsSelectors from './projects.selectors';

@Injectable()
export class ProjectsFacade {
  loaded$ = this.store.pipe(select(ProjectsSelectors.getProjectsLoaded));
  allProjects$ = this.store.pipe(select(ProjectsSelectors.getAllProjects));
  selectedProjects$ = this.store.pipe(
    select(ProjectsSelectors.getSelectedProject)
  );

  mutations$ = this.actions$.pipe(
    filter(
      (action: Action) =>
        action.type === ProjectsActions.createProject({} as any).type ||
        action.type === ProjectsActions.updateProject({} as any).type ||
        action.type === ProjectsActions.deleteProject({} as any).type
    )
  );

  constructor(private store: Store, private actions$: ActionsSubject) {}

  selectProject(selectedId: string) {
    this.dispatch(ProjectsActions.selectProject({ selectedId }));
  }

  loadProjects() {
    this.dispatch(ProjectsActions.loadProjects());
  }

  loadProject(projectId: string) {
    this.dispatch(ProjectsActions.loadProject({ projectId }));
  }

  saveProject(project: Project) {
    if (project.id) {
      this.updateProject(project);
    } else {
      this.createProject(project);
    }
  }

  createProject(project: Project) {
    this.dispatch(ProjectsActions.createProject({ project }));
  }

  updateProject(project: Project) {
    this.dispatch(ProjectsActions.updateProject({ project }));
  }

  deleteProject(project: Project) {
    this.dispatch(ProjectsActions.deleteProject({ project }));
  }
  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
