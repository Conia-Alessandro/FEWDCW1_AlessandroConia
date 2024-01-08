import React, {useState} from "react";
import AStar from "./AStar";
const StarRating = ({totalStars ,stars}) => {
    console.log("total stars, ",totalStars, "n of stars", stars);
    const floating = stars % 1;
    const [selectedStars, setSelectedStars] = useState(
        floating > 0.5 ? Math.ceil(stars) : Math.floor(stars)
    );
    const createArray = length => [...Array(length)];

    console.log("Selected stars, ",selectedStars);
    return (
        <div>
            {createArray(totalStars).map((n,i) =>(
                 <AStar key ={i}
                 selected={selectedStars > i}
                 />
            ))}
        </div>
    )
}
export default StarRating;