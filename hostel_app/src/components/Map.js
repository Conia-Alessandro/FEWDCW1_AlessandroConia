import L from "leaflet";
import React, { useState } from "react";
/* Function that calls API */

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import SelectedHostelsContext from "./SelectedHostelsContext";
import InitialItinerary from "./InitialItinerary";
import StarRating from "./StarRating";
/*
delete L.Icon.Default.prototype.getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})
*/
/* creating custom icon */
const svgString = `<svg fill="#000000" width="100px" height="100px" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<path d="M25 1.9375L2 10.199219L2 48L48 48L48 10.199219 Z M 25 4.0625L46 11.605469L46 13.480469L25 5.9375L4 13.480469L4 11.605469 Z M 4 16L6 16L6 18L4 18 Z M 44 16L46 16L46 18L44 18 Z M 10 19L12 19L12 27L14.78125 27C14.300781 26.46875 14 25.773438 14 25C14 23.34375 15.34375 22 17 22C18.65625 22 20 23.34375 20 25C20 25.773438 19.699219 26.46875 19.21875 27L22 27L22 22L31 22C33.761719 22 36 24.238281 36 27L38 27L38 19L40 19L40 46L38 46L38 44L12 44L12 46L10 46 Z M 4 20L6 20L6 22L4 22 Z M 44 20L46 20L46 22L44 22 Z M 4 24L6 24L6 26L4 26 Z M 44 24L46 24L46 26L44 26 Z M 4 28L6 28L6 30L4 30 Z M 44 28L46 28L46 30L44 30 Z M 12 29L12 42L14.78125 42C14.300781 41.46875 14 40.773438 14 40C14 38.34375 15.34375 37 17 37C18.65625 37 20 38.34375 20 40C20 40.773438 19.699219 41.46875 19.21875 42L22 42L22 37L31 37C33.761719 37 36 39.238281 36 42L38 42L38 29 Z M 4 32L6 32L6 34L4 34 Z M 44 32L46 32L46 34L44 34 Z M 4 36L6 36L6 38L4 38 Z M 44 36L46 36L46 38L44 38 Z M 4 40L6 40L6 42L4 42 Z M 44 40L46 40L46 42L44 42 Z M 4 44L6 44L6 46L4 46 Z M 44 44L46 44L46 46L44 46Z"/>
</svg>`;
const svgStringActive = `<svg fill="#0000FF" width="140px" height="140px" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<path d="M25 1.9375L2 10.199219L2 48L48 48L48 10.199219 Z M 25 4.0625L46 11.605469L46 13.480469L25 5.9375L4 13.480469L4 11.605469 Z M 4 16L6 16L6 18L4 18 Z M 44 16L46 16L46 18L44 18 Z M 10 19L12 19L12 27L14.78125 27C14.300781 26.46875 14 25.773438 14 25C14 23.34375 15.34375 22 17 22C18.65625 22 20 23.34375 20 25C20 25.773438 19.699219 26.46875 19.21875 27L22 27L22 22L31 22C33.761719 22 36 24.238281 36 27L38 27L38 19L40 19L40 46L38 46L38 44L12 44L12 46L10 46 Z M 4 20L6 20L6 22L4 22 Z M 44 20L46 20L46 22L44 22 Z M 4 24L6 24L6 26L4 26 Z M 44 24L46 24L46 26L44 26 Z M 4 28L6 28L6 30L4 30 Z M 44 28L46 28L46 30L44 30 Z M 12 29L12 42L14.78125 42C14.300781 41.46875 14 40.773438 14 40C14 38.34375 15.34375 37 17 37C18.65625 37 20 38.34375 20 40C20 40.773438 19.699219 41.46875 19.21875 42L22 42L22 37L31 37C33.761719 37 36 39.238281 36 42L38 42L38 29 Z M 4 32L6 32L6 34L4 34 Z M 44 32L46 32L46 34L44 34 Z M 4 36L6 36L6 38L4 38 Z M 44 36L46 36L46 38L44 38 Z M 4 40L6 40L6 42L4 42 Z M 44 40L46 40L46 42L44 42 Z M 4 44L6 44L6 46L4 46 Z M 44 44L46 44L46 46L44 46Z"/>
</svg>`
const svgDataUrl = `data:image/svg+xml;base64,${btoa(svgString)}`;

const svgDataUrl_Active = `data:image/svg+xml;base64,${btoa(svgStringActive)}`;
const icon = new L.Icon({
    iconUrl: svgDataUrl,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
});
const active_icon = new L.Icon({
    iconUrl: svgDataUrl_Active,
    iconSize: [40,40],
    iconAnchor: [20,40],
})

const Map = ({ items, hostelId }) => {
    const selectedHostel = items.find((entry) => { return entry.id === hostelId });/* return if entry id === hostel id inputted */
    const position = [selectedHostel.location.lat, selectedHostel.location.long];
    /*const position = [57.543799, -5.504566];  forced change to starting position, for debugging only */
    const [activeHostel, setActiveHostel] = useState(position);
    const [activeHostelRating, setActiveHostelRating] = useState(0);
    const [selectedHostels, setSelectedHostels] = useState([]);
    const [selectedReviewText, setSelectedReviewText] = useState("No reviews")
    const [selectedReviewNumber, setSelectedReviewNumber] = useState(0);
    const markerClicked = (position) => {
        setActiveHostel(position);
        console.log("position we are at now ", activeHostel);
    }
    const handleClick = (evt, hostel) => {
        console.log("current hostel that you've clicked to add is ",hostel);
        let updatedSelectedList = [...selectedHostels, hostel];
        setSelectedHostels(updatedSelectedList);
        console.log("currently, you've added : ", selectedHostels);
    }
    const calculateAverage = (hostel) => {
        let average;
        let noOfRatings = hostel.ratings.length;
        if (hostel.ratings !== undefined && noOfRatings > 0) {
            console.log("Number of ratings: " , noOfRatings);
            let totalSum = hostel.ratings.reduce((sum, rating) => sum + rating, 0);
            average = (totalSum / noOfRatings).toFixed(1);
        } else {
            average = 0;
        }
        setSelectedReviewNumber(noOfRatings);
        setActiveHostelRating(average);
        switch (true) {
            case average >= 4.5:
                setSelectedReviewText("Excellent");
                break;
            case average >= 4:
                setSelectedReviewText("Great")
                break;
            case average >= 3.5:
                setSelectedReviewText("Good")
                break;
            case average >= 3:
                setSelectedReviewText("Ok")
                break;
            case average >= 2:
                setSelectedReviewText("Not recommended")
                break;
            default:
                setSelectedReviewText("No Ratings")
        }

    }
    const setRatingClass = (rating) => {
        switch (true) {
            case rating >= 4.5:
                return "rating-excellent";
            case rating >= 4:
                return "rating-great";
            case rating >= 3.5:
                return "rating-good";
            case rating >= 3:
                return "rating-ok";
            case rating >= 2:
                return "rating-bad";
            case rating === 0:
                return "rating-not-existing";
            default:
                return "rating-not-recommended";
        }
    }
    return (
        <div className="centered_map">
            <MapContainer center={activeHostel} zoom={9} scrollWheelZoom={true} className="map">
                <TileLayer attribution='&copy;<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {items.map((hostel) => (
                    <Marker
                        key={hostel.id}
                        position={[
                            hostel.location.lat,
                            hostel.location.long
                        ]}
                        icon={ activeHostel[0] === hostel.location.lat && activeHostel[1] === hostel.location.long ? active_icon : icon}
                        title={`This hostel is located at ${hostel.location.lat}, ${hostel.location.long}`}
                        eventHandlers={{
                            click: () => {
                                markerClicked([hostel.location.lat, hostel.location.long]) /* the map expects a [lat, long] object */
                                calculateAverage(hostel);
                            }
                        }}

                    >
                        <Popup>
                            <div className="popup" role="alert">
                                <StarRating totalStars = {5} stars ={activeHostelRating}/>
                                <span className={setRatingClass(activeHostelRating)}>{activeHostelRating} {selectedReviewText}({selectedReviewNumber})</span><b>{hostel.name}</b>
                                <input type="button" value={"Add to Itinerary"}
                                    className="popup_button"

                                    onClick={(evt) => {
                                        handleClick(evt, hostel);
                                    }} />
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
            
            <SelectedHostelsContext.Provider value={[selectedHostels, setSelectedHostels]}>
                <InitialItinerary/>
            </SelectedHostelsContext.Provider>
        </div>
    )
}
export default Map;