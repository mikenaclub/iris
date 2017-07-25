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
                               onChange={this.handlepassword}/>
                    </Form.Field>
                    <div className="groupbutton">
                        <Link to='/'>
                            <Button>Back</Button>
                        </Link>
                        <Button onClick={this.handleClick}>OK</Button>
                    </div>
                </Form>
            </div>
        )
    }
}

export default RegisterForm;