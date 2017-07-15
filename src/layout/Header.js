/**
 * Created by neetc on 7/15/2017.
 */
import React, {Component} from 'react';
import logo from '../logo.svg';
import './Header.css'

class Header extends Component {
    render() {
        return (
            <div className="App-header">
                <img src={logo} className="App-logo-small" alt="logo"/>
                <p>Monoitio</p>
            </div>
        )
    }
}
export default Header;