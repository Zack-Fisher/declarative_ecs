'use client';

import React, { useEffect } from "react"

import PubSub from "pubsub-js";

export const UPDATE = "UPDATE";

const Tick = ({fps}) => {
    useEffect(() => {
        const interval = setInterval(() => {
            PubSub.publish(UPDATE);
        }, 1000 / fps);
        return () => clearInterval(interval);
    }, [fps]);
    return null;
}

export default Tick;
