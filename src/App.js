import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import './App.css';
import {Button} from 'semantic-ui-react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import FullHeader from './layout/Header-full';
import Header from './layout/Header';
import LoginFrom from './Login/Login';

const Home = () => (
    <div className="App-home">
        <p className="App-intro">
            Welcome back!
        </p>
        <Button.Group size='massive'>
            <Link to="/Login"><Button positive>Login</Button></Link>
            <Button.Or text='or'/>
            <Link to="/Register"><Button secondary>Register</Button></Link>
        </Button.Group>
    </div>
);


const Register = () => (
    <div className="App-home">
        <h1>Register</h1>
        <Link to="..">back</Link>
    </div>
);

class App extends Component {
    render() {
        return (
            <div >
                <Router>
                    <div className="App">
                        <Route render={({history: {location}}) =>
                            <div>

                                <TransitionGroup className="App-detail-Transition">
                                    <CSSTransition key={location.key} timeout={1000} classNames="test"
                                                   mountOnEnter={true}
                                                   unmountOnExit={true}>
                                        <Switch location={location}>
                                            <Route exact path="/" component={FullHeader}/>
                                            <Route component={Header}/>
                                        </Switch>
                                    </CSSTransition>
                                </TransitionGroup>
                            </div>
                        }/>
                        <Route render={({history: {location}}) =>
                            <div className="App-detail">
                                <TransitionGroup className="App-detail-Transition">
                                    <CSSTransition key={location.key} timeout={1000} classNames="fade"
                                                   mountOnEnter={true}
                                                   unmountOnExit={true}>
                                        <Switch location={location}>
                                            <Route exact path="/" component={Home}/>
                                            <Route path="/Login" component={LoginFrom}/>
                                            <Route path="/Register" component={Register}/>
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
