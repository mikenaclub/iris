import React, {Component} from 'react';
import {Button, Form, Comment, Icon, Input } from 'semantic-ui-react';
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
            messages: [],
            username: UserDetail.getInstance().username,
            room: ""
        }

    }

    //after render()
    componentDidMount() {
        console.log(this.state.username)
        this.state.socket.emit('userconnect' , this.state.username)
        this.setState({show: true})
        //When receive message from server
        this.state.socket.on('chat message', function(msg){
            var allmessages = this.state.messages;
            this.setState((previousState) => ({
                messages: allmessages.concat(msg),
            }));
            //console.log("All message : "+ this.state.messages)
            console.log(msg);
            //scroll down show new message in Field message
            var objDiv = document.getElementById("fieldmessage");
            objDiv.scrollTop = objDiv.scrollHeight;
        }.bind(this))

        //alert message in message filed when user join room
        this.state.socket.on('alert changeroom',function (msg,msg2) {
            console.log(msg2)
            this.setState({
                messages : [],
                room: msg.room
            })

            //collect old message
            var allmessages = this.state.messages;
            this.setState({
                messages: allmessages.concat(msg,msg2),
            });

            //scroll down show new message in Field message
            var objDiv = document.getElementById("fieldmessage");
            objDiv.scrollTop = objDiv.scrollHeight;
        }.bind(this))
    }

    componentWillUnmount() {
        this.setState({show: false})
    }

    //


    sendMessage = () => {
        if (this.state.message !=="" && this.state.room !== ""){
            //send message to server
            var message = '{"user":"'+this.state.username+'","message":"'+this.state.message+'"}';
            var jsonmessage = JSON.parse(message);
            this.state.socket.emit('chat message', jsonmessage);
            this.setState({
                message:""
            })
        }
        this.setState({
            message:""
        })

    }

    changeMessage = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    checkKeySendMessage = (e) => {
        if(e.key === "Enter"){
            this.sendMessage();
        }
    }

    changeRoom = (e) => {
        console.log(e.target.value)
        /*this.setState({
            messages : []
        })*/
        this.state.socket.emit("changeroom",e.target.value)
    }

    render(){
        var messages = this.state.messages;
        var messagesDiv = [];
        var position = "";
        var avatar = "";
        //show message on field message
        for (var i = 0; i < messages.length; i++) {
            //if my message
            if (messages[i].user === this.state.username){
                position = "Mymessage";
                avatar = "";
            }
            //if other message
            else {
                position = "";
                avatar = <Comment.Avatar as='a' src='https://react.semantic-ui.com/assets/images/avatar/small/matt.jpg' />
            }

            messagesDiv.push(
                <Comment key={i}>
                    {avatar}
                    <Comment.Content>
                        <Comment.Author  as='a' className={position}>{messages[i].user}</Comment.Author>
                        <Comment.Text className={position}>{messages[i].message.replace(/ /g, "\u00a0")}</Comment.Text>
                    </Comment.Content>
                </Comment>
            );
        }
        return (
            <div className="Chat">
                <div>
                    <Button onClick={this.changeRoom} value="room1" >Room1</Button>
                    {/*<Button size='mini'>Channel1</Button>
                    <Button size='mini'>Channel2</Button>*/}
                </div>
                <div>
                    <Button onClick={this.changeRoom} value="room2" >Room2</Button>
                    {/*<Button size='mini'>Channel1</Button>
                    <Button size='mini'>Channel2</Button>*/}
                </div>
                <div id="fieldmessage" className="Field-Message">
                    <Comment.Group minimal>
                        {messagesDiv}
                    </Comment.Group>
                </div>
                <Form className="Message-Form">
                    <Input
                        onKeyUp={this.checkKeySendMessage}
                        className="Input-Message" icon={<Icon name='send' onClick={this.sendMessage} inverted circular link />}
                        placeholder='message' onChange={this.changeMessage} value={this.state.message}
                    />
                </Form>
            </div>

        )
    }
}

export default Chat;