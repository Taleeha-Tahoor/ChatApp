import { createContext, useState } from "react";

export const GlobalContext = createContext(null);


function GlobalState({ children }) {

    const [showLoginView, setShowLoginView] = useState(false)
    const [currentUserName, setCurrentUserName] = useState("")
    const [currentUser, setCurrentUser] = useState('')
    const [allUsers, setAllUsers] = useState([])
    const [allChatRooms, setAllChatRooms] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [currentGroupName, setCurrentGroupName] = useState("")
    const [messages, setMessages] = useState({})
    const [allChatMessages, setAllChatMessages] = useState([])
    const [currentChatMessage, setCurrentChatMessage] = useState('')

    return <GlobalContext.Provider
        value={{
            showLoginView, setShowLoginView, currentUserName, setCurrentUserName, currentUser,
            setCurrentUser,
            allUsers,
            setAllUsers,
            allChatRooms,
            setAllChatRooms,
            modalVisible, 
            setModalVisible,
            currentGroupName, 
            setCurrentGroupName,
            messages, 
            setMessages,
            allChatMessages, 
            setAllChatMessages,
            currentChatMessage, 
            setCurrentChatMessage
            
        }}
    >{children}</GlobalContext.Provider>
}

export default GlobalState;