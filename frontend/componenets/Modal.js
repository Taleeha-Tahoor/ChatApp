import React, { useContext, useState } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    Pressable,
    View,
    TextInput,
    StatusBar,
    Keyboard,
} from "react-native";
import { GlobalContext } from "../context";
import { socket } from "../utils/index";

const NewGroupModal = () => {
    const {
        modalVisible,
        setModalVisible,
        currentGroupName,
        setCurrentGroupName,
        
    } = useContext(GlobalContext);

    function handleCreateNewRoom(){
        console.log(currentGroupName)
        socket.emit("createNewGroup", currentGroupName)
        setModalVisible(false)
        setCurrentGroupName('')
        Keyboard.dismiss()
    }


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                ToastAndroid.showWithGravity("Modal has been closed", ToastAndroid.SHORT, ToastAndroid.TOP);
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TextInput
                        autoCorrect={false}
                        placeholder="Enter group name"
                        style={styles.loginInput}
                        onChangeText={(value) => setCurrentGroupName(value)}
                        value={currentGroupName}
                    />
                    <View style={styles.buttonWrapper}>
                        <Pressable style={styles.button} onPress={handleCreateNewRoom}>
                            <View>
                                <Text style={styles.buttonText}>Add</Text>
                            </View>
                        </Pressable>
                        <Pressable
                            onPress={() => setModalVisible(false)}
                            style={styles.button}
                        >
                            <View>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 55,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
    loginInput: {
        borderRadius: 15,
        borderWidth: 1,
        padding: 15,
        height: 55,
        width: 260
    },
    button: {
        backgroundColor: "#2d64b5",
        padding: 15,
        marginVertical: 10,
        elevation: 2,
        borderRadius: 15,
        width: 120,
        marginTop: 30
    },
    buttonWrapper: {
        flexDirection: "row",
        gap: 10,
    },
    buttonText: {
        textAlign: "center",
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});

export default NewGroupModal;
