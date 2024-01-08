import React from "react";
import { LuCoffee } from "react-icons/lu"

const Star = (props) =>{
    return (
        <LuCoffee
            color={props.selected ? "yellow" : "grey"}
        />
    )
}