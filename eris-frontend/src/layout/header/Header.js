import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import FullHeader from './Header-full';
import SmallHeader from './Header-small';
import UserDetail from '../../share/UserDetail'

class Header extends Component {
    render() {
        if (UserDetail.getInstance().isAuthenticated()) {
            return (
                <div></div>
            )
        }

        return (
            <Switch>
                <Route exact path="/" component={FullHeader}/>
                <Route exact path="/login" component={SmallHeader}/>
                <Route exact path="/register" component={SmallHeader}/>
            </Switch>
        )
    }
}

export default Header;