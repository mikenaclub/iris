/**
 * Created by neetc on 7/15/2017.
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import logo from '../../logo.svg';
import './Header-small.css'
import {CSSTransition} from 'react-transition-group';
import AppSetting from '../../share/app-setting';
import {Button, Dropdown} from 'semantic-ui-react';
import AppLanguage from '../../share/app-langauge'

class SmallHeader extends Component {
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
                        <Link to="/"><img src={logo} className="App-logo-small" alt="logo"/></Link>
                        <div className="App-title"> {AppSetting.AppName} - {AppSetting.AppVersion} </div>

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

export default SmallHeader;