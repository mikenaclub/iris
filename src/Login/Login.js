/**
 * Created by neetc on 7/15/2017.
 */
import React, {Component} from 'react';
import {Button, Form, Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import './Login.css';

class LoginFrom extends Component {
    render() {
        return (
            <div className="Login">
                <Form className="Login-Form" size="big">
                    <h1 className="Form-title">Login to App</h1>
                    <Form.Field>
                        <input placeholder='email'/>
                    </Form.Field>
                    <Form.Field>
                        <input placeholder='password'/>
                    </Form.Field>
                    <div className="Action-bar">
                        <Link to="..">
                            <div className="Back-button">
                                <Button animated size='big' type='button'>
                                    <Button.Content visible>back</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='angle double left'/>
                                    </Button.Content>
                                </Button>
                            </div>
                        </Link>
                        <Button animated='fade' size='big' type='submit' positive>
                            <Button.Content visible>Login</Button.Content>
                            <Button.Content hidden>Hi!</Button.Content>
                        </Button>
                        <Link to="../Register">
                            <div className="Register-button">
                                <Button animated='fade' size='big' type='button' basic>
                                    <Button.Content visible>Register</Button.Content>
                                    <Button.Content hidden>welcome!</Button.Content>
                                </Button>
                            </div>
                        </Link>
                    </div>
                </Form>
            </div>
        )
    }
}

export default LoginFrom;