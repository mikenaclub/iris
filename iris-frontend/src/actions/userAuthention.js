export const userLogout = () => ({
    type: 'USER_LOGOUT',
    isAuthenticated: false
})
export const userLogin = () => ({
    type: 'USER_LOGIN',
    isAuthenticated: true
})