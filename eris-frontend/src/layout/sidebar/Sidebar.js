import React, {Component} from 'react'
import {Menu, Button, Dropdown} from 'semantic-ui-react'
import './Sidebar.css'
import UserDetail from '../../share/UserDetail';


class Sidebar extends Component {
    constructor() {
        super();
        this.state = {
            username: 'ERROR'
        }
    }

    componentWillMount() {
        console.log(UserDetail.getInstance());
        this.setState({username: UserDetail.getInstance().username});
    }

    state = {activeItem: 'home'}

    handleItemClick = (e, {name}) => this.setState({activeItem: name})

    render() {
        const {activeItem} = this.state

        return (
            <div className="Sidebar">
                <div className="UserInfo">
                    {this.state.username}
                    <Button.Group color='teal'>
                        <Button>Save</Button>
                        <Dropdown options={[
                            {key: 'edit', icon: 'edit', text: 'Edit Post', value: 'edit'},
                            {key: 'delete', icon: 'delete', text: 'Remove Post', value: 'delete'},
                            {key: 'hide', icon: 'hide', text: 'Hide Post', value: 'hide'},
                        ]} floating button className='icon'/>
                    </Button.Group>
                </div>
                <Menu fluid inverted pointing secondary vertical>
                    <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick}/>
                    <Menu.Item name='messages' active={activeItem === 'messages'} onClick={this.handleItemClick}/>
                    <Menu.Item name='friends' active={activeItem === 'friends'} onClick={this.handleItemClick}/>
                </Menu>
            </div>
        )
    }
}

export default Sidebar;