const getProjectsState = (state) => (state.projects);
const getCurrentProject = (state) => (getProjectsState(state).currentProject);
const getCurrentProjectData = (state) => (getCurrentProject(state).data);

export const getCurrentProjectId = (state) => (getCurrentProjectData(state)._id);
