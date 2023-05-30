'use client';

import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { useScene } from "./scene";
import { v4 as uuidv4 } from 'uuid';
import { UPDATE } from "./tick";

const EntityContext = React.createContext();

export const useEntity = () => useContext(EntityContext);

// This is your Entity component
// pass the rest of the props in as data
const Entity = ({ children, ...other_props }) => {
    const [id] = useState(uuidv4());
    // the initial state is passed through in the props.
    const [data, setData] = useState(other_props);
    const { addEntity, removeEntity, getEntity } = useScene();

    // When the Entity mounts, we add it to the context
    useEffect(() => {
        addEntity(id, other_props);

        return () => {
            // When the Entity unmounts, we remove it from the context
            removeEntity(id);
        };
    }, [id]);

    useEffect(() => {
        const token = PubSub.subscribe(UPDATE, () => {
            const new_data = getEntity(id);
            setData(new_data);
        });

        return () => PubSub.unsubscribe(token);
    }, [getEntity, id]);

    // just pass everything down to the children for the actual rendering.
    // the entity store updates data, and the children will re-render.
    return (
        <EntityContext.Provider value={{ data }}>
            {children}
        </EntityContext.Provider>
    );
}

export default Entity;
