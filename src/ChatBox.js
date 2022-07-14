import React from "react";
import './ChatBox.css';

export default ({ text, username, handleTextChange, isTyping }) => (
  <div>
    <div className="row">
    <div className="col-xs-12">
      <div className="chat">
        <div className="col-xs-5 col-xs-offset-3">
          <input
            type="text"
            value={text}
            placeholder="enter your message"
            className="form-control"
            onChange={handleTextChange}
            onKeyDown={isTyping}
          />

        </div>

        <div className="clearfix"></div>
      </div>
    </div>

    <h4 className="greetings">Hello, {username}</h4>
  </div>
    </div>
);
