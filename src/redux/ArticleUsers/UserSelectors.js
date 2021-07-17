export const loggedInUserData = state => {
    return state.user.loggedInUserData
}

export const isUserAuthenticated = state => {
    return state.user.loggedInUserName
}