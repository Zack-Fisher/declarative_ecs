import React, { useEffect } from 'react';
import Image from 'next/image'
import Entity, { useEntity } from './entity';

export const ImageEntity = ({image, position, size, ...otherProps}) => {
    // we should also be able to pass entity params on top of the ones that already exist.
    return (
        <Entity 
            image={image}
            position={position}
            size={size} 
            {...otherProps}
        >
            <ImageDisplay />
        </Entity>
    )
}

const ImageDisplay = () => {
    const {data} = useEntity();

    return (
        <ImageDisplayCore
            image={data.image}
            position={data.position}
            size={data.size}
        />
    )
}

export const ImageDisplayCore = ({image, position, size}) => {
    return (
        <div style={{
            position: "absolute",
            left: position.x,
            top: position.y,
        }}>
            <Image src={image.src} width={size.w} height={size.h} alt={"hello"} />
        </div>
    )
}
