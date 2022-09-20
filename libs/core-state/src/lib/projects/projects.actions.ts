import { createAction, props } from '@ngrx/store';
import { Project } from '@project-angular/api-interfaces';

export const resetSelectedProject = createAction(
  '[Projects] Reset Selected Project'
);
export const resetProjects = createAction('[Projects] Reset Projects');

// select Project
export const selectProject = createAction(
  '[Projects] Select Project',
  props<{ selectedId: string }>()
);
// load Projects
export const loadProjects = createAction('[Projects] Load Projects');

export const loadProjectsSuccess = createAction(
  '[Projects] Load Projects Success',
  props<{ projects: Project[] }>()
);

export const loadProjectsFailure = createAction(
  '[Projects] Load Projects Failure',
  props<{ error: any }>()
);

// load Project
export const loadProject = createAction(
  '[Projects] Load Project',
  props<{ projectId: string }>()
);

export const loadProjectSuccess = createAction(
  '[Projects] Load Project Success',
  props<{ project: Project }>()
);

export const loadProjectFailure = createAction(
  '[Projects] Load Project Failure',
  props<{ error: any }>()
);

// create Project
export const createProject = createAction(
  '[Projects] create Project',
  props<{ project: Project }>()
);

export const createProjectSuccess = createAction(
  '[Projects] create Project Success',
  props<{ project: Project }>()
);

export const createProjectFailure = createAction(
  '[Projects] create Project Failure',
  props<{ error: any }>()
);

// update Project
export const updateProject = createAction(
  '[Projects] update Project',
  props<{ project: Project }>()
);

export const updateProjectSuccess = createAction(
  '[Projects] update Project Success',
  props<{ project: Project }>()
);

export const updateProjectFailure = createAction(
  '[Projects] update Project Failure',
  props<{ error: any }>()
);

// delete Project
export const deleteProject = createAction(
  '[Projects] Delete Project',
  props<{ project: Project }>()
);

export const deleteProjectCancelled = createAction(
  '[Projects] Delete Project Cancelled'
);

export const deleteProjectSuccess = createAction(
  '[Projects] Delete Project Success',
  props<{ project: Project }>()
);

export const deleteProjectFailure = createAction(
  '[Projects] Delete Project Failure',
  props<{ error: any }>()
);
