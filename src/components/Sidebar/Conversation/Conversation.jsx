import React from 'react'
import { Link } from 'react-router-dom'

const loginnedUser = JSON.parse(localStorage.getItem("login"))

const Conversation = ({ conversation, setCurrentCompanion, currentCompId }) => {

    const conversationClass = currentCompId === conversation ? "sidebar-container-conversation-item_current" : "sidebar-container-conversation-item"


    return (
        <div className={conversationClass} onClick={ () => setCurrentCompanion(conversation) }>
            <Link to={`/${loginnedUser}/conversations/${conversation}`}>
                <p className="sidebar-container-conversation-item-message">
                    {`${conversation}`}
                </p>
            </Link>
        </div>
    )
}

export default Conversation