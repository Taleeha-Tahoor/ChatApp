import React, { useContext } from 'react'
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native'
import { AntDesign } from "@expo/vector-icons";
import { GlobalContext } from '../context';
import Chatcomponent from '../componenets/Chatcomponent';

export default function Chatscreen() {

    const {
    currentUser,
    allChatRooms,
    setAllChatRooms,
    modalVisible,
    setModalVisible,
    setCurrentUser,
    setShowLoginView,
  } = useContext(GlobalContext);


    return (
        <View style={styles.container}>
           <View style={styles.topContainer}>
        <View style={styles.header}>
          <Text style={styles.heading}>Welcome {currentUser}</Text>
          <Pressable>
            <AntDesign name="logout" size={30} color={"black"} />
          </Pressable>
        </View>
      </View>

      {
        allChatRooms && allChatRooms.length > 0 ? 
        <FlatList
        data={allChatRooms}
        
        />

        : null
      }
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
    flex: 1,
  },
  topContainer: {
    backgroundColor: "#fff",
    height: 100,
    width: "100%",
    padding: 20,
    justifyContent: "center",
    marginBottom: 15,
    // flex: 0.3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    
  },
  heading: {
    fontSize: 27,
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: '#2d64b5'
  },
  listContainer: {
    flex: 3.4,
    paddingHorizontal: 10,
  },
  bottomContainer: {
    flex: 0.3,
    padding: 10,
  },
  button: {
    backgroundColor: "#703efe",
    padding: 12,
    width: "100%",
    elevation: 1,
    borderRadius: 50,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
})
