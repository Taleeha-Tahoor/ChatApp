import { useContext, useEffect, useLayoutEffect } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { GlobalContext } from "../context";
import Messagecomponent from "../componenets/Messagecomponent";
import  {socket}  from "../utils/index";

export default function Messagescreen({ navigation, route }) {
  const { currentGroupName, currentGroupID } = route.params;
  const {
    allChatMessages,
    setAllChatMessages,
    currentUser,
    currentChatMessage,
    setCurrentChatMessage,
  } = useContext(GlobalContext);

  function handleAddNewMessage() {
    const timeData = {
      hr:
        new Date().getHours() < 10
          ? `0${new Date().getHours()}`
          : new Date().getHours(),
      mins:
        new Date().getMinutes() < 10
          ? `0${new Date().getMinutes()}`
          : new Date().getMinutes(),
    };

    if (currentUser) {
      socket.emit("newChatMessage", {
        currentChatMessage,
        groupIdentifier: currentGroupID,
        currentUser,
        timeData,
      });
      console.log(currentChatMessage)
      setCurrentChatMessage("");
      Keyboard.dismiss();
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({title: currentGroupName})
    socket.emit('findGroup', currentGroupID)
  }, [])

  useEffect(()=>{
    socket.on('foundGroup', (allChats)=> {
      console.log(allChats)
      setAllChatMessages(allChats)})
  },[socket])


  return (
     <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0} // adjust if needed
  >
    <View style={styles.wrapper}>
      <View
        style={[styles.wrapper, { paddingVertical: 15, paddingHorizontal: 10 }]}
      >
        {allChatMessages && allChatMessages[0] ? (
          <FlatList
            data={allChatMessages}
            renderItem={({ item }) => (
              <Messagecomponent item={item} currentUser={currentUser} />
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          ""
        )}
      </View>
      <View style={styles.messageInputContainer}>
        <TextInput
          style={styles.messageInput}
          value={currentChatMessage}
          onChangeText={(value) => setCurrentChatMessage(value)}
          placeholder="Enter your message"
        />

        <Pressable onPress={handleAddNewMessage} style={styles.button}>
          <View>
            <Text style={styles.buttonText}>SEND</Text>
          </View>
        </Pressable>
      </View>
    </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#eee",
  },
  messageInputContainer: {
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: 30,
    paddingHorizontal: 15,
    justifyContent: "center",
    flexDirection: "row",
  },
  messageInput: {
    borderWidth: 1,
    padding: 15,
    flex: 1,
    borderRadius: 15,
    marginRight: 10,
  },
  button: {
    width: "30%",
    backgroundColor: "#2d64b5",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 19,
    fontWeight: 'bold'
  },
});
