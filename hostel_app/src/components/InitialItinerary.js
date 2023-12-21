import React, {useContext} from "react";
import SelectedHostelsContext from "./SelectedHostelsContext";
export default function InitialItinerary(){
    const [selectedHostels, setSelectedHostels] = useContext(SelectedHostelsContext);
    const counter = 1;
    const removeAnHostel = (e, item) =>{
        console.log("removing ", item);
        let updatedHostels = selectedHostels.filter((element) =>{
            return element !== item; //return all other elements
        })
        setSelectedHostels(updatedHostels)
    }
    return(
    <div className="initial_itinerary_summary">
            <h2> Your itinerary</h2>
            <ul>
                {selectedHostels.map((item, index) =>(
                    <li key={index} onClick ={ (e) =>{
                        removeAnHostel(e,item)
                    }}>
                        <span className="cool_number_style">{counter+index}</span>: {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}