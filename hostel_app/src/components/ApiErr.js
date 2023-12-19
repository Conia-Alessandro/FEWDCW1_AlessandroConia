import React from "react";
import { FaExclamationTriangle } from 'react-icons/fa';

const ApiErr = () => {
    return (
        <div className="err_api">
            <h3>Work in progress, no API Err!</h3>
            <FaExclamationTriangle className="icon" />
            <p>this is an Expected issue with API in the retrieval of JSON data, TBA soon!</p>
        </div>
    )
}
export default ApiErr;