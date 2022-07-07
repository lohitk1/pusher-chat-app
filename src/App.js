import React, { Component, useState } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import ChatList from './ChatList';
import ChatBox from './ChatBox';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      username: '',
      chats: []
    };
  }

  componentDidMount() {
    // prompts user to enter a username as soon as they open the app (default: Anonymous)
    const username = window.prompt('Username: ', 'Anonymous');
    this.setState({ username });

    // new Pusher instance for the new user
    const pusher = new Pusher('8412a33a0d172f3a6eb5', {
      cluster: 'us2',
      encrypted: true
    });

    // subscribing the new user to the 'chat's from the channel
    const channel = pusher.subscribe('chat');

    // binding to the events emmitted by the server
    channel.bind('message', data => {
      this.setState({ chats: [...this.state.chats, data], test: '' });
    });

    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange(e) {
    if (e.keyCode === 13) {
      const payload = {
        username: this.state.username,
        message: this.state.text
      };
      axios.post('http://localhost:5000/message', payload);
    } else {
      this.setState({ text: e.target.value });
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React-Pusher Chat</h1>
        </header>
        <section>
          <ChatList chats={this.state.chats} />
          <ChatBox
            text={this.state.text}
            username={this.state.username}
            handleTextChange={this.handleTextChange}
          />
        </section>
      </div>
    );
  }
}

export default App;
