/**
 * Created by STR02119 on 7/17/2017.
 */
import React, {Component} from 'react';
import { Button, Form } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import './Register.css'
import $ from 'jquery';
class RegisterForm extends Component{
    constructor() {
        super();
        this.state = {
            stateloading: false
        };
        this.state ={
            stateusername:""
        }
        this.state ={
            statepassword:""
        }
    }
    handleusername = (e) =>{
        this.setState({
            stateusername: e.target.value
        })
    }
    handlepassword = (e) =>{
        this.setState({
            statepassword: e.target.value
        })
    }


    handleClick = (e) => {
        this.setState({
            stateloading: true
        });
        let userinfo = {}
        userinfo.username =this.state.stateusername
        userinfo.password =this.state.statepassword
        console.log(userinfo)
        let userinfojson = JSON.stringify(userinfo)
        console.log(userinfojson)
        $.ajax({
            url: "http://localhost:8080/api/registeruser",
            type: "POST",
            data: userinfojson,
            contentType: "application/json; charset=utf-8",
            success: (respons) => {
                this.setState({ stateloading:false })
            }
        })
    }
    handleStopLoading = (e) =>{
        this.setState({
            stateloading: this.state.stateloading =false
        })
    }
    render(){
        return (
            <div className="Register">

                <h1 className="pagename">Register</h1>
                <Button onClick={this.handleStopLoading}>Stop Load</Button>
                <Form loading={this.state.stateloading}>
                    <Form.Field required>
                        <label className="labelform">Username</label>
                        <input type="text" placeholder="Username" value={this.state.stateusername} onChange={this.handleusername}/>
                    </Form.Field>
                    <Form.Field required>
                        <label className="labelform">Password</label>
                        <input type="password" placeholder="Password" value={this.state.statepassword} onChange={this.handlepassword}/>
                    </Form.Field>
                    <div className="groupbutton">
                        <Link to='/'>
                            <Button>Back</Button>
                        </Link>
                        <Button onClick={this.handleClick}>OK</Button>
                        <Button>RESET</Button>
                    </div>
                </Form>
            </div>
        )
    }
}

export default RegisterForm;