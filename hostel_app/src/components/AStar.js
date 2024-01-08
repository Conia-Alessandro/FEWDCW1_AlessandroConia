import React from "react";
import { FaStar } from "react-icons/fa";

const AStar = (props) =>{
    return (
        <FaStar
            color={props.selected ? "yellow" : "grey"}
        />
    )
}
export default AStar;
