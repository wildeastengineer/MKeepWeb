export const isAuthenticated = (state) => {
    return state.user.authorized === true;
};
