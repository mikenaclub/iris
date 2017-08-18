import React from 'react';
import Header from '../../components/header/Header'
import Homedetail from '../../components/Homedetail'

class Homepage extends React.Component {

    render() {
        return (
            <div>
                <Header size="big"/>
                <Homedetail />
            </div>
        )
    }
}

export default Homepage;