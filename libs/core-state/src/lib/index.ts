import { Params } from '@angular/router';
import { ActionReducerMap } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import * as fromProjects from './projects/projects.reducer';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

// ---------------------------------------
// Core State and Reducers
// ---------------------------------------

export interface AppState {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
  [fromProjects.PROJECTS_FEATURE_KEY]: fromProjects.ProjectsState;
}

export const reducers: ActionReducerMap<AppState> = {
  router: fromRouter.routerReducer,
  [fromProjects.PROJECTS_FEATURE_KEY]: fromProjects.projectsReducer,
};
