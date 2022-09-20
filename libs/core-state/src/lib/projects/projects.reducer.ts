import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as ProjectsActions from './projects.actions';
import { Project } from '@project-angular/api-interfaces';

export const PROJECTS_FEATURE_KEY = 'projects';

export interface ProjectsState extends EntityState<Project> {
  selectedId?: string | number; // which Projects record has been selected
  loaded: boolean; // has the Projects list been loaded
  error?: string | null; // last known error (if any)
}

export interface ProjectsPartialState {
  readonly [PROJECTS_FEATURE_KEY]: ProjectsState;
}

export const projectsAdapter: EntityAdapter<Project> = createEntityAdapter();

export const initialProjectsState: ProjectsState = projectsAdapter.getInitialState(
  {
    // set initial required properties
    loaded: false,
  }
);

const onFailure = (state, { error }) => ({ ...state, error });

const _projectsReducer = createReducer(
  initialProjectsState,
  on(ProjectsActions.selectProject, (state, { selectedId }) =>
    Object.assign({}, state, { selectedId })
  ),
  on(ProjectsActions.resetSelectedProject, (state) =>
    Object.assign({}, state, { selectedId: null })
  ),
  on(ProjectsActions.resetProjects, (state) =>
    projectsAdapter.removeAll(state)
  ),
  // Load projects
  on(ProjectsActions.loadProjects, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ProjectsActions.loadProjectsSuccess, (state, { projects }) =>
    projectsAdapter.setAll(projects, { ...state, loaded: true })
  ),
  on(ProjectsActions.loadProjectsFailure, onFailure),
  // Load project
  on(ProjectsActions.loadProject, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ProjectsActions.loadProjectSuccess, (state, { project }) =>
    projectsAdapter.upsertOne(project, { ...state, loaded: true })
  ),
  on(ProjectsActions.loadProjectFailure, onFailure),
  // Add project
  on(ProjectsActions.createProjectSuccess, (state, { project }) =>
    projectsAdapter.addOne(project, state)
  ),
  on(ProjectsActions.createProjectFailure, onFailure),
  // Update project
  on(ProjectsActions.updateProjectSuccess, (state, { project }) =>
    projectsAdapter.updateOne({ id: project.id, changes: project }, state)
  ),
  on(ProjectsActions.updateProjectFailure, onFailure),
  // Delete project
  on(ProjectsActions.deleteProjectSuccess, (state, { project }) =>
    projectsAdapter.removeOne(project.id, state)
  ),
  on(ProjectsActions.deleteProjectFailure, onFailure)
);

export function projectsReducer(
  state: ProjectsState | undefined,
  action: Action
) {
  return _projectsReducer(state, action);
}
