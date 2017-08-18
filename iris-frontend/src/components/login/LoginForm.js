/**
 * Created by neetc on 7/15/2017.
 */
import React from 'react';
import {Button, Form, Icon, Input} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';
import './LoginForm.css';
import PropTypes from 'prop-types'
import {message, Alert} from 'antd'

//import {Form, Icon, Input, Button} from 'antd';

class LoginFrom extends React.Component {
    static propTypes = {
        onLoggingIn: PropTypes.func.isRequired,
        error: PropTypes.bool.isRequired,
        onDismissDialog: PropTypes.func.isRequired,
        errorStatus: PropTypes.number

    }

    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            show: false,
            isError: false,
            loginSubmitting: false
        }
    }

    componentDidMount() {
        this.setState({show: true})
    }

    componentWillUnmount() {
        this.setState({show: false})
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        //state loading -> loading
        if (nextProps.error === true && this.state.loginSubmitting === true && nextState.loginSubmitting === true) {
            this.setState({loginSubmitting: false, password: '', isError: true})
        }
        //state loading -> !loading
        else if (nextProps.error === true && this.state.loginSubmitting === true && nextState.loginSubmitting === false) {
            //message.config({top: 20, duration: 3})
            message.error('your username or password is incorrect!')
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
        this.setState({loginSubmitting: true})
        this.props.onLoggingIn(this.state.username, this.state.password)
    }
    onDismissDialog = () => {
        this.props.onDismissDialog()
    }

    render() {
        let errorAlert
        if (this.state.isError === true && this.props.errorStatus === 401) {

            console.log('test2')
            errorAlert =
                <Alert
                    message="Cannot login"
                    description="Maybe your password is incorrect?"
                    type="error"
                    showIcon
                />
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
                        <h1 className="Form-title">
                            Login to App
                        </h1>
                        <Form.Field>
                            <Input iconPosition='left' placeholder="username" onChange={this.onUsernameChange}
                                   value={this.state.username}>
                                <Icon name='user circle'/>
                                <input/>
                            </Input>
                        </Form.Field>
                        <Form.Field>
                            <Input iconPosition='left' type="password" onChange={this.onPasswordChange}
                                   placeholder='password'
                                   value={this.state.password}>
                                <Icon name='code'/>
                                <input/>
                            </Input>
                            {errorAlert}
                        </Form.Field>
                        <div className="Action-group">
                            <Button loading={this.state.loginSubmitting} size='big' type='submit' positive
                                    className="Login-button"
                                    onClick={this.onLoginBtnClick}>
                                <Button.Content visible>Login</Button.Content>
                            </Button>
                            <Link to="../register">
                                <div className="GoToRegister-button">
                                    Don't have account? Register!
                                </div>
                            </Link>
                        </div>

                    </Form>

                </CSSTransition>
            </div>
        )
    }
}

export default LoginFrom;