import React from 'react'
import PropTypes from 'prop-types'
import './Sidebar.css'
import UserDetail from '../../share/UserDetail';
import { Menu, Icon ,Button } from 'antd';
const SubMenu = Menu.SubMenu;
class Sidebar extends React.Component {
    static propTypes = {
        onUserLogout: PropTypes.func.isRequired,
        username: PropTypes.string.isRequired
    }
    constructor() {
        super();
        this.state = {
            username: 'ERROR',
            collapsed: false
        }
    }
    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    componentWillMount() {
        this.setState({username: UserDetail.getInstance().username});
    }

    logout = () => {
        UserDetail.getInstance().removeFromStorage();
        this.props.onUserLogout();
    }
    handleClick = (e) => {
        if(e.key === 'Logout'){
            this.logout()
        }
    }


    render() {

        return (
            <div className="Sidebar">
                <Menu
                    mode="vertical"
                    theme="dark"
                    onClick={this.handleClick}
                >
                    <SubMenu key="sub1" title={this.props.username}>
                        <Menu.Item key="Setting"><Icon type="mail" />Setting</Menu.Item>
                        <Menu.Item key="Logout">Logout</Menu.Item>
                    </SubMenu>
                </Menu>
                <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                    <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                </Button>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                >
                    <Menu.Item key="3">
                        <Icon type="inbox" />
                        <span>Option 3</span>
                    </Menu.Item>
                    <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
                        <Menu.Item key="5">Option 5</Menu.Item>
                        <Menu.Item key="6">Option 6</Menu.Item>
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
                        <Menu.Item key="9">Option 9</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                        <SubMenu key="sub3" title="Submenu">
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}

export default Sidebar;