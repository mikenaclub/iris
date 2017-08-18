import React from 'react'
import './MainSection.css'

class MainSection extends React.Component{
    render(){
        return(
            <div className="MainPage">
                {this.props.children}
            </div>
        )
    }
}
export default MainSection