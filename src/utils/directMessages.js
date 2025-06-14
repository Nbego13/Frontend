/*import { use } from "react";
import { setDirectChatHistory } from "../store/actions";
import store from "../store/store";

export const appendNewMessageToChatHistory = (data) => {
    const { isAuthor, receiverSocketId, authorSocketId } = data;

    if (isAuthor) {
        appendNewMessageToChatHistory(receiverSocketId, data);
    } else {
        appendNewMessageToChatHistory(authorSocketId, data);
    }
};


const appendNewMessageToChatHistory = (userSocketId, data) => {
    const chatHistory = [...store.getState().directChatHistory];

    const userChatHistory = chatHistory.find(h => h.socketId === userSocketId);

    if (userChatHistory) {

        const newDirectMessage = {
            isAuthor: data.isAuthor,
            messageContent: data.messageContent,
            identity: data.identity
        };

        const newUserChatHistory = {
            ...userChatHistory,
            chatHistory: [...userChatHistory.chatHistory, newDirectMessage]
        };

        const newChatHistory = [
            ...chatHistory.filter(h => h.socketId !== userSocketId),
            newUserChatHistory
        ];

        store.dispatch(setDirectChatHistory(newChatHistory));

    } else {
        const newUserChatHistory = {
            socketId: userSocketId,
            chatHistory: [{
                isAuthor: data.isAuthor,
                messageContent: data.messageContent,
                identity: data.identity
            },
        ],
        };

        const newChatHistory = [...chatHistory, newUserChatHistory];

        store.dispatch(setDirectChatHistory(newChatHistory));
    }
}*/

import React from "react";
import { setDirectChatHistory } from "../store/actions";
import store from "../store/store";

export const appendNewMessageToChatHistory = (data) => {
    const { isAuthor, receiverSocketId, authorSocketId } = data;
    
    if (isAuthor) {
        updateChatHistoryForUser(receiverSocketId, data);
    } else {
        updateChatHistoryForUser(authorSocketId, data);
    }
};

const updateChatHistoryForUser = (userSocketId, data) => {
    const chatHistory = [...store.getState().directChatHistory];
    
    const userChatHistory = chatHistory.find(h => h.socketId === userSocketId);
    
    if (userChatHistory) {
        const newDirectMessage = {
            isAuthor: data.isAuthor,
            messageContent: data.messageContent,
            identity: data.identity
        };

        const newUserChatHistory = {
            ...userChatHistory,
            chatHistory: [...userChatHistory.chatHistory, newDirectMessage]
        };

        const newChatHistory = [
            ...chatHistory.filter(h => h.socketId !== userSocketId),
            newUserChatHistory
        ];

        store.dispatch(setDirectChatHistory(newChatHistory));
    } else {
        const newUserChatHistory = {
            socketId: userSocketId,
            chatHistory: [{
                isAuthor: data.isAuthor,
                messageContent: data.messageContent,
                identity: data.identity
            }],
        };

        const newChatHistory = [...chatHistory, newUserChatHistory];

        store.dispatch(setDirectChatHistory(newChatHistory));
    }
}