import Modal from 'react-modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEvent } from '../../hooks/useEvent';

Modal.setAppElement('#root');

export const CalendarModal = () => {

    const { formValues, isOpen, titleClass, handleDateChange, handleChange, onCloseModal, handleSubmit } = useEvent();

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onCloseModal}
            className='p-6 bg-white rounded-lg text-slate-700 inline outline-none w-full max-w-[500px]'
            overlayClassName='modal-fondo'
            closeTimeoutMS={200}
        >
            <h1 className='font-bold text-3xl mb-4'>New event</h1>
            <form onSubmit={ handleSubmit }>

                <div className="mb-2 flex flex-col">
                    <label className='text-slate-500 text-sm'>start date</label>
                    <DatePicker
                        selected={formValues.start}
                        onChange={ ( event ) => handleDateChange( event, 'start' ) }
                        className='w-full px-3 py-2 bg-slate-100 rounded-md border hover:border-violet-400 outline-none focus:ring ring-violet-200 focus:bg-slate-50 text-slate-500 placeholder:text-slate-300 transition-all duration-150 cursor-pointer'
                        dateFormat="Pp"
                        showTimeSelect
                        
                    />
                </div>

                <div className="mb-2 flex flex-col">
                    <label className='text-slate-500 text-sm'>end date</label>
                    <DatePicker
                    minDate={ formValues.start }
                        selected={formValues.end}
                        onChange={ ( event ) => handleDateChange( event, 'end' ) }
                        className='w-full px-3 py-2 bg-slate-100 rounded-md border hover:border-violet-400 outline-none focus:ring ring-violet-200 focus:bg-slate-50 text-slate-500 placeholder:text-slate-300 transition-all duration-150 cursor-pointer'
                        dateFormat="Pp"
                        showTimeSelect
                    />
                </div>


                <div className="mb-2">
                    <label className='text-slate-500 text-sm'>title and notes</label>
                    <input
                        type="text"
                        className={`w-full px-3 py-2 bg-slate-100 rounded-md border hover:border-violet-400 outline-none focus:ring ring-violet-200 focus:bg-slate-50 text-slate-500 placeholder:text-slate-300 transition-all duration-150 ${ titleClass }`}
                        placeholder="doing something..."
                        name="title"
                        autoComplete="off"
                        value={ formValues.title }
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-2">
                    <textarea
                        type="text"
                        className="w-full px-3 py-2 bg-slate-100 rounded-md border hover:border-violet-400 outline-none focus:ring ring-violet-200 focus:bg-slate-50 text-slate-500 placeholder:text-slate-300 transition-all duration-150 resize-none"
                        placeholder="description"
                        rows="5"
                        name="notes"
                        value={ formValues.notes }
                        onChange={handleChange}
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="bg-violet-500 w-full h-10 font-bold text-white rounded hover:bg-violet-600 transition-all duration-100"
                >
                    <span>save</span>
                </button>

            </form>

        </Modal>
    )
}
