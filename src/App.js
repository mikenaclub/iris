import React, {Component} from 'react';
import {Router, Route, Link, Switch} from 'react-router-dom';
import {createBrowserHistory, createHashHistory} from 'history';
import './App.css';
import {Button} from 'semantic-ui-react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import FullHeader from './layout/Header-full';
import Header from './layout/Header';
import LoginFrom from './Login/Login';

const history = ()=>{
    return window.matchMedia('(display-mode: standalone)').matches
        ? createHashHistory()
        : createBrowserHistory()
}

const Home = () => (
    <div className="App-home">
        <p className="App-intro">
            Welcome!
        </p>
        <Button.Group size='massive'>
            <Link to="/Login"><Button positive>Login</Button></Link>
            <Button.Or text='or'/>
            <Link to="/Register"><Button secondary>Register</Button></Link>
        </Button.Group>
    </div>
);

class App extends Component {
    constructor(...args) {
        super(...args);
        this.state = {show: false}
    }


    render() {
        return (
            <div >
                <Router history={history}>
                    <div className="App">
                        <Switch>
                            <Route exact path="/" component={FullHeader}/>
                            <Route component={Header}/>
                        </Switch>
                        <Route render={({history: {location}}) =>
                            <div className="App-detail">
                                <TransitionGroup className="App-detail-Transition">
                                    <CSSTransition key={location.key} timeout={1000} classNames="fade"
                                                   mountOnEnter={true}
                                                   unmountOnExit={true}>
                                        <Switch>
                                            <Route exact path="/" component={Home}/>
                                            <Route children={() => (
                                                <Switch>
                                                    <Route path="/Login" component={LoginFrom}/>
                                                    <Route path="/Register" component={Register}/>
                                                </Switch>
                                            )}/>
                                        </Switch>
                                    </CSSTransition>
                                </TransitionGroup>
                            </div>
                        }/>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
