import { addHours } from 'date-fns';
import { useState } from 'react';
import Modal from 'react-modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

Modal.setAppElement('#root');

export const CalendarModal = () => {

    const [isOpen, setIsOpen] = useState(true);

    const [formValues, setFormValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours( new Date(), 2),
    })

    const handleChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const handleDateChange = ( event, changing ) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

    const onCloseModal = () => {
        setIsOpen(false)
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onCloseModal}
            className='p-6 bg-white rounded-lg text-slate-700 inline outline-none w-full max-w-[500px]'
            overlayClassName='modal-fondo'
            closeTimeoutMS={200}
        >
            <h1 className='font-bold text-3xl mb-4'>New event</h1>
            <form className="">

                <div className="mb-2 flex flex-col">
                    <label className='text-slate-500 text-sm'>start date</label>
                    <DatePicker
                        selected={formValues.start}
                        onChange={ ( event ) => handleDateChange( event, 'start' ) }
                        className='w-full px-3 py-2 bg-slate-100 rounded-md border hover:border-violet-400 outline-none focus:ring ring-violet-200 focus:bg-slate-50 text-slate-500 placeholder:text-slate-300 transition-all duration-150 cursor-pointer'
                        dateFormat="Pp"
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
                    />
                </div>


                <div className="mb-2">
                    <label className='text-slate-500 text-sm'>title and notes</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 bg-slate-100 rounded-md border hover:border-violet-400 outline-none focus:ring ring-violet-200 focus:bg-slate-50 text-slate-500 placeholder:text-slate-300 transition-all duration-150"
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
