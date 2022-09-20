import { ProjectsEntity } from './projects.models';
import { State, projectsAdapter, initialState } from './projects.reducer';
import * as ProjectsSelectors from './projects.selectors';

describe('Projects Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getProjectsId = (it) => it['id'];
  const createProjectsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ProjectsEntity);

  let state;

  beforeEach(() => {
    state = {
      projects: projectsAdapter.setAll(
        [
          createProjectsEntity('PRODUCT-AAA'),
          createProjectsEntity('PRODUCT-BBB'),
          createProjectsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Projects Selectors', () => {
    it('getAllProjects() should return the list of Projects', () => {
      const results = ProjectsSelectors.getAllProjects(state);
      const selId = getProjectsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = ProjectsSelectors.getSelected(state);
      const selId = getProjectsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getProjectsLoaded() should return the current 'loaded' status", () => {
      const result = ProjectsSelectors.getProjectsLoaded(state);

      expect(result).toBe(true);
    });

    it("getProjectsError() should return the current 'error' state", () => {
      const result = ProjectsSelectors.getProjectsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
