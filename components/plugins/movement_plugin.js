import { useCallback, useEffect } from "react";
import { useScene } from "../scene";
import { Actions, useAction } from "@/hooks/use_action";
import { pipe } from "@/util/functional";

// a bunch of systems related to movement.
// we fuse all the systems into one using pipe, then register it into the scene.
// making plugins components will provide an easy view of what systems are running.
const MovementPlugin = () => {
    const { queryComponent, andQuery, updateEntity, addSystem, removeSystem } = useScene();

    const { isActionPressed } = useAction();

    // const positionSystem = useCallback((_entities) => {
    //     const result = queryComponent(_entities, 'position');
    //     for (const [id, data] of result) {
    //         _entities[id] = {
    //             ..._entities[id],
    //             position: {
    //                 x: data.position.x + 1,
    //                 y: data.position.y + 1,
    //             }
    //         };
    //     }
    //     return _entities;
    // }, [queryComponent]);

    const controllerSystem = useCallback((_entities) => {
        andQuery(_entities, ['position', 'controller']).forEach(([id, data]) => {
            const input = { x: 0, y: 0 };

            if (isActionPressed(Actions.LEFT)) {
                input.x -= 1;
            }
            if (isActionPressed(Actions.RIGHT)) {
                input.x += 1;
            }
            if (isActionPressed(Actions.UP)) {
                input.y -= 1;
            }
            if (isActionPressed(Actions.DOWN)) {
                input.y += 1;
            }

            _entities[id] = {
                ..._entities[id],
                position: {
                    x: data.position.x + input.x * data.controller.speed,
                    y: data.position.y + input.y * data.controller.speed,
                },
            };
        });

        return _entities;
    }, [andQuery]);

    const shakeSystem = useCallback((_entities) => {
        andQuery(_entities, ['position', 'shake']).forEach(([id, data]) => {
            _entities[id] = {
                ..._entities[id],
                position: {
                    x: data.position.x + (Math.random() - 0.5) * data.shake.magnitude,
                    y: data.position.y + (Math.random() - 0.5) * data.shake.magnitude,
                }
            }
        });

        return _entities;
    }, [andQuery]);


    useEffect(() => {
        const plugin = pipe(
            // positionSystem,
            controllerSystem,
            shakeSystem,
        );

        addSystem(plugin);

        return () => {
            removeSystem(plugin);
        }
    }, [addSystem, removeSystem, controllerSystem, shakeSystem]);

    return null;
}

export default MovementPlugin;
