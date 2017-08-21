import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Sidebar from '../../../components/sidebar/Sidebar'
import ChatModule from './ChatModule'
import WhiteboardModule from './WhiteboardModule'
import {userLogout} from "../../../actions/userAuthention";
import MainSection from '../../../components/pages/main/MainSection'

class MainPage extends React.Component {
    static propTypes = {
        onUserLogout: PropTypes.func.isRequired
    }
    static mainMode = {
        textChat: 'TEXTCHAT',
        Whiteboard: 'WHITEBOARD'
    }

    constructor() {
        super()
        this.state = {
            mainMode: this.mainMode.textChat
        }
    }

    onUserLogout = () => {
        this.props.onUserLogout();
    }
    onSwapModeBtnClick = () => {
        if (this.state.mainMode === this.mainMode.textChat) {
            this.setState({mainMode: this.mainMode.Whiteboard})
        }
        else {
            this.setState({mainMode: this.mainMode.textChat})
        }
    }

    render() {
        let main = "loading"
        if (this.state.textChat === this.mainMode.textChat) {
            main = <ChatModule/>
        }
        else {
            main = <WhiteboardModule/>
        }
        return (
            <div>
                <MainSection>
                <Sidebar
                    username={this.props.username}
                    onUserLogout={this.onUserLogout}/>
                <button onClick={this.onSwapModeBtnClick}>swap mode</button>
                {main}
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
    onUserLogout() {
        dispatch(userLogout())
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(MainPage)