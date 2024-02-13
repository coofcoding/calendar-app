import { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export const CalendarModal = () => {

    const [isOpen, setIsOpen] = useState(true)

    const onCloseModal = () => {
        setIsOpen(false)
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onCloseModal}
            className='modal'
            overlayClassName='modal-fondo'
            closeTimeoutMS={ 200 }
        >
        <h1>Hello</h1>

        </Modal>
    )
}
