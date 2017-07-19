/**
 * Created by neetc on 7/15/2017.
 */
import React, {Component} from 'react';
import logo from '../logo.svg';
import './Header.css'
import {CSSTransition} from 'react-transition-group';

class Header extends Component {
    constructor(...args) {
        super(...args);
        this.state = {show: false}
    }

    componentDidMount() {
        this.setState({show: true})
    }

    componentWillUnmount() {
        this.setState({show: false})
    }

    render() {
        return (
            <div>
                <CSSTransition
                    timeout={5000}
                    classNames="App-header-small"
                    in={this.state.show}
                    mountOnEnter={true}
                    unmountOnExit={true}
                >
                    <div className="App-header">
                        <img src={logo} className="App-logo-small" alt="logo"/>
                        <p> Monoitio - Pre-release 0.1.4 </p>
                    </div>
                </CSSTransition>
            </div>
        )
    }
}
export default Header;