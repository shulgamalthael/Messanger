import React from 'react';
import { Link } from 'react-router-dom';

const loginnedUser = JSON.parse(localStorage.getItem("login"));

const Conversation = ({ conversation, setCurrentCompanion }) => {
    return (
        <div className="sidebar-container-conversation-item" onClick={ () => setCurrentCompanion(conversation) }>
            <Link to={`/${loginnedUser}/conversations/${conversation}`}>
                <p className="sidebar-container-conversation-item-message">
                    {`${conversation}`}
                </p>
            </Link>
        </div>
    )
}

export default Conversation;