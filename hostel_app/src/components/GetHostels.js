import { useEffect, useState, useCallback } from "react";
/* The following is a function that retrives the hostels from the API. */
const GetHostels = () => {
    const [status, setStatus] = useState('idle');
    const [hostels, setHostels] = useState([]); // Initial state to empty array

    const fetchData = useCallback(() => {
        const url = "../data/hostels.json";
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setHostels(data);
                setStatus('fetched');
            })
            .catch((err) => {
                console.error(err);
                setStatus('error');
            });
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { status, hostels };
};

export default GetHostels;