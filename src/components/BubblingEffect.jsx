import React from 'react';
import { motion } from 'framer-motion';

const BubblingEffect = ({ x, y, point }) => {
    return (
        <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 0, y: -150 }}
            transition={{ duration: 1 }}
            className='text-primary text-4xl'
            style={{
                position: 'absolute',
                left: x,
                top: y,
                pointerEvents: 'none',
                fontWeight: 'bold',
                zIndex: 9999, // Ensure the bubble is on top of other elements
            }}
        >
            +{point}
        </motion.div>
    );
};

export default BubblingEffect;
