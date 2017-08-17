import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Sidebar from '../../../components/sidebar/Sidebar'
import Chat from '../../../components/chat/chat'
import {userLogout} from "../../../actions/userAuthention";

class MainPage extends React.Component{
    static propTypes = {
        onUserLogout: PropTypes.func.isRequired
    }
    onUserLogout = () => {
        this.props.onUserLogout();
    }
    render(){
        return(
            <div>
                <Sidebar
                    onUserLogout={this.onUserLogout}/>
                <Chat/>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {};
}
const mapDispatchToProps = (dispatch) => ({
    onUserLogout(){
        dispatch(userLogout())
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(MainPage)