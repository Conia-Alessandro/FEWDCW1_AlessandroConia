import React from "react";
import GetHostels from "./GetHostels";
import ApiErr from "./ApiErr";
import Map from "./Map";
//import {items as hostelItems} from "../data/hostels.js"; 
const DisplayMap = ()=>{
    const {status, hostels} =GetHostels();
    //const [status, hostels] = ["fetched", hostelItems]; /* manual debug*/
    //console.log("status is", status); /* manual debug*/
    if(status === 'fetched'){ /* if the data was fetched successful */
        return(
           <Map items={hostels} hostelId={"2"}/>
        )
    }else{
        return(
            <ApiErr/>
        )
    }
    
}
export default DisplayMap;