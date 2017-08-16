import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';
import {Button} from 'semantic-ui-react';

class Homepage extends Component {
    constructor(...args) {
        super(...args);
        this.state = {show: false}
    }

    componentDidMount() {
        this.setState({show: true})
    }

    componentWillUnmount() {
        this.setState({show: false})
    }

    render() {
        return (
            <div className="App-home">
                <CSSTransition
                    timeout={300}
                    classNames="fade"
                    in={this.state.show}
                    mountOnEnter={true}
                    unmountOnExit={true}
                >
                    <Button.Group size='massive'>
                        <Link to="/login"><Button positive>Login</Button></Link>
                        <Button.Or text='or'/>
                        <Link to="/register"><Button secondary>Register</Button></Link>
                    </Button.Group>
                </CSSTransition>
            </div>
        )
    }
}

export default Homepage;