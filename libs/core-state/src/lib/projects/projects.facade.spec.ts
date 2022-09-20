import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { ProjectsEntity } from './projects.models';
import { ProjectsEffects } from './projects.effects';
import { ProjectsFacade } from './projects.facade';

import * as ProjectsSelectors from './projects.selectors';
import * as ProjectsActions from './projects.actions';
import {
  PROJECTS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './projects.reducer';

interface TestSchema {
  projects: State;
}

describe('ProjectsFacade', () => {
  let facade: ProjectsFacade;
  let store: Store<TestSchema>;
  const createProjectsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ProjectsEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(PROJECTS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([ProjectsEffects]),
        ],
        providers: [ProjectsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(ProjectsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allProjects$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(ProjectsActions.loadProjects());

        list = await readFirst(facade.allProjects$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadProjectsSuccess` to manually update list
     */
    it('allProjects$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allProjects$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          ProjectsActions.loadProjectsSuccess({
            projects: [
              createProjectsEntity('AAA'),
              createProjectsEntity('BBB'),
            ],
          })
        );

        list = await readFirst(facade.allProjects$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
