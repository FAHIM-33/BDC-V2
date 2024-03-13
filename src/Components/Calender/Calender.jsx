/* eslint-disable react/prop-types */



import DatePicker from "react-multi-date-picker";

import "react-multi-date-picker/styles/colors/purple.css"
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"

import './calender.css'

const Calender = ({ dateValue, setDateValue }) => {

    
    return (
        <div className="h-full">
            <DatePicker
                className="custom-calendar purple bg-dark "
                format="D MMMM YYYY"

                value={dateValue}

                mapDays={({ date }) => {
                    let props = { className: 'text-white shadow-none' }
                    let isWeekend = [0, 6].includes(date.weekDay.index)

                    if (isWeekend) props.className = "highlight highlight-red"

                    return props
                }}

                onChange={(a, b) => { setDateValue(b.validatedValue[0]) }}

                render={(value, openCalendar) => {

                    return (
                        <button
                            className="input-similar w-full block"
                            onClick={() => openCalendar()}
                        >
                            {value}
                        </button>
                    )
                }}

            />


        </div>
    );
};

export default Calender;