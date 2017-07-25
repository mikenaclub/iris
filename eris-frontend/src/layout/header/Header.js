import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import FullHeader from './Header-full';
import SmallHeader from './Header-small';

class Header extends Component {
    render() {
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