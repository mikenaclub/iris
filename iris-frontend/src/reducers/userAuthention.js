const initialState =  {
    isAuthenticated: false
}

export default (state = initialState, action) => {
    switch(action.type){
        case 'USER_LOGOUT':
            return action;
        case 'USER_LOGIN':
            return action;
        default:
            return state
    }
}