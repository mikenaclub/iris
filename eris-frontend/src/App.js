import React, {Component} from 'react';
import {BrowserRouter, HashRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Homepage from './homepage/Homepage';
import LoginFrom from './login/Login';
import RegisterForm from './register/Register';
import Header from './layout/header/Header';

const AppRouter = window.matchMedia('(display-mode: standalone)').matches
    ? HashRouter
    : BrowserRouter;

const AppDetail = () => (
    <Route render={({history: {location}}) =>
        <div className="App-detail">
            <Switch>
                <Route exact path="/" component={Homepage}/>
                <Route exact path="/login" component={LoginFrom}/>
                <Route exact path="/register" component={RegisterForm}/>
            </Switch>
        </div>
    }/>
)

class App extends Component {
    constructor(...args) {
        super(...args);
        this.state = {show: false}
    }


    render() {
        return (
            <div>
                <AppRouter>
                    <div className="App">
                        <Header/>
                        <AppDetail/>
                    </div>
                </AppRouter>
            </div>
        );
    }
}

export default App;
