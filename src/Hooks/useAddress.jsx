import axios from "axios";
import { useEffect, useState } from "react";

const useAddress = () => {
    const [district, setDistrict] = useState([])
    const [upazila, setUpazila] = useState([])
    useEffect(() => {
        axios.get('/district.json')
            .then(res => setDistrict(res.data))
            .catch(err => console.log(err))

        axios.get('/upazila.json')
            .then(res => setUpazila(res.data))
            .catch(err => console.log(err))

    }, [])
    return { district, upazila };
};

export default useAddress;