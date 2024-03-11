import { useState } from "react";
import { FaFilter } from "react-icons/fa";

const Filter = ({ handleFilter }) => {
    const [show, setShow] = useState(false)
    return (
        <div className="flex justify-end relative">
            <button
                onClick={() => setShow(!show)}
                className="mr-4 btn border-2 border-high rounded-md px-2 py-1">
                <FaFilter></FaFilter>
                Filter</button>
            <div
                className={`absolute space-y-1 top-10 bg-background border border-high p-2 rounded-md right-4 z-10 ${show ? '' : 'hidden'}`}>
                <button onClick={() => handleFilter('')} className="btn w-full p-1 rounded-md bg-fadegray">All Users</button>
                <button onClick={() => handleFilter('blocked')} className="btn w-full p-1 rounded-md bg-fadegray">Blocked users</button>
                <button onClick={() => handleFilter('active')} className="btn w-full p-1 rounded-md bg-fadegray">Active Users</button>
            </div>
        </div>
    );
};

export default Filter;