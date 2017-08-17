import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Header from '../../components/header/Header'
import RegisterForm from '../../components/register/RegisterForm'
import {userLogin} from '../../actions/userAuthention'

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
    onRegister = () => {
        this.props.onUserSuccessRegister()
    }
    render() {
        return (
            <div>
                <Header size="small"/>
                <RegisterForm
                    onUserSuccessRegister={this.onRegister}/>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {}
}
const mapDispatchToProps = (dispatch) => ({
    onUserSuccessRegister(){
        dispatch(userLogin())
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(LoginPage);