/**
 * Created by neetc on 7/15/2017.
 */
import React, {Component} from 'react';
import {Button, Form} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import './Login.css';
import $ from 'jquery';

class LoginFrom extends Component {
    constructor(){
        super();
        this.state ={
            username: "",
            password: ""
        }
    }

    handleChangename = (e) =>{
        this.setState({
            username : e.target.value
        })
    }
    handleChangepassword = (e) =>{
        this.setState({
            password : e.target.value
        })
    }

    login = (e) => {
        /*fetch('http://localhost:8092/login/query', {
            method: 'GET'
        }).then((response) => console.log(response));*/
        let userinfo = {}
        userinfo.username = this.state.username
        userinfo.password = this.state.password
        console.log(userinfo)
        let userinfojson = JSON.stringify(userinfo)
        console.log(userinfojson)
        $.ajax({
            url: "http://localhost:8092/login/login",
            type: "post",
            data: userinfojson,
            contentType: "application/json; charset=utf-8",
            success: (respons) => {
                console.log(respons)
            },
            error: (respons) => {
                console.log(respons)
            }
        })
    }

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
                        <input onChange={this.handleChangename} placeholder='username'/>
                    </Form.Field>
                    <Form.Field>
                        <input type="password" onChange={this.handleChangepassword} placeholder='password'/>
                    </Form.Field>
                    <div className="Action-group">
                        <Button animated='fade' size='big' type='submit' positive className="Login-button" onClick={this.login}>
                            <Button.Content visible>Login</Button.Content>
                            <Button.Content hidden>Click</Button.Content>
                        </Button>
                        <Link to="../Register">
                            <div className="GotoRegister-button">
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