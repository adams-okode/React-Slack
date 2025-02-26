import React from "react";
import styled from "styled-components";

function ChatMessage({ message, timestamp, user, userImage }) {
  return (
    <>
      <MessageContainer>
        <img src={userImage} alt="" />
        <MessageInfo>
          <h4>
            {user}
            <span>{(timestamp && timestamp?.toDate().toString()) || ""}</span>
          </h4>

          <p>{message}</p>
        </MessageInfo>
      </MessageContainer>
    </>
  );
}

export default ChatMessage;

const MessageContainer = styled.div`
  display: flex;
  padding: 20px;
  > img {
    height: 50px;
    border-radius: 8px;
  }
`;

const MessageInfo = styled.div`
  padding-left: 8px;
  > h4 > span {
    color: gray;
    font-weight: 300;
    margin-left: 4px;
    font-size: 10px;
  }
`;
