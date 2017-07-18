/**
 * Created by neetc on 7/15/2017.
 */
import React, {Component} from 'react';
import logo from '../logo.svg';
import './Header-full.css'
import {CSSTransition} from 'react-transition-group';

class FullHeader extends Component {
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
                    classNames="App-header-full"
                    in={this.state.show}
                    mountOnEnter={true}
                    unmountOnExit={true}
                >
                    <div className="App-header-full">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h2> Monoitio - Pre-release 0.1.3 </h2>
                    </div>
                </CSSTransition>
            </div>
        )
    }
}
export default FullHeader;