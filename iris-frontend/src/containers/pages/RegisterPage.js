import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import RegisterForm from '../../components/register/RegisterForm'
import {userLogin} from '../../actions/userAuthention'
import axios from 'axios'
import {registerConnetionString} from '../../share/app-connection'
import UserDetail from '../../share/UserDetail'

class LoginPage extends React.Component {
    static propTypes = {
        onUserSuccessRegister: PropTypes.func.isRequired
    }
    constructor(){
        super()
        this.state = {
            isError: false
        }
    }
    onRegistering = (username,password) => {
        axios.post(registerConnetionString, {
            username: username,
            password: password
        }).then((response) => {
            UserDetail.getInstance().setUserInfo({username: username}).setToLocalStorage();
            this.props.onUserSuccessRegister()
        }).catch((error) => {
            this.setState({isError: true})
        })

    }
    onDismissDialog = () => {
        this.setState({isError: false})
    }
    render() {
        return (
            <div>
                <div className="App-detail">
                <RegisterForm
                    onRegistering={this.onRegistering}
                    isError={this.state.isError}
                    onDismissDialog={this.onDismissDialog}
                />
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {}
}
const mapDispatchToProps = (dispatch) => ({
    onUserSuccessRegister(username){
        dispatch(userLogin(username))
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(LoginPage);