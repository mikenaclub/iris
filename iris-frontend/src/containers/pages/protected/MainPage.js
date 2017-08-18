import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Sidebar from '../../../components/sidebar/Sidebar'
import Chat from '../../../components/chat/chat'
import {userLogout} from "../../../actions/userAuthention"
import MainSection from '../../../components/pages/main/MainSection'

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
                <MainSection>
                <Sidebar
                    username={this.props.username}
                    onUserLogout={this.onUserLogout}/>
                <Chat/>
                </MainSection>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        username: state.userAuthention.username
    }
}
const mapDispatchToProps = (dispatch) => ({
    onUserLogout(){
        dispatch(userLogout())
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(MainPage)