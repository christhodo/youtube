import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { ProjectsEffects } from './projects.effects';
import * as ProjectsActions from './projects.actions';

describe('ProjectsEffects', () => {
  let actions: Observable<any>;
  let effects: ProjectsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        ProjectsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(ProjectsEffects);
  });

  describe('loadProjects$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ProjectsActions.loadProjects() });

      const expected = hot('-a-|', {
        a: ProjectsActions.loadProjectsSuccess({ projects: [] }),
      });

      expect(effects.loadProjects$).toBeObservable(expected);
    });
  });
});
