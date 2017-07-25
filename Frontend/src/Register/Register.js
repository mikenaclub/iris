/**
 * Created by STR02119 on 7/17/2017.
 */
import React, {Component} from 'react';
import {Button, Form} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import './Register.css'
import $ from 'jquery';

class RegisterForm extends Component {
    constructor() {
        super();
        this.state = {
            stateloading: false,
            stateusername: "",
            statepassword: "",
            repassword:"",
            usernameerror: "",
            passworderror: "",
            repassworderror: ""
        };
    }

    handleusername = (e) => {
        this.setState({
            stateusername: e.target.value
        })


    }
    handlepassword = (e) => {
        this.setState({
            statepassword: e.target.value
        })
    }
    handlerepassword = (e) =>{
        this.setState({
            repassword: e.target.value
        })
    }

    handleClick = (e) => {
        this.setState({
            stateloading: true
        });
        let userinfo = {}
        userinfo.username = this.state.stateusername
        userinfo.password = this.state.statepassword
        console.log(userinfo)
        let userinfojson = JSON.stringify(userinfo)
        console.log(userinfojson)
        $.ajax({
            url: "http://localhost:8080/api/registeruser",
            type: "POST",
            data: userinfojson,
            contentType: "application/json; charset=utf-8",
            success: (respons) => {
                console.log("Login Success")
                this.setState({stateloading: false})
            },
            error: (respons) => {
                console.log(respons)
                this.setState({stateloading: false})
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
                               onChange={this.handleusername}/>
                    </Form.Field>
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