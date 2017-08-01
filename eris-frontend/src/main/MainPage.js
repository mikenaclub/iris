import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import UserDetail from '../share/UserDetail';
import Chat from "../chat/chat";

class MainPage extends Component {
    constructor() {
        super();
        this.state = {
            isAuthenticated: UserDetail.getInstance().isAuthenticated()
        }
    }

    logout = () => {
        UserDetail.getInstance().removeFromStorage();
        this.setState({isAuthenticated: false});
    }

    render() {
        if (!this.state.isAuthenticated) {
            return (
                <Redirect to="/"/>
            )
        }
        return (
            <div>
                Login!
                <button onClick={this.logout}>logout</button>
                <Chat/>
            </div>
        );
    }
}

export default MainPage;