/**
 * Created by neetc on 7/15/2017.
 */
import React, {Component} from 'react';
import {Button, Form} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import './Login.css';

class LoginFrom extends Component {
    render() {
        return (
            <div className="Login">
                <Form className="Login-Form" size="big">

                    <h1 className="Form-title">
                        <Link to="..">
                            <Button circular icon='arrow left' color='black'/>
                        </Link>Login to App
                    </h1>
                    <Form.Field>
                        <input placeholder='username'/>
                    </Form.Field>
                    <Form.Field>
                        <input placeholder='password'/>
                    </Form.Field>
                    <div className="Action-group">
                        <Button animated='fade' size='big' type='submit' positive className="Login-button">
                            <Button.Content visible>Login</Button.Content>
                            <Button.Content hidden>Hi!</Button.Content>
                        </Button>
                        <Link to="../Register">
                            <div className="Register-button">
                                Don't have account? Register!
                            </div>
                        </Link>
                    </div>
                </Form>
            </div>
        )
    }
}

export default LoginFrom;