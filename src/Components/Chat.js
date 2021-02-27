import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, SearchOutlined } from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic';
import MoreVert from '@material-ui/icons/MoreVert';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Chat.css';
import db from '../firebase';
import {useStateValue} from '../store/StateProvider';
import firebase from 'firebase';

function Chat() {

  const [{ user }, dispatch] = useStateValue();

  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (roomId) {
      db
        .collection("rooms")
        .doc(roomId)
        .onSnapshot(snapshot => ( setRoomName(snapshot.data().name) ))
      
      db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy('timestamp', 'asc')
        .onSnapshot(snapshot => ( setMessages(snapshot.docs.map(doc => doc.data())) ))

    }
  }, [roomId])

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000))
  }, [roomId])

  const sendMessage = (e) => {
    e.preventDefault();

    db
      .collection("rooms")
      .doc(roomId)
      .collection("messages")
      .add({
        message: input,
        name: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })

    setInput("");
  }

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>Last seen at {messages.length ? new Date(messages[messages?.length - 1]?.timestamp?.toDate()).toUTCString() : "..." }</p>
        </div>

        <div className="chat__header_right">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      
      <div className="chat__body">
        { messages.map(message => (
          <p className={`chat__message ${user?.displayName === message.name && "chat__receiver"}`}>
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
          </p>
        )
        )}
        

      </div>

      <div className="chat__footer">
        <IconButton>
            <InsertEmoticon />
        </IconButton>

        <form>
          <input 
            type="text" 
            value={input} 
            onChange={ e => setInput(e.target.value) } 
            placeholder="Insert message here" 
          />
          <button 
            type="submit" 
            onClick={sendMessage}
          >
            Send Message
          </button>
        </form>
        
        <IconButton>
            <MicIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default Chat
