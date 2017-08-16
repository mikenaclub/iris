import React, {Component} from 'react';
import FullHeader from './Header-full';
import SmallHeader from './Header-small';

class Header extends Component {
    render() {
        if(this.props.size === 'big'){
            return <FullHeader/>
        }
        else {
            return <SmallHeader/>
        }
    }
}

export default Header;