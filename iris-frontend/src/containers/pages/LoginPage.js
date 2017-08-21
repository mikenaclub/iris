import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import LoginFrom from '../../components/login/LoginForm'
import {userLogin} from '../../actions/userAuthention'
import {loginConnectionString} from '../../share/app-connection'
import axios from 'axios'
import UserDetail from '../../share/UserDetail'
import LoginSection from '../../components/pages/login/LoginSection'

class LoginPage extends React.Component {
    static propTypes = {
        onUserSuccessLogin: PropTypes.func.isRequired
    }

    constructor() {
        super()
        this.state = {
            isError: false,
            errorStatus: 0
        }
    }

    onLoggingIn = (username, password) => {
        axios.post(loginConnectionString, {
            username: username,
            password: password
        }).then((res) => {
            UserDetail.getInstance().setUserInfo({username: username}).setToLocalStorage();
            this.props.onUserSuccessLogin(username)
        }).catch((error) => {
            console.log(error.response)
            this.setState({isError: true, errorStatus: error.response.status})
        });
    }
    onDismissDialog = () => {
        this.setState({isError: false})
    }

    render() {
        return (
            <div>
                <LoginSection>
                    <LoginFrom
                        onLoggingIn={this.onLoggingIn}
                        onDismissDialog={this.onDismissDialog}
                        error={this.state.isError}
                        errorStatus={this.state.errorStatus}
                    />
                </LoginSection>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {};
}
const mapDispatchToProps = (dispatch) => ({
    onUserSuccessLogin(username) {
        dispatch(userLogin(username))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
