import React from 'react';
import { updateUserConvarsation } from '../../../../../utils/ws';

const Modal = ({ setMessage, id, clientMessages, currentClientData, message, currentCompId }) => {

    const loginnedUser = 'shulgamalthael';

    const onEdit = () => setMessage(message);

    const onDelete = ( e, id ) => {
        e.stopPropagation();
        const newList = clientMessages.filter( mess => mess.ID !== id );
        const newData = { 
            [`${loginnedUser}`]: {
                ...currentClientData[`${loginnedUser}`],
                companions: {
                    ...currentClientData[`${loginnedUser}`].companions,
                    [`${currentCompId}`]: {
                        ...currentClientData[`${loginnedUser}`].companions[`${currentCompId}`],
                        messages: [...newList],
                    }
                }
            }
        }
        updateUserConvarsation( currentClientData.id, newData )
    }

    return(
        <div className="modal">
            <div onClick={ e => onDelete( e, id )} className="modal_btn">Delete</div>
            <div onClick={ e => onEdit() } className="modal_btn">Edit</div>
            <div className="modal_btn">Replace</div>
            <div className="modal_btn">Pin</div>
        </div>
    )
}

export default React.memo( Modal, ( prevProps, nextProps ) => prevProps === nextProps ? true : false );