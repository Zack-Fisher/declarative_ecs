export { make_position, make_size, make_shake, make_controller, make_image };

const make_position = (x, y) => {
    return {
        x,
        y,
    };
}

const make_size = (w, h) => {
    return {
        w,
        h,
    };
}

const make_shake = (magnitude) => {
    return {
        magnitude,
    };
}

const make_controller = (speed) => {
    return {
        speed,
    };
}

const make_image = (src) => {
    return {
        src,
    };
}
