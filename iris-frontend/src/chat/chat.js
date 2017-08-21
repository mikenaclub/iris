import React, {Component} from 'react';
import {Button, Form, Comment, Icon, Input} from 'semantic-ui-react';
import './chat.css';
import io from 'socket.io-client'
import UserDetail from '../share/UserDetail'

class Chat extends Component {
    constructor() {
        super();
        this.state = {
            socket: io(`http://localhost:8093`),
            show: false,
            message: "",
            messages: [],
            username: UserDetail.getInstance().username,
            room: "",
            channel:""
        }

    }

    //after render()
    componentDidMount() {
        console.log(this.state.username)
        this.state.socket.emit('userconnect', this.state.username)
        this.setState({show: true})

        //When receive message from server
        this.state.socket.on('chat message', function (msg) {
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
        this.state.socket.on(this.state.username + 'alert changeroom', function (msgJoinRoom, msgOld) {
            this.setState({
                messages: [],
                room: msgJoinRoom.room
            })

            //collect old message
            var allMessages = this.state.messages;
            this.setState({
                messages: allMessages.concat(msgOld, msgJoinRoom),
            });

            //scroll down show new message in Field message
            var objDiv = document.getElementById("fieldmessage");
            objDiv.scrollTop = objDiv.scrollHeight;
        }.bind(this))

        this.state.socket.on('useronline', function (userinroom) {
            console.log("useronline : "+JSON.stringify(userinroom.useronline));
        }.bind(this))
    }

    componentWillUnmount() {
        this.setState({show: false})
    }

    //


    sendMessage = () => {
        if (this.state.message !== "" && this.state.room !== "") {
            //send message to server
            var message = '{"user":"' + this.state.username + '","message":"' + this.state.message + '"}';
            var jsonmessage = JSON.parse(message);
            this.state.socket.emit('chat message', jsonmessage);
            this.setState({
                message: ""
            })
        }
        this.setState({
            message: ""
        })

    }

    changeMessage = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    checkKeySendMessage = (e) => {
        if (e.key === "Enter") {
            this.sendMessage();
        }
    }

    changeRoom = (e) => {
        console.log(e.target.value)
        this.state.socket.emit("changeroom", e.target.value)
    }

    convertDateTime = (date) => {
        let formatdate = new Date(date)
        let currentdate = new Date();
        if (formatdate.getDay() === currentdate.getDay()) {
            return "Today " + formatdate.getHours() + ":" + formatdate.getMinutes()
        }
        else {
            return formatdate.getDate() + '-' + (formatdate.getMonth() + 1) + '-' + formatdate.getFullYear() + " " + formatdate.getHours() + ":" + formatdate.getMinutes();
        }
    }

    render() {
        var messages = this.state.messages;
        var messagesDiv = [];
        var position = "";
        var avatar = "";
        var text = "";
        //show message on field message
        for (var i = 0; i < messages.length; i++) {
            //if my message
            if (messages[i].user === this.state.username) {
                position = "Mymessage";
                avatar = "";
            }
            //if other message
            else {
                position = "";
                avatar =
                    <Comment.Avatar as='a' src='https://react.semantic-ui.com/assets/images/avatar/small/matt.jpg'/>
            }

            let date = this.convertDateTime(messages[i].date);

            if ((i + 1) < messages.length && ((new Date(messages[i + 1].date).getTime() - new Date(messages[i].date).getTime()) < 180000
                    && messages[i + 1].user === messages[i].user)) {
                text += (messages[i].message + "\n" )
            }
            else {
                text += (messages[i].message + "\n" )
                messagesDiv.push(
                    <Comment key={i} className={position}>
                        {avatar}
                        <Comment.Content>
                            <Comment.Author as='a'>{messages[i].user}</Comment.Author>
                            <Comment.Metadata>
                                <div>{date}</div>
                            </Comment.Metadata>
                                {text.split("\n").map((item,key) => {
                                    return (<Comment.Text key={key} className={position}>{item}</Comment.Text>)
                                    }
                                )}
                        </Comment.Content>

                    </Comment>

                );
                text = "";
            }

        }
        return (
            <div className="Chat">
                <div>
                    <Button value="room1">Room1</Button>
                    <Button size='mini' value="room1ch1" onClick={this.changeRoom}>Channel1</Button>
                </div>
                <div>
                    <Button value="room2">Room2</Button>
                    <Button size='mini' value="room2ch1" onClick={this.changeRoom}>Channel1</Button>
                    <Button size='mini' value="room2ch2" onClick={this.changeRoom}>Channel2</Button>
                </div>
                <div id="fieldmessage" className="Field-Message">
                    <Comment.Group minimal>
                        {messagesDiv}
                    </Comment.Group>
                </div>
                <Form className="Message-Form">
                    <Input
                        onKeyUp={this.checkKeySendMessage}
                        className="Input-Message"
                        icon={<Icon name='send' onClick={this.sendMessage} inverted circular link/>}
                        placeholder='message' onChange={this.changeMessage} value={this.state.message}
                    />
                </Form>
            </div>

        )
    }
}

export default Chat;