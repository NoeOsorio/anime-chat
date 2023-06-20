import React, { useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { Chat, MessageType, User } from "@flyerhq/react-native-chat-ui";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { sendChat } from "../services/chat";

const ChatScreen = () => {
  const [messages, setMessages] = useState<MessageType.Any[]>([]);
  const user: User = useMemo(
    () => ({
      id: 'f9f472ca-01c4-4abf-a50f-80d90f716611',
      firstName: "Noe",
    }),
    []
  );
  const friend: User = useMemo(
    () => ({
      id: uuidv4(),
      firstName: "Miku",
      lastName: "Nakano",
      imageUrl:
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ea421add-6bd0-4cf8-aa09-a6be7c8f37c7/dehhagy-1afc7fa4-387f-4cd4-acc5-f1607909bbd1.jpg/v1/fill/w_736,h_736,q_75,strp/miku_nakano_icon_by_dprospect_dehhagy-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzM2IiwicGF0aCI6IlwvZlwvZWE0MjFhZGQtNmJkMC00Y2Y4LWFhMDktYTZiZTdjOGYzN2M3XC9kZWhoYWd5LTFhZmM3ZmE0LTM4N2YtNGNkNC1hY2M1LWYxNjA3OTA5YmJkMS5qcGciLCJ3aWR0aCI6Ijw9NzM2In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.21MbWpqLe9NifJqhP3_ZDbK_M2X8XkYQEEAxpchibGQ",
    }),
    []
  );
  const addMessage = (message: MessageType.Any) => {
    setMessages((previousMessages) => [message, ...previousMessages]);
  };

  const handleSendPress = async (message: MessageType.PartialText) => {
    const textMessage: MessageType.Text = {
      author: user,
      createdAt: Date.now(),
      id: uuidv4(),
      text: message.text,
      type: "text",
    };
    addMessage(textMessage);

    const responseText = await sendChat(textMessage.text)
    const response: MessageType.Text = {
      author: friend,
      createdAt: Date.now(),
      id: uuidv4(),
      text: responseText,
      type: "text",
    };
    addMessage(response);
  };
  return (
    // Remove this provider if already registered elsewhere
    // or you have React Navigation set up
    <SafeAreaProvider>
      <Chat
        showUserAvatars
        showUserNames
        sendButtonVisibilityMode="always"
        messages={messages}
        onSendPress={handleSendPress}
        user={user}
      />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageBubble: {
    backgroundColor: "#f0f0f0",
    borderRadius: 16,
    padding: 10,
  },
});

export default ChatScreen;
