import React, { useState } from 'react';
import Header from './Header/Header.jsx';
import Message from './Message/Message.jsx';
const Chat = ({ clientMessages, currentCompId, currentClientData, avatarUrl, setMessage }) => {

    return(
        <>
            <header className="currentChat-header">
                <Header 
                    currentCompId={currentCompId} 
                    currentClientData={currentClientData}
                    avatarUrl={avatarUrl}
                />
            </header>
            <div className="currentChat-container">
                {clientMessages.map(mess => {
                    const iD = Math.random() * 10;
                    const newId = iD === mess.ID ? mess.ID : iD;
                    const toggleUserStyle = mess.sender === currentCompId ? "user2": "user1";

                    return(
                        <Message 
                            key={newId} 
                            {...mess} 
                            toggleUserStyle={toggleUserStyle}
                            setMessage={setMessage}
                            clientMessages={clientMessages}
                            currentClientData={currentClientData}
                            currentCompId={currentCompId}
                        />
                    )
                })}
            </div>
        </>
    )   
}

export default React.memo( Chat, ( prevProps, nextProps ) => prevProps === nextProps ? true : false );

// {clientData.map( data => {
//     return(
//          <>
//              {moment(data.date).format('DD MM YYYY') === moment.format('DD MM YYYY') 
//                  ? <div>{clientData}</div>
//              }
//          </>
//     )
// })}

// {clientMessages.map(mess => {
//     const iD = Math.random() * 10;
//     const newId = iD === mess.ID ? mess.ID : iD;
//     const toggleUserStyle = mess.sender === currentCompId ? "user2": "user1";

//     return(
//       <Message key={newId} {...mess} toggleUserStyle={toggleUserStyle} />
//     )
// })}