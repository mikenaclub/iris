/**
 * Created by neetc on 7/15/2017.
 */
import React, {Component} from 'react';
import logo from '../logo.svg';
import './Header-full.css'
class FullHeader extends Component {
    render() {
        return (
            <div className="App-header-full">
                <img src={logo} className="App-logo" alt="logo"/>
                <h2>Monoitio</h2>
            </div>
        )
    }
}
export default FullHeader;