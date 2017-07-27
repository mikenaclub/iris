import React, {Component} from 'react';
import {Input, Button} from 'semantic-ui-react';

class GuestLogin extends Component {
    render() {
        return (
            <div>
                Don't want to login?
                Login as guest
                <Input/>
                <Button>ok</Button>
            </div>
        )
    }
}

export default GuestLogin;