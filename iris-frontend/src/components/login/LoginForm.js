/**
 * Created by neetc on 7/15/2017.
 */
import React from 'react';
import {Button, Form, Modal, Header} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';
import './LoginForm.css';
import PropTypes from 'prop-types'

class LoginFrom extends React.Component {
    static propTypes = {
        onLoggingIn: PropTypes.func.isRequired,
        error: PropTypes.bool.isRequired,
        onDismissDialog: PropTypes.func.isRequired
    }
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            show: false
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
        this.props.onLoggingIn(this.state.username,this.state.password)
    }
    onDismissDialog = (e) => {
        this.props.onDismissDialog()
    }

    render() {

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
                            open={this.props.error}
                        >
                            <Header content='Login Fail !!!'/>
                            <Modal.Content>
                                <p>Please try again later.</p>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button color='green' inverted onClick={this.onDismissDialog}>Yes
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