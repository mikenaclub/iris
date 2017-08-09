class UserDetail {
    constructor(username) {
        this.username = username;
    }

    static getInstance() {
        let userRepository = {};
        if (localStorage.getItem('user') === null) {
            userRepository = new UserDetail(null);
        }
        else {
            let user = JSON.parse(localStorage.getItem('user'));
            userRepository = new UserDetail(user.username);
        }
        return userRepository;
    }
}

UserDetail.prototype.isAuthenticated = function () {
    return this.username !== null;
}
UserDetail.prototype.setUserInfo = function (user) {
    this.username = user.username;
    return this;
}
UserDetail.prototype.setToLocalStorage = function () {
    localStorage.setItem('user', JSON.stringify(this));
}
UserDetail.prototype.removeFromStorage = function () {
    localStorage.removeItem('user');
}


export default UserDetail;
