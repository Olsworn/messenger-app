import * as React from 'react';
import { Redirect } from 'react-router'
import { Button, TextField } from '@material-ui/core';

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        console.log(this.props);

        this.state = {
            username: '',
            roomId: '',
            usernameError: false,
            roomIdError: false,
            redirectReady: false,
        };
    }

    onChangeEvent(key, event) {
        this.setState((currentState) => {
            return {
                ...currentState,
                [key]: event.target.value,
            };
        })
    }

    onChangeUsername = (event) => {
        this.onChangeEvent('username', event);
    }

    onChangeRoomId = (event) => {
        this.onChangeEvent('roomId', event);
    }

    connectToRoom = () => {
        return this.setState((currentState) => {
            const newState = {
                ...currentState,
                usernameError: false,
                roomIdError: false,
            }

            if (!currentState.username || !currentState.roomId) {
                if (!currentState.username) {
                    newState.usernameError = true;
                }
                if (!currentState.roomId) {
                    newState.roomIdError = true;
                }
            } else {
                newState.redirectReady = true;
            }

            return newState;
        });
    }

    render() {
        return (
            <div>
                <TextField
                    error={this.state.usernameError}
                    helperText={this.state.usernameError && 'A username is required to enter a room'}
                    label="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                />
                <TextField
                    error={this.state.roomIdError}
                    helperText={this.state.roomIdError && 'A roomId is required to enter a room'}
                    label="roomId"
                    value={this.state.roomId}
                    onChange={this.onChangeRoomId}
                />
                <Button color="primary" onClick={this.connectToRoom}>Connect to Room</Button>
                {this.state.redirectReady && <Redirect to={`/room/${this.state.roomId}?username=${this.state.username}`}/> }
            </div>
        )
    }
};