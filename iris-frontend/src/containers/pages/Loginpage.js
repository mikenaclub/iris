import React from 'react';
import Header from '../../components/header/Header'
import LoginFrom from '../../components/login/LoginFrom'

class Loginpage extends React.Component {

    render() {
        return (
            <div>
                <Header/>
                <LoginFrom/>
            </div>
        )
    }
}

export default Loginpage;