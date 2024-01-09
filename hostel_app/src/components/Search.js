import React, { useState, useEffect, useContext } from "react";
import FilterContext from "./FilterContext";
import Map from "./Map";
import AppSection from "./AppSection";

function Search({ details}) {
  const [filters, setFilters] = useContext(FilterContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [hostelId, setHostelId] = useState("");
  const [filtered, setFiltered] = useState(details);

  
  useEffect(() => {
    const filterData = () => {
      let preFiltered = details;
      console.log(filters);
      if (filters.includes("cafe")) {
        console.log("cafe!");
        preFiltered = preFiltered.filter((entry) => entry.facilities.cafe);
        console.log(preFiltered);
      }
      if (filters.includes("freeWifi")) {
        console.log("freewifi!");
        preFiltered = preFiltered.filter((entry) => entry.facilities.freeWifi);
        console.log(preFiltered);
      }
      if (filters.includes("privateRooms")) {
        console.log("privaterooms!");
        preFiltered = preFiltered.filter((entry) => entry.facilities.privateRooms);
        console.log(preFiltered);
      }
      if (filters.includes("security")) {
        console.log("security!");
        preFiltered = preFiltered.filter((entry) => entry.facilities.security);
        console.log(preFiltered);
      }
      if (filters.includes("lockers")) {
        preFiltered = preFiltered.filter((entry) => entry.facilities.lockers);
      }
      if (filters.includes("commonBathrooms")) {
        preFiltered = preFiltered.filter((entry) => entry.facilities.commonBathrooms);
      }
      if (filters.includes("usbPorts")) {
        preFiltered = preFiltered.filter((entry) => entry.facilities.usbPorts);
      }
  
      return preFiltered;
    };
  
    // Update the filtered data when filters change.
    setFiltered((prevFiltered) => filterData(prevFiltered));
  }, [filters, details]);
  

  const handleInputChange = (evt) => {
    evt.preventDefault();
    setSearchQuery(evt.target.value);
  };

  const handleBlur = () => {
    // Check the selected option and set the hostel ID
    const datalist = document.getElementById("hostelOptions");
    const options = datalist.getElementsByTagName("option");
    const selectedOption = Array.from(options).find(
      (option) => option.value === searchQuery
    );

    if (selectedOption) {
      const selectedId = selectedOption.getAttribute("data-id");
      setHostelId(selectedId || "");
    } else {
      setHostelId("");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="HostelName"
        className={`search_field`}
        maxLength={30}
        list="hostelOptions"
        width="300px"
        onChange={handleInputChange}
        onBlur={handleBlur}
        value={searchQuery}
      />
      <datalist id="hostelOptions">
        {filtered.map((hostel) => (
          <option key={hostel.id} value={hostel.name} data-id={hostel.id} />
        ))}
      </datalist>
      <AppSection>
        {hostelId !== "" ? (
          <Map items={filtered} hostelId={hostelId} />
        ) : (
          "Select a Hostel from the list to view it on the map"
        )}
      </AppSection>
    </div>
  );
}

export default Search;
