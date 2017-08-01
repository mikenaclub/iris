/**
 * Created by STR02119 on 7/17/2017.
 */
import React, {Component} from 'react';
import {Button, Form ,Modal,Header} from 'semantic-ui-react'
import {Link, Redirect} from 'react-router-dom';
import './Register.css'
import {registerConnetionString} from '../share/app-connection';
import {CSSTransition} from 'react-transition-group';
import UserDetail from "../share/UserDetail";
import axios from 'axios';

class RegisterForm extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            username: "",
            password: "",
            reEnterPassword: "",
            show: false,
            isAuthenticated: UserDetail.getInstance().isAuthenticated(),
            showerror: false,
            errormessage: ""
        };
    }

    componentDidMount() {
        this.setState({show: true})
    }

    componentWillUnmount() {
        this.setState({show: false})
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
    onReEnterPasswordChange = (e) => {
        this.setState({
            reEnterPassword: e.target.value
        })
    }

    Register = (e) => {
        this.setState({
            loading: true
        });
        if (this.state.username == "" || this.state.password == "" || this.state.reEnterPassword == ""){
            console.log("Please use full field")
            this.setState({
                showerror: true,
                errormessage:"Please use full field"
            });
            this.setState({
                loading: false
            })
        }
        else if(this.state.password !== this.state.reEnterPassword){
            console.log("password != repassword")
            this.setState({
                showerror: true,
                errormessage:"Repassword is incorrect !"
            });
            this.setState({
                loading: false
            })
        }
        else{
            axios.post(registerConnetionString, {
                username: this.state.username,
                password: this.state.password
            }).then((response) => {
                UserDetail.getInstance().setUserInfo({username: this.state.username}).setToLocalStorage();
                this.setState({
                    loading: false,
                    isAuthenticated: true
                })
            }).catch((error) => {
                console.log(error);
                this.setState({
                    loading: false,
                    showerror: true,
                    errormessage: error.response
                });
            });
        }

    }

    clickShowError  = (e) => {
        this.setState({
            showerror: false
        })
    }

    render() {
        if (this.state.isAuthenticated) {
            return (
                <Redirect to="/"/>
            )
        }

        return (
            <div className="Register">

                <CSSTransition
                    timeout={300}
                    classNames="fade"
                    in={this.state.show}
                    mountOnEnter={true}
                    unmountOnExit={true}
                >
                    <Form className="Register-Form" loading={this.state.loading} size="big">
                        <h1 className="Title">Register
                        </h1>
                        <Form.Field>
                            <input type="text" placeholder="Username" value={this.state.username}
                                   onChange={this.onUsernameChange}/>
                        </Form.Field>
                        <Form.Field>
                            <input type="password" placeholder="password" value={this.state.password}
                                   onChange={this.onPasswordChange}/>
                        </Form.Field>
                        <Form.Field>
                            <input type="password" placeholder="repassword" value={this.state.reEnterPassword}
                                   onChange={this.onReEnterPasswordChange}/>
                        </Form.Field>
                        <div className="Group-Button">
                            <Button className="Register-button" size='big' onClick={this.Register}
                                    positive>Register</Button>
                            <Link to="../login">
                                <div className="GotoLogin-button">
                                    already have account? Log in!
                                </div>
                            </Link>
                        </div>

                        <Modal
                            open={this.state.showerror}
                        >
                            <Header content='Register Fail !!!' />
                            <Modal.Content>
                                <p>{this.state.errormessage}</p>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button color='green' inverted onClick={this.clickShowError}>Yes
                                </Button>
                            </Modal.Actions>
                        </Modal>

                    </Form>
                </CSSTransition>
            </div>
        )
    }
}

export default RegisterForm;