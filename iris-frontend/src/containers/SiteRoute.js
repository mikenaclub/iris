import React from 'react'
import {Route, Switch, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Homepage from './pages/Homepage'
import Loginpage from "./pages/Loginpage";

class SiteRoute extends React.Component {
    static propTypes ={
        isAuthenticated: PropTypes.bool.isRequired
    }
    /*shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props.isAuthenticated !== nextProps.isAuthenticated
    }*/
    render(){
        if(this.props.isAuthenticated){
            return(
                //<MainPage/>
                <div> test </div>
            )
        }
        else{
            return(
                <Switch>
                    <Route exact path="/" component={Homepage}/>
                    <Route exact path="/login" component={Loginpage}/>
                </Switch>
                //<
                //<Route exact path="/register" component={RegisterForm}/>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.userAuthention
})
//export default SiteRoute
//export default connect(mapStateToProps)(SiteRoute)
export default withRouter(connect(mapStateToProps)(SiteRoute))