import React from 'react'
import {Route, Switch, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Homepage from './pages/Homepage'
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage"
import MainPage from './pages/protected/MainPage'
import UserDetail from '../share/UserDetail'
import {userLogin} from "../actions/userAuthention"

class SiteRoute extends React.Component {
    static propTypes ={
        isAuthenticated: PropTypes.bool.isRequired,
        onUserLogined: PropTypes.func.isRequired
    }

    componentWillMount() {
        if(UserDetail.getInstance().isAuthenticated()){
            this.props.onUserLogined()
        }
    }

    render(){
        if(this.props.isAuthenticated){
            return(
                <MainPage/>
            )
        }
        else{
            return(
                <Switch>
                    <Route exact path="/" component={Homepage}/>
                    <Route exact path="/login" component={LoginPage}/>
                    <Route exact path="/register" component={RegisterPage}/>
                </Switch>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
    isAuthenticated: state.userAuthention.isAuthenticated
}}
const mapDispatchToProps = (dispatch) => ({
    onUserLogined(){
        dispatch(userLogin())
    }
})
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SiteRoute))