/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"
import '../Calender/calender.css'

const Timepicker = ({ time, setTime }) => {

    console.log(time)

    return (
        <div className="">
            <DatePicker
                className="custom-calendar purple bg-dark "
                disableDayPicker
                format="HH:mm A"
                onChange={(a, value) => { setTime(value.validatedValue[0]) }}
                plugins={[
                    <TimePicker hideSeconds />
                ]}
            />
        </div>
    );
};

export default Timepicker;