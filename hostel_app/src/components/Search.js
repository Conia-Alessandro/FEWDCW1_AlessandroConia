import React, { useState ,useEffect, useContext} from "react";
import FilterContext from "./FilterContext";
function Search({details}){
    const [filters,setFilters] = useContext(FilterContext);
    /* filters is: cafe, location, etc */
    const [searchQuery, setSearchQuery] = useState("");
    //add filter for equal name
    //add other filters (such as cafe (pass through context))
    const [filtered, setFiltered] = useState(details);
    
    useEffect(() => {
        // Update the filtered data when filters change.
        if (filters.length !== 0) {
          const cafeHotels = details.filter((entry) => entry.cafe);
          setFiltered(cafeHotels);
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
                console.log(searchQuery);
            }}
            onInput={(evt) =>{
                //value generated on click
                evt.preventDefault();
                console.log(evt.target.value);}}
            />
            <datalist id="hostelOptions">
                    {filtered.map((hostel) => (
                        <option key={hostel.id} value={hostel.name} />
                    ))}
            </datalist>
        </div>
        //Display Map goes here with a filtered searchQuery
    )
}
export default Search;