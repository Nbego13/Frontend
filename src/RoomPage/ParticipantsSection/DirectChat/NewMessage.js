import React, { useState } from "react";
import sendMessageButton from "../../../resources/images/sendMessageButton.svg";
import * as Wss from '../../../utils/wss';
import { connect } from "react-redux";

const NewMessage = ({ activeConversation, identity }) => {
    const [message, setMessage] = useState('');

    const sendMessage = () => {
        Wss.sendDirectMessage({
            receiverSocketId: activeConversation.socketId,
            identity: identity,
            messageContent: message,
        });

        setMessage('');
    };

    const handleTextChange = (event) => {
        setMessage(event.target.value);

    };

    const handleKeyPressed = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage()
        }
    }

    return (
        <div className="new_message_container new_message_direct_border">
            <input 
            className="new_message_input"
            value = {message}
            onChange={handleTextChange}
            placeholder = 'Type your message..'
            onKeyDown={handleKeyPressed}
            />
            <img
            className="new_message_button"
            src={sendMessageButton}
            onClick={sendMessage}
            />
        </div>
    );
};

const mapStoreStateToProps = (state) => {
    return {
        ...state,
    }
}

export default connect(mapStoreStateToProps)(NewMessage);