/* eslint-disable react/display-name */

import Entity from "@/components/entity";

export const make_entity = (component) => (props) => {
    return (() => {
        return (
            <Entity {...props}>
                {component()}
            </Entity>
        )
    });
}
