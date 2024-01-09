import React, { useContext, useEffect, useState } from "react";
import SelectedHostelsContext from "./SelectedHostelsContext";
import { FaMinus, FaPlus } from "react-icons/fa";
export default function InitialItinerary() {
    const [selectedHostels, setSelectedHostels] = useContext(SelectedHostelsContext);
    const [itineraryNights, setItineraryNights] = useState([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedNights, setSelectedNights] = useState(1);
    const [itineraryTotal, setItineraryTotal] = useState(0);
    const counter = 1;
    const removeAnHostel = (e, item) => {
        console.log("removing ", item);
        let updatedHostels = selectedHostels.filter((element) => {
            return element !== item; //return all other elements
        })
        setSelectedHostels(updatedHostels)
    }
    const handleAddNight = () => {
        // create a new array based on the current state
        const updatedNights = [...itineraryNights];
        // Increment the nights at the selected index (the active hostel)
        updatedNights[selectedIndex] = (updatedNights[selectedIndex] || 0) + 1;

        // Update state with the new array
        setItineraryNights(updatedNights);
    };
    const handleDecreaseNight = () => {
        const updatedNights = [...itineraryNights];
        // Decrease the nights at the selected index (the active hostel)
        updatedNights[selectedIndex] = (updatedNights[selectedIndex] || 0) - 1;

        // Update state
        setItineraryNights(updatedNights);
    }
    const [name, setName] = useState('');
    const [isNameValid, setIsNameValid] = useState(false);

    // a Function to update the name and check its validity
    const handleNameChange = (event) => {
        const newName = event.target.value;
        setName(newName);
        setIsNameValid(/^[A-Za-z]+$/.test(newName));
    };

    // a Function to handle the form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        if (isNameValid) {
            // Submit the form or perform other actions here
            console.log(`Creating itinerary for user: ${name}`);
        } else {
            alert('Please enter a valid name with only letters.');
        }
    };

    //handle each refresh
    useEffect(() => {
        //set number of total nights hostels
        const sumUntilIndex = itineraryNights
            .slice(0, selectedHostels.length) // Create a subarray from index 0 to selectedIndex
            .reduce((acc, nights) => acc + nights, 0); // Calculate the sum of the subarray
        setSelectedNights(sumUntilIndex);

        let totalSpent = 0;

        selectedHostels.forEach((selectedHostel, index) => {
            totalSpent += selectedHostel.prices[0] * itineraryNights[index];
        });
        setItineraryTotal(totalSpent);

    }, [itineraryNights, selectedHostels]);
    return (
        <div className="initial_itinerary_summary">
            <h2> Your itinerary</h2>
            <ul>
                {selectedHostels.map((item, index) => (
                    <li key={index}
                        onDoubleClick={(e) => {
                            removeAnHostel(e, item)
                        }}
                        className={selectedIndex === index ? "active_li" : ""}
                        onClick={(e) => {
                            setSelectedIndex(index);
                            console.log("the index is ", index);
                        }}>
                        <span className="cool_number_style">{counter + index}</span>: {item.name} {itineraryNights[index]} {itineraryNights[index] === 1 ? "Night" : "Nights"} <span>&pound;</span> {item.prices[0] * itineraryNights[index]}
                    </li>
                ))}
            </ul>
            {selectedHostels.length === 0 ? "" : (
                <div className="itinerary_controls">
                    <hr></hr>
                    <FaPlus title="Add" className="control_plus"
                        onClick={() => {
                            handleAddNight();
                            setSelectedNights(selectedNights + 1);
                        }
                        } />
                    <span> N.of Days </span>
                    <FaMinus title="Lower" className="control_minus"
                        onClick={() => {
                            if (selectedNights > 1) {
                                handleDecreaseNight();
                                setSelectedNights(selectedNights - 1);
                            }
                        }} />
                    <br></br>
                    <span className="itinerary_total">| <span>&pound;</span>{itineraryTotal} in total for {selectedNights} {selectedNights === 1 ? "Night" : "Nights"} |</span>
                    <hr></hr>
                    <b>Create Itinerary</b>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={handleNameChange}
                            pattern="[A-Za-z]+"
                            title="Only letters are allowed"
                            required
                        />
                        <button type="submit" disabled={!isNameValid}>
                            Create Itinerary
                        </button>
                    </form>
                </div>
            )

            }



        </div>
    );
}