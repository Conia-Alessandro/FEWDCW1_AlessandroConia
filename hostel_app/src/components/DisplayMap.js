import React from "react";
import GetHostels from "./GetHostels";
import ApiErr from "./ApiErr";
import Map from "./Map";

const DisplayMap = ()=>{
    const {status, hostels} =GetHostels();
    if(status === 'fetched'){
        return(
            <Map items={hostels}/>
        )
    }else{
        return(
            <ApiErr/>
        )
    }
    
}
export default DisplayMap;