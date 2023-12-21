import React, { useState, useEffect, useContext } from "react";
import FilterContext from "./FilterContext";
import Map from "./Map";
import AppSection from "./AppSection";

function Search({ details }) {
  const [filters, setFilters] = useContext(FilterContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [hostelId, setHostelId] = useState("");
  const [filtered, setFiltered] = useState(details);

  useEffect(() => {
    // Update the filtered data when filters change.
    if (filters.length !== 0) {
      if (filters.includes("cafe")) {
        const cafeHotels = details.filter((entry) => entry.cafe);
        setFiltered(cafeHotels);
      } else {
        console.log("You must have selected another filter");
        // Add additional filters for each facility and filter on the previous one.
      }
    } else {
      // If no filters, use the original data.
      setFiltered(details);
    }
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
