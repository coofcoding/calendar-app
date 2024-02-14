import { addHours, differenceInSeconds } from "date-fns";
import { useMemo } from "react";
import { useState } from "react";
import Swal from 'sweetalert2';
import { useUiStore } from "./useUiStore";

export const useEvent = () => {
    
    const { isDateModalOpen, closeDateModal } = useUiStore();
    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formValues, setFormValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours( new Date(), 2),
    })

    const titleClass = useMemo(() => {
        if ( !formSubmitted ) return '';
        return ( formValues.title.trim().length <= 0 ) ? 'border-red-400 bg-red-100 placeholder:text-red-400 focus:text-slate-500' : ''
    }, [formValues.title, formSubmitted]) 

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

    // const onCloseModal = () => {
        
    // }

    const handleSubmit = ( event ) => {
        event.preventDefault();
        setFormSubmitted(true);

        const differente = differenceInSeconds( formValues.end, formValues.start );

        if ( isNaN(differente) || differente < 1 ){
            Swal.fire({
                title: 'Error in data',
                text: 'Please check the date and time and try again.',
                icon: 'error',
                showConfirmButton: false,
                timer: 3000
            });
            return;
        }

        if ( formValues.title.trim().length <= 0 ) return;

    }

    return {
        closeDateModal,
        formValues,
        handleChange, 
        handleDateChange,
        handleSubmit,
        isDateModalOpen,
        // onCloseModal,
        titleClass, 
    }
}