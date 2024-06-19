import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

const CountAnimation = ({ limit }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);

    useEffect(() => {
        const animation = animate(count, limit, {
            duration: 0.2
        });
        return animation.stop;
    }, [limit, count]);

    return (
        <div>{rounded.get()}</div>
    );
}

export default CountAnimation;
