import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class AuthentionGuard extends React.Component {
    static propTypes ={
        isAuthenticated: PropTypes.bool.isRequired
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props.isAuthenticated !== nextProps.isAuthenticated
    }
    render(){
        return(
        <div>
            {this.props.children}
        </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.userAuthention
})

export default connect(
    mapStateToProps
)(AuthentionGuard)