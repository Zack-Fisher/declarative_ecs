'use client';

import React, { useCallback, useEffect, useState } from "react";
import { UPDATE } from "./tick";
import { Actions, useAction } from "@/hooks/use_action";

const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

// First, create a context for the entities
const SceneContext = React.createContext();

// This is your Scene component
const Scene = ({ children }) => {
    // We'll keep the entities in the component state
    const [entities, setEntities] = useState({});
    // list of function pointers, (_entities) => _entities
    // piping through new entity state, and the Scene automatically batches the updates until the end of the frame.
    const [systems, setSystems] = useState([]);

    // We define the addEntity and removeEntity functions
    const addEntity = useCallback((id, data) => {
        console.log("adding entity ", id)
        setEntities((entities) => ({
            ...entities,
            // [id] - use the value of the variable in the keyname.
            [id]: data
        }));
    }, [setEntities]);

    const getEntity = useCallback((id) => {
        return entities[id];
    }, [entities]);

    const removeEntity = useCallback((id) => {
        console.log("removing entity ", id)
        setEntities((entities) => {
            const { [id]: removed, ...rest } = entities;
            return rest;
        });
    }, [setEntities]);

    // update the actual entities using setEntities directly.
    const immediateUpdateEntity = useCallback((id, data) => {
        setEntities((entities) => ({
            ...entities,
            [id]: {
                ...entities[id],
                ...data
            }
        }));
    }, [setEntities]);

    // update a local object, then something else uses this to update.
    const updateEntity = useCallback((_entities, id, data) => {
        _entities[id] = {
            ..._entities[id],
            ...data
        };

        return _entities;
    }, []);

    // query on local copies of the entity list.
    const queryComponent = useCallback((_entities, component) => {
        return Object.entries(_entities).filter(([id, data]) => {
            return data[component];
        });
    }, []);

    const orQuery = useCallback((_entities, components) => {
        return Object.entries(_entities).filter(([id, data]) => {
            return components.some((component) => {
                return data[component];
            });
        });
    }, []);

    const andQuery = useCallback((_entities, components) => {
        return Object.entries(_entities).filter(([id, data]) => {
            return components.every((component) => {
                return data[component];
            });
        });
    }, []);

    const enterQuery = useCallback((_entities, components) => {
        return Object.entries(_entities).filter(([id, data]) => {
            return components.every((component) => {
                if (!data[component]["entered"]) {
                    data[component]["entered"] = true;
                    return data[component];
                }
            });
        });
    }, []);

    const addSystem = useCallback((system) => {
        setSystems((systems) => [...systems, system]);
    }, [setSystems]);

    // not sure how well indexOf system will work lol
    const removeSystem = useCallback((system) => {
        setSystems((systems) => {
            const index = systems.indexOf(system);
            if (index > -1) {
                systems.splice(index, 1);
            }
            return systems;
        });
    }, [setSystems]);

    const system = useCallback(() => {
        // need to pipe the current state of the world directly through the systems, we can't wait for an update after each system.
        let _entities = { ...entities };

        // pipe through all the registered systems and plugins.
        _entities = pipe(...systems)(_entities);

        // _entities = positionSystem(_entities);
        setEntities(_entities);
    }, [systems, entities]);

    useEffect(() => {
        const token = PubSub.subscribe(UPDATE, system);

        return () => {
            PubSub.unsubscribe(token);
        }
    }, [system]);

    // We pass the entities and the functions down via context
    return (
        <SceneContext.Provider value={{ 
            entities, 

            addEntity, removeEntity, updateEntity, getEntity, immediateUpdateEntity,

            addSystem, removeSystem, queryComponent, orQuery, andQuery, enterQuery
         }}>
            {children}
        </SceneContext.Provider>
    );
}

export const useScene = () => React.useContext(SceneContext);

export default Scene;
