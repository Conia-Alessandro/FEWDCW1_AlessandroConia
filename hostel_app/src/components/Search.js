import React, { useState ,useEffect, useContext} from "react";
import FilterContext from "./FilterContext";
import Map from "./Map";
import AppSection from "./AppSection";
function Search({details}){
    const [filters,setFilters] = useContext(FilterContext);
    /* filters is: cafe, location, etc */
    const [searchQuery, setSearchQuery] = useState("");
    const [hostelId, setHostelId] = useState("");
    //add filter for equal name
    //add other filters (such as cafe (pass through context))
    const [filtered, setFiltered] = useState(details);
    
    useEffect(() => {
        // Update the filtered data when filters change.
        if (filters.length !== 0) {
            if(filters.includes("cafe")){
                const cafeHotels = details.filter((entry) => entry.cafe);
                setFiltered(cafeHotels);
            }else{
                console.log("you must have selected another filter");
                //add additional filters for each facilities, and filter on the previous one.
            }
          
        } else {
          // If no filters, use the original data.
          setFiltered(details);
        }
      }, [filters, details]);
    console.log("length is",filters.length );
    return(
        <div>
            <input type="text" placeholder="HostelName" className={`search_field`}
            maxLength={30}
            list="hostelOptions"
            width="300px"
            onChange={ (evt) =>{
                evt.preventDefault();
                setSearchQuery(evt.target.value);
                let specificEntryOnQuery = filtered.find((entry) =>{ return entry.id === evt.target.getAttribute('data-id')});
                if( specificEntryOnQuery !== undefined){
                    setHostelId(specificEntryOnQuery.id); //the one found
                }else{
                    //none specific found, try to check by name at most 
                    let atMostEntries = filtered.filter((entry) =>{ return entry.name.toLowerCase().includes(searchQuery.toLowerCase())});
                    if(atMostEntries.length >0 ){
                        setHostelId(atMostEntries[0].id)
                    }
                    else{
                        setHostelId("");
                    }
                }
                console.log(searchQuery);
            }}
            onInput={(evt) =>{
                //value generated on click
                evt.preventDefault();
                //in order to fix issue with search query
                setSearchQuery(evt.target.value);
                setHostelId(evt.target.getAttribute('data-id')); // "1" for instance if it's the first hostel
                console.log(searchQuery);
            }}
            />
            <datalist id="hostelOptions">
                    {filtered.map((hostel) => (
                        <option key={hostel.id} value={hostel.name} data-id={hostel.id} />
                    ))}
            </datalist>
            <AppSection>
                {hostelId !=="" ? <Map items={filtered} hostelId={hostelId}/> : "Select a Hostel from the list to view it on the map"}
            </AppSection>
            
        </div>
    )
}
export default Search;