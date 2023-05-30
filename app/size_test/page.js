import React from 'react';
import Scene from '@/components/scene';
import Entity from '@/components/entity';

const SizeTest = () => {
    const entities = Array(1000).fill(0).map((_, i) => (
        <div key={i}>
            <p>hlekljd</p>
            <Entity position={{ x: i % 100, y: Math.floor(i / 100) }} />
        </div>
    ));

    return (
        <Scene>
            {/* render 10000 entities on the screen with position */}
            {entities}
        </Scene>
    )
}

export default SizeTest;