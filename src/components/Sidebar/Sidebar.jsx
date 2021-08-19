import React from "react"
import Conversation from "./Conversation/Conversation.jsx"

const Sidebar = ({ conversationsList, companionName, setCompanionName, createConversation, setCurrentCompanion, currentCompId }) => {

    const handleChange = e => {
        setCompanionName(e.target.value)
    }

    const onEnterPress = e => {
        if ( e.keyCode === 13 ) {
            createConversation()
        }
    }


    return(
        <>
            <div className="sidebar-navigation">
                <input 
                    className="sidebar-navigation-input" 
                    type="text" 
                    placeholder="Put companion name to create a conversation"
                    onKeyDown={onEnterPress}
                    onChange={handleChange}
                    value={companionName}
                />
            </div>
            <div className="sidebar-container-conversation">
                {conversationsList.map( conversation => {
                    return(
                        <Conversation 
                            key={conversation} 
                            conversation={conversation} 
                            value={companionName} 
                            currentCompId={currentCompId}
                            setCurrentCompanion={setCurrentCompanion} 
                        />
                    )
                })}
            </div>
        </>
    )
}

export default Sidebar