import React, {Component} from 'react';
import {Button, Form, Comment} from 'semantic-ui-react';
import './chat.css';
import io from 'socket.io-client'
import UserDetail from '../share/UserDetail'

class Chat extends Component {
    constructor() {
        super();
        this.state = {
            socket : io(`http://localhost:8093`),
            show: false,
            message: "",
            username: UserDetail.getInstance().username
        }

        this.state.socket.on('chat message', function(msg){
            console.log(msg);
        })
    }

    componentDidMount() {
        console.log(this.state.username)
        this.state.socket.emit('userconnect' , this.state.username)
        this.setState({show: true})
    }

    componentWillUnmount() {
        this.setState({show: false})
    }

    submit = () => {
        this.state.socket.emit('chat message', this.state.message);
    }

    changemessage = (e) => {
        this.setState({
            message: "user : "+e.target.value
        })
    }

    /*socket.on('chat message', function(msg){
     $('#messages').append($('<li>').text(msg));
     });*/

    render(){
        return (
            <div className="Chat">
                <Form className="message-Form">
                    <Comment>
                        <Comment.Content>
                            <Comment.Author as='a'>Matt</Comment.Author>
                            <Comment.Text>How artistic!</Comment.Text>
                        </Comment.Content>
                    </Comment>
                    <input placeholder="message" onChange={this.changemessage}/><Button onClick={this.submit}>Send</Button>
                </Form>
            </div>

        )
    }
}

export default Chat;