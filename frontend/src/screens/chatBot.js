import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const ChatbotScreen = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: "1", text: "Hello! How can I assist you today?", sender: "bot" },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const userMessage = {
        id: `${messages.length + 1}`,
        text: message,
        sender: "user",
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setMessage("");

      // Simulate bot response after a delay
      setTimeout(() => {
        const botResponse = {
          id: `${messages.length + 2}`,
          text: "Thanks for your message!",
          sender: "bot",
        };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      }, 1000);
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "user" ? styles.userMessage : styles.botMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Chat Section */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.chatContainer}>
          <FlatList
            data={messages}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.messagesList}
          />
        </View>
      </TouchableWithoutFeedback>

      {/* Input Bar - wrapped in KeyboardAvoidingView to move with keyboard */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputWrapper}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            value={message}
            onChangeText={setMessage}
            returnKeyType="send"
            onSubmitEditing={handleSendMessage}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
            <Ionicons name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingBottom: 10, // Prevent the keyboard from pushing everything to the bottom
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  messagesList: {
    paddingBottom: 20,
  },
  messageContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 15,
    maxWidth: "80%",
  },
  userMessage: {
    backgroundColor: "#007BFF",
    alignSelf: "flex-end",
  },
  botMessage: {
    backgroundColor: "#e1e1e1",
    alignSelf: "flex-start",
  },
  messageText: {
    color: "white",
    fontSize: 16,
  },
  inputWrapper: {
    paddingBottom: 10, // Add some space when keyboard is open
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingLeft: 15,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#007BFF",
    borderRadius: 50,
    padding: 10,
  },
});

export default ChatbotScreen;
