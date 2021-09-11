import { IonButton, IonContent, IonPage, IonRow } from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import useInterval from "../../hooks/useInterval";

interface MessagesProps {
  messages: string[];
}

const Messages: React.FC<MessagesProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    const container = document.getElementById("rolling-list");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };
  useEffect(scrollToBottom, [messages]);

  return (
    <div className='messagesWrapper'>
      {messages.map((message) => (
        <IonRow key={message} className='ion-justify-content-center'>
          {`Someone has failed ${message} just now`}
        </IonRow>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

const Onboarding: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const addMessages = () => {
    setMessages([...messages, `${count}`]);
    setCount(count + 1);
  };

  useInterval(() => {
    addMessages();
  }, 500);

  return (
    <IonPage>
      <IonContent fullscreen>
        <div style={{ marginTop: "2.5rem" }}>
          <IonRow class='ion-justify-content-center ion-no-padding'>
            <h1 style={{ fontSize: "1.25rem", marginBottom: "0px" }}>THE</h1>
          </IonRow>
          <IonRow class='ion-justify-content-center ion-no-padding'>
            <h1
              style={{
                fontSize: "2.25rem",
                fontWeight: "bolder",
                marginTop: "0px",
              }}
            >
              WALL OF SHAME
            </h1>
          </IonRow>
        </div>
        <div style={{ height: "50%", overflow: "scroll" }} id={"rolling-list"}>
          <Messages messages={messages} />
        </div>
        <IonButton onClick={addMessages}>Add Entry</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Onboarding;
