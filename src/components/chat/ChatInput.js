import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { db } from "../../firebase";
import { doc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

function ChatInput({ chatRef, channelName, channelId }) {
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);

  const sendMessage = (e) => {
    e.preventDefault();

    if (!channelId) {
      return false;
    }

    const message = input;

    setInput("");
    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });

    const docRef = doc(db, "rooms", channelId);

    addDoc(collection(docRef, "messages"), {
      message,
      timestamp: serverTimestamp(),
      user: user?.displayName,
      userImage: user?.photoURL,
    })
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {});
  };

  return (
    <>
      <ChatInputContainer>
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message #${channelName}`}
          />
          <Button hidden type="submit" onClick={sendMessage}>
            SEND
          </Button>
        </form>
      </ChatInputContainer>
    </>
  );
}

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 20px;
  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }

  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
  }

  > form > button {
    display: none !important;
  }
`;
