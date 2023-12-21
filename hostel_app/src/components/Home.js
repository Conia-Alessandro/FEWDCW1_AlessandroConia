import React, { useState, useEffect } from "react";
import AppSection from "./AppSection";
import { items } from "../data/hostels";
import Search from "./Search";
import FilterContext from "./FilterContext";
import Filters from "./Filters";
import { FiCalendar } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const Home = () => {
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [cafeSelected, setCafeSelected] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    useEffect(() => {
        //might be used for issues on sync
    }, [selectedFilters, cafeSelected]);
    const handleClick = (evt, selectedFilter) => {
        let newState = [...selectedFilters, selectedFilter];
        setSelectedFilters(newState);
        console.log(selectedFilter);
    }
    const removeFilter = (evt, selectedFilter) => {
        console.log("removing ", selectedFilter);
        let updatedFilterList = selectedFilters.filter((element) => {
            return element !== selectedFilter;
        })
        setSelectedFilters(updatedFilterList);
    }
    return (
        <div className="App">
            <AppSection>
                <Filters>
                    <label>Cafe</label>
                    <input id="filter_cafe" type="checkbox" name="cafe"
                        onChange={(evt) => {
                            //setCafeSelected(!cafeSelected);
                            setCafeSelected((prevCafeSelected) => !prevCafeSelected);
                            if (!cafeSelected) {
                                handleClick(evt, evt.target.name);
                            } else {
                                removeFilter(evt, evt.target.name);
                            }
                        }} />
                    <div className="date-picker-container">
                        <div className="date-picker">
                            <FiCalendar className="calendar-icon" />
                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                        </div>
                        <div className="date-picker">
                            <FiCalendar className="calendar-icon" />
                            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                        </div>
                    </div>
                    <p className={cafeSelected ? "selected" : "not_selected"}>{cafeSelected ? "filters applied" : "filters removed"}</p>
                </Filters>
            </AppSection>
            <AppSection>
                <FilterContext.Provider value={[selectedFilters, setSelectedFilters]}>
                    <Search details={items} /> 
                </FilterContext.Provider>
            </AppSection>
         
        </div>
    )
}
export default Home;