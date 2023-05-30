'use client';

import "../public/globals.css"
import React from 'react';
import Scene from '@/components/scene';
import Entity from '@/components/entity';
import { ImageEntity } from '@/components/image_display';
import Tick from "@/components/tick";
import { make_controller, make_image, make_position, make_shake, make_size } from "@/data/basic_components";
import PlayerEntity from "@/components/player_entity";
import MovementPlugin from "@/components/plugins/movement_plugin";

const Home = () => {
    return (
        <>
            <Tick fps={60} />
            <Scene>
                <MovementPlugin />
                <p>hello</p>
                <PlayerEntity />
            </Scene>
        </>
    )
}

export default Home;
