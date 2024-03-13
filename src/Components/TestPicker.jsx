import { useState } from 'react';
import DatePicker from "react-multi-date-picker"

const TestPicker = () => {
    const [value, setValue] = useState()
    function handleChange(value) {
        console.log(value)
        setValue(value)
    }
    return (
        <div>
            <DatePicker
                value={value} // Pass the array of selected dates
                onChange={handleChange}
                multiple // Specify multiple date selection mode (if required)
            />
        </div>
    );
};

export default TestPicker;