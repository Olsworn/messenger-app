import * as React from 'react';
import io from "socket.io-client";
import { Button, TextField } from '@material-ui/core';

export default class Room extends React.Component {
    socket = null;

    constructor(props) {
        super(props);

        console.log('toto', props.match.params.roomId);

        this.state = {
            username: 'toto',
            roomId: props.match.params.roomId,
            messageList: [],
            text: '',
        }
    }

    componentDidMount() {
        this.initSocket(this.state.username, this.state.roomId);
    }

    initSocket(username, roomId) {
        const query = `?username=${username}&roomId=${roomId}`;
        this.socket = io.connect('http://localhost:8000', { query, path: '/socket' });

        this.socket.on('receive_message', (message) => {
            console.log('message', message)
            this.setState((currentState) => {
                const newState = {
                    ...currentState,
                    messageList: currentState.messageList.map(e => e),
                };

                newState.messageList.push(message);
                
                return newState;
            });
        })
    }

    onChange = (event) => {
        this.setState((currentState) => {
            return {
                ...currentState,
                text: event.target.value,
            };
        })
    }

    sendMessage = () => {
        if (!this.state.text) {
            return;
        }

        this.setState((currentState) => {
            const newState = {
                ...currentState,
                messageList: currentState.messageList.map(e => e),
            };

            const message = {
                username: currentState.username,
                time: Date.now(),
                text: currentState.text,
            };
            newState.messageList.push(message);
            newState.text = '';

            return newState;
        }, () => {
            this.socket.emit('send_message', this.state.messageList[this.state.messageList.length - 1]);
        });
    }

    render() {
        return (
            <div>
                {this.state.messageList.map((message, id) => (
                    <div key={`message-${id}`}>
                        <p>{message.text}</p>
                        <p>sender: {message.username} at {message.time}</p>
                    </div>
                ))}

                <TextField
                    value={this.state.text}
                    onChange={this.onChange}
                />
                <Button color="primary" onClick={this.sendMessage}>Send Message</Button>
            </div>
        )
    }
};