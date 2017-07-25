/**
 * Created by STR02119 on 7/17/2017.
 */
import React, {Component} from 'react';
import {Button, Form} from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import './Register.css'
import $ from 'jquery';

class RegisterForm extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            username: "",
            password: ""
        };
    }

    handleusername = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    handlepassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    handlerepassword = (e) =>{
        this.setState({
            repassword: e.target.value
        })
    }

    handleClick = (e) => {
        this.setState({
            loading: true
        });
        let userInfo = {}
        userInfo.username = this.state.username
        userInfo.password = this.state.password
        console.log(userInfo)
        let userInfoJson = JSON.stringify(userInfo)
        console.log(userInfoJson)
        $.ajax({
            url: "http://localhost:8080/registerApi/v1/user",
            type: "POST",
            data: userInfoJson,
            contentType: "application/json; charset=utf-8",
            success: (response) => {
                console.log("login Success")
                this.setState({loading: false})
            },
            error: (response) => {
                console.log(response)
                this.setState({loading: false})
            }
        })
    }

    render() {
        return (
            <div className="Register">

                <Form className="Register-Form" loading={this.state.stateloading}>
                    <h1 className="Title">
                        <Link to="..">
                            <Button circular icon='arrow left' color='black'/>
                        </Link>Register
                    </h1>
                    <Form.Field>
                        <input placeholder="username" value={this.state.stateusername}
                <h1 className="title">Register</h1>
                <Form loading={this.state.loading}>
                    <Form.Field required>
                        <label className="labelform">Username</label>
                        <input type="text" placeholder="Username" value={this.state.username}
                               onChange={this.handleusername}/>
                    </Form.Field>
                    <Form.Field required>
                        <label className="labelform">Password</label>
                        <input type="password" placeholder="Password" value={this.state.password}
                    <Form.Field>
                        <input type="password" placeholder="password" value={this.state.statepassword}
                               onChange={this.handlepassword}/>
                    </Form.Field>
                    <Form.Field>
                        <input type="password" placeholder="repassword" value={this.state.repassword}
                                onChange={this.handlerepassword}/>
                    </Form.Field>
                    <div className="Group-Button">
                        <Button className="Register-button" size='big' onClick={this.handleClick} positive>Register</Button>
                        <Link to="../Login">
                            <div className="GotoLogin-button">
                                or Login
                            </div>
                        </Link>
                    </div>
                </Form>
            </div>
        )
    }
}

export default RegisterForm;