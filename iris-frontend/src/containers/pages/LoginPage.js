import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Header from '../../components/header/Header'
import LoginFrom from '../../components/login/LoginForm'
import {userLogin} from '../../actions/userAuthention'
import {loginConnectionString} from '../../share/app-connection'
import axios from 'axios'
import UserDetail from '../../share/UserDetail'

class LoginPage extends React.Component {
    static propTypes = {
        onUserSuccessLogin: PropTypes.func.isRequired
    }
    constructor(){
        super()
        this.state = {
            isError: false
        }
    }
    onLogin = (username,password) => {
        axios.post(loginConnectionString, {
            username: username,
            password: password
        }).then((res) => {
            console.log('logined')
            UserDetail.getInstance().setUserInfo({username: username}).setToLocalStorage();
            this.props.onUserSuccessLogin()
        }).catch((error) => {
            this.setState({isError: true})
        });
    }
    onDismissDialog = () => {
        this.setState({isError: false})
    }
    render() {
        return (
            <div>
                <Header size="small"/>
                <LoginFrom
                    onLogin={this.onLogin}
                    onDismissDialog={this.onDismissDialog}
                    error={this.state.isError}
                />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {};
}
const mapDispatchToProps = (dispatch) => ({
    onUserSuccessLogin(){
        dispatch(userLogin())
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(LoginPage);
