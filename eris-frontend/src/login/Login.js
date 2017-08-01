/**
 * Created by neetc on 7/15/2017.
 */
import React, {Component} from 'react';
import {Button, Form,Modal,Header} from 'semantic-ui-react';
import {Link, Redirect} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';
import './Login.css';
import {loginConnectionString} from '../share/app-connection'
import axios from 'axios';
import UserDetail from '../share/UserDetail'


class LoginFrom extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            show: false,
            isAuthenticated: UserDetail.getInstance().isAuthenticated(),
            showerror: false
        }
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

    onLoginBtnClick = () => {
        axios.post(loginConnectionString, {
            username: this.state.username,
            password: this.state.password
        }).then((res) => {
            UserDetail.getInstance().setUserInfo({username: this.state.username}).setToLocalStorage();
            this.setState({isAuthenticated: true});
        }).catch((error) => {
            console.log(error.response)
            this.setState({showerror: true});
        });
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
            <div className="Login">
                <CSSTransition
                    timeout={300}
                    classNames="fade"
                    in={this.state.show}
                    mountOnEnter={true}
                    unmountOnExit={true}
                >
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
                            <Link to="../register">
                                <div className="GoToRegister-button">
                                    Don't have account? Register!
                                </div>
                            </Link>
                        </div>

                        <Modal
                            open={this.state.showerror}
                        >
                            <Header content='Login Fail !!!' />
                            <Modal.Content>
                                <p>Please try again later.</p>
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

export default LoginFrom;