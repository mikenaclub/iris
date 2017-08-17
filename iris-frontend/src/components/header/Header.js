import React from 'react';
import FullHeader from './Header-full';
import SmallHeader from './Header-small';
import PropTypes from 'prop-types'
class Header extends React.Component {
    static propTypes = {
        size: PropTypes.string
    }
    render() {
        if(this.props.size === 'big'){
            return <FullHeader/>
        }
        else{
            return <SmallHeader/>
        }
    }
}

export default Header;