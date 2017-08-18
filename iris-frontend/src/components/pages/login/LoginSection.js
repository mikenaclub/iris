import React from 'react'
import './LoginSection.css'

class LoginSection extends React.Component{
    render(){
        return(
            <div className="App-detail">
            <div className="LoginSection">
                {this.props.children}
            </div>
            </div>
        )
    }
}
export default LoginSection