import React, { useState, useEffect ,useCallback } from "react";
import AppSection from "./AppSection";
//import { items } from "../data/hostels";
import Search from "./Search";
import FilterContext from "./FilterContext";
import Filters from "./Filters";
import { FiCalendar } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaBed, FaCoffee, FaLock, FaShieldAlt, FaShower, FaUsb, FaWifi } from "react-icons/fa";

const Home = () => {
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    // [cafe,freeWifi,privateRooms,security,lockers,commonBathrooms,usbPorts]
    const [filterNames, setFilterNames] = useState([]);
    const [selectedFiltersStates,setSelectedFiltersStates] = useState([false,false,false,false,false,false,false]);
    const [cafeSelected, setCafeSelected] = useState(false);
   
    const [hostels, setHostels] = useState([]); // Initial state to empty array

    const getHostels = useCallback(() =>{
       
            const url = "http://localhost:3000/hostels"; /* URL to API  */
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setHostels(data);
                    
                })
                .catch((err) => {
                    console.error(err);
                });
    }, []);
    const handleFilterSelected=(position) =>{
        //update filters to its opposite
        let updatedStates = [...selectedFiltersStates];
        updatedStates[position] = !updatedStates[position];
       
        //i might need to check for useEffect if it works.
        if (updatedStates[position]) {
            addaFilter(filterNames[position]);
            setSelectedFiltersStates(updatedStates);
        } else {
            removeaFilter(filterNames[position]);
            setSelectedFiltersStates(updatedStates);
        }
        
    }
    useEffect(() => {
        //might be used for issues on sync
        getHostels();
        //these filters should be retrived from the returned api instead
        let filters = ["cafe","freeWifi","privateRooms","security","lockers","commonBathrooms","usbPorts"];
        setFilterNames(filters);
    }, [selectedFilters, cafeSelected,getHostels, setFilterNames]);
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
    const addaFilter =(selectedFilter) =>{
        let newState = [...selectedFilters, selectedFilter];
        setSelectedFilters(newState);
        console.log("adding",selectedFilter);
    }
    const removeaFilter = (selectedFilter) => {
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
                    {/* [cafe,freeWifi,privateRooms,security,lockers,commonBathrooms,usbPorts]*/}
                    <FaCoffee/><label>Cafe</label>
                    <input id="filter_cafe" type="checkbox" name="cafe"
                        onChange={(evt) => {
                            //setCafeSelected(!cafeSelected);
                            //handleFilterSelected(0);
                            setCafeSelected((prevCafeSelected) => !prevCafeSelected);
                            if (!cafeSelected) {
                                handleClick(evt, evt.target.name);
                            } else {
                                removeFilter(evt, evt.target.name);
                            }
                        }} />
                    <FaWifi/><label>freeWifi</label>
                    <input id="filter_freeWIFI" type="checkbox" name="freeWifi"
                    onChange={(evt)=>{
                           handleFilterSelected(1);
                    }}
                    />
                    <FaBed/><label>privateRooms</label>
                    <input id="filter_privateRooms" type="checkbox" name="privateRooms"
                    onChange={(evt)=>{
                           handleFilterSelected(2);
                    }}
                    />
                    <FaShieldAlt/><label>Security</label>
                    <input id="filter_security" type="checkbox" name="security"
                    onChange={(evt)=>{
                           handleFilterSelected(3);
                    }}
                    />
                    <FaLock/><label>Lockers</label>
                    <input id="filter_lockers" type="checkbox" name="lockers"
                    onChange={(evt)=>{
                           handleFilterSelected(4);
                    }}
                    />
                    <FaShower/><label>Common Bathrooms</label>
                    <input id="filter_commonBathrooms" type="checkbox" name="commonBathrooms"
                    onChange={(evt)=>{
                           handleFilterSelected(5);
                    }}
                    />
                    <FaUsb/><label>USB ports</label>
                    <input id="filter_usbPorts" type="checkbox" name="usbPorts"
                    onChange={(evt)=>{
                           handleFilterSelected(6);
                    }}
                    />
                    <p className={cafeSelected ? "selected" : "not_selected"}>{cafeSelected ? "filters applied" : "filters removed"}</p>
                    <br>
                    </br>
                    <div className="date-picker-container">
                        <div className="date-picker">
                            <FiCalendar className="calendar-icon" />
                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                        </div>
                       
                    </div>

                </Filters>
            </AppSection>
            <AppSection>
                <FilterContext.Provider value={[selectedFilters, setSelectedFilters]}>
                    <Search details={hostels} /> 
                </FilterContext.Provider>
            </AppSection>
         
        </div>
    )
}

export default Home;