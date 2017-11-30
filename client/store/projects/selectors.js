const getProjectsState = state => state.projects;
const getCurrentProjectState = state => getProjectsState(state).currentProject;
const getProjectsListState = state => getProjectsState(state).projectsList;

export const getCurrentProjectData = state => getCurrentProjectState(state).data;
export const getCurrentProjectId = state => getCurrentProjectData(state)._id || null;
export const getProjectsList = state => getProjectsListState(state).data;
