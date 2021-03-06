import React, {Component} from 'react'
import {Redirect} from 'react-router-dom';
import {Menu, Icon, Dropdown} from 'semantic-ui-react'
import './Sidebar.css'
import UserDetail from '../../share/UserDetail';


class Sidebar extends Component {
    constructor() {
        super();
        this.state = {
            username: 'ERROR',
            isAuthenticated: UserDetail.getInstance().isAuthenticated()
        }
    }

    componentWillMount() {
        this.setState({username: UserDetail.getInstance().username});
    }

    state = {activeItem: 'home'}

    handleItemClick = (e, {name}) => this.setState({activeItem: name});
    logout = () => {
        UserDetail.getInstance().removeFromStorage();
        this.setState({isAuthenticated: false});
    }

    render() {
        if (!this.state.isAuthenticated) {
            return (
                <Redirect to="/"/>
            )
        }

        const {activeItem} = this.state

        return (
            <div className="Sidebar">
                <div className="UserInfo">
                    {this.state.username}
                    <Dropdown  floating  button className='icon'>
                        <Dropdown.Menu>
                            <Dropdown.Item>
                                <Icon name='setting' />
                                <span className='text'>Setting</span>
                            </Dropdown.Item>
                            <Dropdown.Item onClick={this.logout}>
                                <Icon name='sign out' />
                                <span className='text'>Logout</span>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="RoomList">
                <Menu fluid inverted pointing secondary vertical>
                    <Menu.Item name='room1' active={activeItem === 'home'} onClick={this.handleItemClick}/>
                    <Menu.Item name='room2' active={activeItem === 'messages'} onClick={this.handleItemClick}/>
                    <Menu.Item name='room3' active={activeItem === 'friends'} onClick={this.handleItemClick}/>
                </Menu>
                </div>
            </div>
        )
    }
}

export default Sidebar;