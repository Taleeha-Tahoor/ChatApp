import React, { useContext, useEffect } from 'react'
import { View, Text, ImageBackground, StyleSheet, ToastAndroid, Pressable, TextInput, Alert, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { GlobalContext } from '../context'

export default function Homescreen({ navigation }) {

    const { showLoginView, setShowLoginView, currentUserName,
        setCurrentUserName, currentUser,
        setCurrentUser,
        allUsers,
        setAllUsers, } = useContext(GlobalContext)

    function handleRegisterAndSignIn(isLogin) {
        if (currentUserName.trim() !== "") {
            const index = allUsers.findIndex(
                (userItem) => userItem === currentUserName
            );

            if (isLogin) {
                if (index === -1) {
            ToastAndroid.showWithGravity("Please register first", ToastAndroid.SHORT, ToastAndroid.TOP);
                } else {
                    setCurrentUser(currentUserName);
                }
            } else {
                if (index === -1) {
                    allUsers.push(currentUserName);
                    setAllUsers(allUsers);
                    setCurrentUser(currentUserName);
                } else {
            ToastAndroid.showWithGravity("Already registered. Please Login", ToastAndroid.SHORT, ToastAndroid.TOP);
                }
            }

            setCurrentUserName("");
        } else {
            ToastAndroid.showWithGravity("Username field is empty", ToastAndroid.SHORT, ToastAndroid.TOP);
        }

        Keyboard.dismiss();
    }

    useEffect(() => {
        if (currentUser.trim() !== "") navigation.navigate("Chatscreen");
    }, [currentUser]);

    console.log(allUsers, currentUser);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.container}>
                        <ImageBackground source={require("../assets/homeImg.jpg")}
                            style={styles.backImg} />

                        <View style={styles.content}>
                            {
                                showLoginView ?
                                    (<View style={styles.infoBlock}>
                                        <View style={styles.LoginInputContainer}>
                                            <Text style={styles.heading}>Enter Your User Name</Text>
                                            <TextInput
                                                autoCorrect={false}
                                                placeholder="Username"
                                                style={styles.loginInput}
                                                onChangeText={(value) => setCurrentUserName(value)}
                                                value={currentUserName}
                                            />
                                        </View>
                                        <View style={styles.buttonWrapper}>
                                            <Pressable
                                                onPress={() => handleRegisterAndSignIn(false)}
                                                style={styles.button}
                                            >
                                                <View>
                                                    <Text style={styles.buttonText}>Register</Text>
                                                </View>
                                            </Pressable>
                                            <Pressable
                                                onPress={() => handleRegisterAndSignIn(true)}
                                                style={styles.button}
                                            >
                                                <View>
                                                    <Text style={styles.buttonText}>Login</Text>
                                                </View>
                                            </Pressable>
                                        </View>
                                    </View>)
                                    :
                                    (
                                        <View style={styles.infoBlock}>
                                            <Text style={styles.heading}>Connect, Grow and Inspire</Text>
                                            <Text style={styles.subHeading}>
                                                Connect people around the world for free
                                            </Text>
                                            <Pressable
                                                style={styles.button}
                                                onPress={() => setShowLoginView(true)}
                                            >
                                                <View>
                                                    <Text style={styles.buttonText}>Get Started</Text>
                                                </View>
                                            </Pressable>
                                        </View>
                                    )}
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 100,
        backgroundColor: 'white',
        paddingBottom: 50,
    },
    backImg: {
        width: '100%',
        // flex: 2,
        height: 300
    },
    content: {
        // flex: 1,
        // alignItems: "center",
        // justifyContent: "center",
        width: "100%",
        backgroundColor: "#fff",
    },
    infoBlock: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    heading: {
        fontSize: 27,
        fontWeight: "bold",
        color: "#000",
        marginVertical: 20,
    },
    subHeading: {
        fontSize: 16,
        color: "#acacac",
        marginBottom: 15,
    },
    loginInput: {
        borderRadius: 15,
        borderWidth: 1,
        padding: 15,
        height: 50
    },
    button: {
        backgroundColor: "#2d64b5",
        padding: 15,
        marginVertical: 10,
        width: "40%",
        elevation: 2,
        borderRadius: 15,
    },
    buttonWrapper: {
        flexDirection: "row",
        gap: 10,
        marginTop: 20
    },
    buttonText: {
        textAlign: "center",
        color: "#fff",
        fontWeight: "bold",
        fontSize: 15,
    },

})
