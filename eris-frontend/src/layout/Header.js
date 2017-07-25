/**
 * Created by neetc on 7/15/2017.
 */
import React, {Component} from 'react';
import logo from '../logo.svg';
import './Header.css'
import {CSSTransition} from 'react-transition-group';
import AppSetting from '../share/app-setting';
import {Button, Dropdown} from 'semantic-ui-react';
import AppLanguage from '../share/app-langauge'

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
                        <div> {AppSetting.AppName} - {AppSetting.AppVersion} </div>
                        &nbsp;&nbsp;

                        <Button.Group size="small" color='blue'>
                            <Dropdown floating button options={AppLanguage}
                                      defaultValue={AppLanguage[0].value}/>
                        </Button.Group>
                    </div>
                </CSSTransition>
            </div>
        )
    }
}

export default Header;