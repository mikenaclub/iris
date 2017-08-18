/**
 * Created by STR02119 on 7/17/2017.
 */
import React from 'react';
import {Button, Form, Modal, Header} from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import './RegisterForm.css'
import {CSSTransition} from 'react-transition-group';
import PropTypes from 'prop-types'

class RegisterForm extends React.Component {
    static propTypes = {
        onRegistering: PropTypes.func.isRequired,
        isError: PropTypes.bool.isRequired,
        onDismissDialog: PropTypes.func.isRequired
    }
    constructor() {
        super();
        this.state = {
            loading: false,
            username: "",
            password: "",
            reEnterPassword: "",
            show: false,
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
        if (this.state.username === "" || this.state.password === "" || this.state.reEnterPassword === "") {
            this.setState({
                showerror: true,
                errormessage: "Please use full field"
            });
            this.setState({
                loading: false
            })
        }
        else if (this.state.password !== this.state.reEnterPassword) {
            console.log("password != repassword")
            this.setState({
                showerror: true,
                errormessage: "Repassword is incorrect !"
            });
            this.setState({
                loading: false
            })
        }
        else {
            this.props.onRegistering(this.state.username,this.state.password)
        }

    }

    clickShowError = (e) => {
        this.props.onDismissDialog();
        this.setState({loading: false})
    }

    render() {

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
                            open={this.state.showerror || this.props.isError}
                        >
                            <Header content='Register Fail !!!'/>
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