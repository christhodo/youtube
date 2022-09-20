import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { Project } from '@project-angular/api-interfaces';
import { map } from 'rxjs/operators';
import * as fromProjects from './projects.reducer';
import * as ProjectsActions from './projects.actions';
import { ProjectsService } from '@project-angular/core-data';

@Injectable()
export class ProjectsEffects {
  loadProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectsActions.loadProjects),
      fetch({
        run: (action) =>
          this.projectsService
            .all()
            .pipe(
              map((projects: Project[]) =>
                ProjectsActions.loadProjectsSuccess({ projects })
              )
            ),
        onError: (action, error) =>
          ProjectsActions.loadProjectsFailure({ error }),
      })
    )
  );

  loadProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectsActions.loadProject),
      fetch({
        run: (action) =>
          this.projectsService
            .find(action.projectId)
            .pipe(
              map((project: Project) =>
                ProjectsActions.loadProjectSuccess({ project })
              )
            ),
        onError: (action, error) =>
          ProjectsActions.loadProjectFailure({ error }),
      })
    )
  );

  createProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectsActions.createProject),
      pessimisticUpdate({
        run: (action) =>
          this.projectsService
            .create(action.project)
            .pipe(
              map((project: Project) =>
                ProjectsActions.createProjectSuccess({ project })
              )
            ),
        onError: (action, error) =>
          ProjectsActions.createProjectFailure({ error }),
      })
    )
  );

  updateProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectsActions.updateProject),
      pessimisticUpdate({
        run: (action) =>
          this.projectsService
            .update(action.project)
            .pipe(
              map((project: Project) =>
                ProjectsActions.updateProjectSuccess({ project })
              )
            ),
        onError: (action, error) =>
          ProjectsActions.updateProjectFailure({ error }),
      })
    )
  );

  deleteProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectsActions.deleteProject),
      pessimisticUpdate({
        run: (action) =>
          this.projectsService
            .delete(action.project)
            .pipe(
              map((project: Project) =>
                ProjectsActions.deleteProjectSuccess({ project })
              )
            ),
        onError: (action, error) =>
          ProjectsActions.deleteProjectFailure({ error }),
      })
    )
  );

  constructor(
    private actions$: Actions,
    private projectsService: ProjectsService
  ) {}
}
