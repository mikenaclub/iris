import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import {Button, Form, Icon} from 'semantic-ui-react';


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


const Login = (history) => {
    return (<div className="App-detail-login">
        <Form className="LoginForm2" size="big">
            <h1>Login to App</h1>
            <Form.Field>
                <input placeholder='email'/>
            </Form.Field>
            <Form.Field>
                <input placeholder='password'/>
            </Form.Field>
            <Link to=".."><Button animated size='big' type='button'>
                <Button.Content visible>back</Button.Content>
                <Button.Content hidden>
                    <Icon name='angle double left'/>
                </Button.Content>
            </Button></Link>
            <Button animated='fade' size='big' type='submit' positive>
                <Button.Content visible>Login</Button.Content>
                <Button.Content hidden>Hi!</Button.Content>
            </Button>
            <Link to="../Register"><Button animated='fade' size='big' type='button' secondary>
                <Button.Content visible>Register</Button.Content>
                <Button.Content hidden>welcome!</Button.Content>
            </Button></Link>
        </Form>
    </div>);
};


const Register = () => (
    <div>
        <h1>Register</h1>
        <Link to="..">back</Link>
    </div>
);
class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Monoitio</h2>
                </div>


                <Router>
                    <div className="App-detail">
                        <Route exact path="/" component={Home}/>
                        <Route path="/Login" component={Login}/>
                        <Route path="/Register" component={Register}/>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
