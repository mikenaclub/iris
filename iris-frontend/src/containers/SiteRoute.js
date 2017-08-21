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
import Header from '../components/header/Header'

class SiteRoute extends React.Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        onUserLogined: PropTypes.func.isRequired
    }

    componentWillMount() {
        let user = UserDetail.getInstance()
        if (user.isAuthenticated()) {
            this.props.onUserLogined(user.username)
        }
    }

    render() {
        if (this.props.isAuthenticated) {
            return (
                <MainPage/>
            )
        }
        else {
            return (
                <div>
                    <Switch>
                        <Route exact path="/" render={() => <Header size="big"/>}/>
                        <Route exact path="/login" render={() => <Header/>}/>
                        <Route exact path="/register" render={() => <Header/>}/>
                    </Switch>
                    <Switch>
                        <Route exact path="/" component={Homepage}/>
                        <Route exact path="/login" component={LoginPage}/>
                        <Route exact path="/register" component={RegisterPage}/>
                    </Switch>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.userAuthention.isAuthenticated
    }
}
const mapDispatchToProps = (dispatch) => ({
    onUserLogined(username) {
        dispatch(userLogin(username))
    }
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SiteRoute))