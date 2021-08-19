import React, { useEffect, useState, useRef } from 'react'
import moment from 'moment'
import { defaultAvatar_url } from '../AppMessanger.jsx'
import { postUserConvarsation, updateUserConvarsation } from '../../utils/ws.js'
import Chat from './Chat/Chat.jsx'
import Sidebar from '../Sidebar/Sidebar.jsx'
import { set_current_user } from '../../redux-store/actions/client.actions.js'
import { currentUserSelector, logginedUserSelector } from '../../redux-store/selectors/client.selectors.js'
import { connect } from 'react-redux'

const loginnedUser = JSON.parse(localStorage.getItem("login"))

const Messanger = ({ CompanionData, clientData, currentCompId, ws, currentUser, setCurrentUser }) => {
    ws.onmessage = e => setClientMessages(prev => [...prev, JSON.parse(e.data)])

    //init data from server
    const [ currentClientData, setCurrentClientData ] = useState({})
    const [ conversationsList, setConversationsList ] = useState([])

    //update server data
    const [ clientMessages, setClientMessages ] = useState([])
    const [ message, setMessage ] = useState('')
    const [ companionName, setCompanionName ] = useState('')
    const [ currentCompanion, setCurrentCompanion ] = useState(null)
    const [ avatarUrl, setAvatarUrl ] = useState('')

    console.log(currentCompId)

    useEffect(() => {
        if ( clientData.length > 0 ) {
            const data = clientData.find(el => el[`${loginnedUser}`])
            setCurrentClientData(data)
            setConversationsList(Object.keys(data[`${loginnedUser}`].companions))
            setAvatarUrl(data[`${loginnedUser}`].companions[`${currentCompId}`].avatar_url)
            setClientMessages(data[`${loginnedUser}`].companions[`${currentCompId}`].messages)
        }
    }, [clientData, currentCompId])

    const handleChange = e => {
        setMessage(e.target.value)
    }

    const onEnterPress = e => {
        if ( e.keyCode === 13 ) {
            sender()
        }
    }

    const sender = () => {
        // if (ws.readyState !== 1) {
        //     setTimeout(() => {
        //         sender()
        //     }, 0.001)
        // } else {
        //     const newMessage = {
        //             ID: Math.random() * 10,
        //             message: message,
        //             date: moment(),
        //             sender: currentUser,
        //         }
        //     ws.send(JSON.stringify(newMessage))
        // }
        if (message.split('').length > 0) {

            const newMessage = {
                ID: Math.random() * 10,
                message: message,
                date: moment(),
                sender: currentUser,
            }

            const newData = { 
                [`${loginnedUser}`]: {
                    ...currentClientData[`${loginnedUser}`],
                    companions: {
                        ...currentClientData[`${loginnedUser}`].companions,
                        [`${currentCompId}`]: {
                            ...currentClientData[`${loginnedUser}`].companions[`${currentCompId}`],
                            messages: [...clientMessages, newMessage],
                        }
                    }
                }
            }

            updateUserConvarsation( currentClientData.id, newData )
            setMessage('')
            setTimeout(() => window.location.reload(), 200)
        }
    }

    const createConversation = () => {
        if ( companionName.length > 0 ) {

            const newData = { 
                [`${loginnedUser}`]: {
                    ...currentClientData[`${loginnedUser}`],
                    companions: {
                        ...currentClientData[`${loginnedUser}`].companions,
                        [`${companionName}`]: {
                            id: companionName,
                            avatar_url: defaultAvatar_url,
                            messages: [],
                        }
                    }
                }
            }

            updateUserConvarsation( currentClientData.id, newData )
            setCompanionName('')
            setTimeout(() => window.location.reload(), 300)
        }
    }

    const createUser = () => {
        const newData = { 
            [`${loginnedUser}`]: { 
                id: loginnedUser, 
                isLogin: true,
                password: "example123",
                companions: {
                    [`${CompanionData.id}`]: {
                        id: CompanionData.id,
                        avatar_url: defaultAvatar_url,
                        messages: [],
                    }
                }
            }
        }
        postUserConvarsation( newData )
    }

    const toggleUser = () => {
        const user = currentUser === loginnedUser ? currentCompId : loginnedUser
        console.log(currentUser)
        setCurrentUser(user)
    }

    if ( clientData.length < 0 ) {
        return null
    }

    return(
        <>
            <div className="messanger">
                <div className="sidebar">
                    <Sidebar 
                        conversationsList={conversationsList}
                        companionName={companionName}
                        setCompanionName={setCompanionName}
                        createConversation={createConversation}
                        currentCompanion={currentCompanion}
                        setCurrentCompanion={setCurrentCompanion}
                        currentCompId={currentCompId}
                    />
                </div>
                <div className="currentChat">
                    <Chat 
                        clientMessages={clientMessages}
                        currentUser={currentUser}
                        message={message}
                        currentCompId={currentCompId}
                        currentClientData={currentClientData}
                        avatarUrl={avatarUrl}
                        setMessage={setMessage}
                    />
                    <div className="navigation">
                        <button 
                            className="navigation-btn left" 
                            onClick={() => toggleUser()}
                        >Toggle User</button>
                        <input 
                            className="navigation-input" 
                            type="text" onKeyDown={onEnterPress} 
                            onChange={handleChange} value={message} 
                            maxLength="120" 
                            placeholder="Put your message" 
                        />
                        <button 
                            className="navigation-btn right" 
                            onClick={() => createUser()}
                        >Send</button>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapState = state => {
    return {
        currentUser: currentUserSelector(state),
        loginnedUser: logginedUserSelector(state),
    }
}

const mapDispatch = {
    setCurrentUser: prop => set_current_user(prop),
}

export default connect( mapState, mapDispatch )( React.memo( Messanger, ( prevProps, nextProps ) => prevProps === nextProps ? true : false ) )