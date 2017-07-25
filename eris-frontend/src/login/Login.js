/**
 * Created by neetc on 7/15/2017.
 */
import React, {Component} from 'react';
import {Button, Form} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import './Login.css';
import $ from 'jquery';

class LoginFrom extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: ""
        }
    }

    onUsernameChange = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    onPasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    onLoginBtnClick = () => {
        /*fetch('http://localhost:8092/login/query', {
            method: 'GET'
        }).then((response) => console.log(response));*/
        let userInfo = {}
        userInfo.username = this.state.username
        userInfo.password = this.state.password
        console.log(userInfo)
        let userInfoJson = JSON.stringify(userInfo)
        console.log(userInfoJson)
        $.ajax({
            url: "http://localhost:8091/onLoginBtnClick/onLoginBtnClick",
            type: "post",
            data: userInfoJson,
            contentType: "application/json; charset=utf-8",
            success: (response) => {
                console.log(response)
            },
            error: (response) => {
                console.log(response)
            }
        })
    }

    render() {
        return (
            <div className="Login">
                <Form className="Login-Form" size="big">
                    <h1 className="Form-title">Login to App
                    </h1>
                    <Form.Field>
                        <input onChange={this.onUsernameChange} placeholder='username'/>
                    </Form.Field>
                    <Form.Field>
                        <input type="password" onChange={this.onPasswordChange} placeholder='password'/>
                    </Form.Field>
                    <div className="Action-group">
                        <Button animated='fade' size='big' type='submit' positive className="Login-button"
                                onClick={this.onLoginBtnClick}>
                            <Button.Content visible>Login</Button.Content>
                            <Button.Content hidden>Click</Button.Content>
                        </Button>
                        <Link to="../Register">
                            <div className="GoToRegister-button">
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