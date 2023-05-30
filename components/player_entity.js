import React from "react"
import Entity from "./entity"
import { ImageDisplayCore, ImageEntity } from "./image_display"
import { make_controller, make_image, make_position, make_shake, make_size } from "@/data/basic_components"

const PlayerEntity = () => {
    return (
        <ImageEntity 
            image={make_image("/images/character.png")}
            position={make_position(0, 0)}
            size={make_size(100, 100)}
            controller={make_controller(7)}
            shake={make_shake(1)}
        />
    )
}

export default PlayerEntity;
