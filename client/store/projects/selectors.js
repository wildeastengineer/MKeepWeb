const getProjectsState = (state) => (state.projects);
const getCurrentProject = (state) => (getProjectsState(state).currentProject);
const getCurrentProjectData = (state) => (getCurrentProject(state).data);

export const getCurrentProjectId = (state) => {
    const currentProjectData = getCurrentProjectData(state);

    return currentProjectData ?
        currentProjectData._id :
        null;
};
