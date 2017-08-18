export const userLogin = (username) => ({
    type: 'USER_LOGIN',
    isAuthenticated: true,
    username: username
})
export const userLogout = () => ({
    type: 'USER_LOGOUT',
    isAuthenticated: false
})