import React from 'react';

export default function PlantsComponent(props) {
    if (props.plants.length === 0) return null
    else {
        return ( // 'map' returns an array of HTML list elements, and <ul> expands the array.
            <div>
                <ul className="flexList">                      
                    {props.plants.map((curr) => {
                        return (
                            <li key={curr._id} style={{listStyleType: "none" }} className="flexPlant">
                                <a href="/"><img src={curr.imageUrl} alt={curr.name} /></a>
                                <h2>{curr.name}</h2>
                                <p>{curr.description}</p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}