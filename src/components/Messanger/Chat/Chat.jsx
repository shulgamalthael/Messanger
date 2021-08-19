import React, { useState } from 'react';
import Header from './Header/Header.jsx';
import Message from './Message/Message.jsx';
import Modal from "../Chat/Message/Modal/Modal"
const Chat = ({ clientMessages, currentCompId, currentClientData, avatarUrl, setMessage }) => {

    const [ isModal, setIsModal ] = useState(false);

    const showModal = ( e, id ) => {
        e.stopPropagation();
        if ( id == e.target.id ) {
            setIsModal(!isModal);
        }
    }

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
                        <>
                            <Message 
                                key={newId} 
                                {...mess} 
                                toggleUserStyle={toggleUserStyle}
                                setMessage={setMessage}
                                clientMessages={clientMessages}
                                currentClientData={currentClientData}
                                currentCompId={currentCompId}
                                onClick={ e => showModal(e, newId) }
                            />
                            {isModal 
                                ? 
                                    <Modal 
                                        // message={message} 
                                        // setMessage={setMessage} 
                                        setIsModal={setIsModal}
                                        clientMessages={clientMessages} 
                                        currentClientData={currentClientData} 
                                        currentCompId={currentCompId}
                                    /> 
                                : null
                            }
                        </>
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