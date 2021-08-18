import React, { useState } from 'react';
import moment from 'moment';
import Modal from './Modal/Modal.jsx';

const Message = ({ ID, message, date, toggleUserStyle, setMessage, clientMessages, currentClientData, currentCompId }) => {

    const [ isModal, setIsModal ] = useState(false);

    const showModal = ( e, id ) => {
        e.stopPropagation();
        if ( id == e.target.id ) {
            setIsModal(!isModal);
        }
    }

    return(
        <div onClick={e => showModal(e, ID)} className={`messages-container_item`} id={ID}>
            <div className={`messages-container_item-message ${toggleUserStyle}`} id={ID}>
                <span className="messages-container_item-message-text" id={ID}>
                    {message}
                </span>
                <span className="messages-container_item-message-date" id={ID}>
                    {moment(date).fromNow()}
                </span>
                {isModal 
                    ?   <Modal 
                            message={message} 
                            setMessage={setMessage} 
                            setIsModal={setIsModal}
                            id={ID} 
                            clientMessages={clientMessages} 
                            currentClientData={currentClientData} 
                            currentCompId={currentCompId}
                        /> 
                    : null}
            </div>
        </div>
    )

}

export default React.memo( Message, ( prevProps, nextProps ) => prevProps === nextProps ? true : false );