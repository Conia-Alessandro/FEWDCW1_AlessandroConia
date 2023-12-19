import { Icon } from "leaflet";
import React, { useState } from "react";
/* Function that calls API */

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
const icon = new Icon({
    iconUrl: "../assets/hostel.png",
    iconSize: [30, 30]
})
const Map = ({items}) => {
    const initialHostel = [57.543799, -5.504566]
    const position = [0, 0]; /* change to starting position */
    const [activeHostel, setActiveHostel] = useState(initialHostel);
    const markerClicked = (position) => {
        setActiveHostel(position);
    }
        return (
            <>
                <MapContainer center={position} zoom={9} scrollWheelZoom={true} className="map">
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
                            icon={icon}
                            eventHandlers={{
                                click: () => {
                                    markerClicked([hostel.location.lat, hostel.location.long])
                                }
                            }}
                        >
                            <Popup>
                                <div className="popup" role="alert">
                                    this is {hostel.name}
                                </div>
                            </Popup>
                        </Marker>
                    ))}



                </MapContainer>
                <div className="activeHostel_info">the Hostel you have selected is {activeHostel}</div>
            </>
        )
}
export default Map;