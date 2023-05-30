import { useEffect, useState } from "react";

export const Actions = {
    LEFT: "left",
    RIGHT: "right",
    UP: "up",
    DOWN: "down"
}

const makeInitActionMap = () => {
    return {
        [Actions.LEFT]: "a",
        [Actions.RIGHT]: "d",
        [Actions.UP]: "w",
        [Actions.DOWN]: "s",
    }
}

export const useAction = () => {
    const [actionsPressed, setActionsPressed] = useState({});
    const [actionsJustReleased, setActionsJustReleased] = useState({});
    const [actionsJustPressed, setActionsJustPressed] = useState({});

    const [actionMap, setActionMap] = useState({
        ...makeInitActionMap(),
    });

    useEffect(() => {
        addEventListener("keydown", (e) => {
            let newActionsPressed = {};
            let newActionsJustPressed = {};

            for (const key in actionMap) {
                if (e.key === actionMap[key]) {
                    newActionsPressed[key] = true;
                    newActionsJustPressed[key] = true;
                    setActionsPressed({...actionsPressed, ...newActionsPressed});
                    setActionsJustPressed({...actionsJustPressed, ...newActionsJustPressed});
                    return;
                }
            }
        });

        addEventListener("keyup", (e) => {
            let newActionsPressed = {};
            let newActionsJustReleased = {};

            for (const key in actionMap) {
                if (e.key === actionMap[key]) {
                    newActionsPressed[key] = false;
                    newActionsJustReleased[key] = true;
                    setActionsPressed({...actionsPressed, ...newActionsPressed});
                    setActionsJustReleased({...actionsJustReleased, ...newActionsJustReleased});
                    return;
                }
            }
        });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setActionsJustPressed({});
            setActionsJustReleased({});
        }, 1000 / 60);

        return () => clearInterval(interval);
    }, [])

    const isActionPressed = (action) => {
        return actionsPressed[action];
    }
    const isActionJustPressed = (action) => {
        return actionsJustPressed[action];
    }
    const isActionJustReleased = (action) => {
        return actionsJustReleased[action];
    }

    return {isActionPressed, isActionJustPressed, isActionJustReleased};
}
