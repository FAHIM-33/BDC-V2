import { FaUser } from "react-icons/fa";
import Divider from "../../../Components/Divider";

const Card = ({ data }) => {
    return (
        <div className="border-2 border-low text-center rounded-md bg-fadegray flex p-2 flex-col">
            <FaUser className="text-3xl mx-auto"></FaUser>
            <p className="flex-grow text-2xl ">{data.title}</p>
            <Divider></Divider>
            <p className="text-5xl font-bold text-sec">{data.total}</p>
        </div>
    );
};

export default Card;