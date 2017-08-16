const initialState =  {
    isAuthenticated: false
}

export default (state = initialState, action) => {
    switch(action.type){
        case 'USER_LOGOUT':
            return action.isAuthenticated;
        case 'USER_LOGIN':
            return action.isAuthenticated;
        default:
            return state.isAuthenticated
    }
}