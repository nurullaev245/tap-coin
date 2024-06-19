import React, { useEffect, useState } from 'react';
import DividerCustom from '../components/DividerCustom';
import CountAnimation from '../components/CountAnimation';
import BubblingEffect from '../components/BubblingEffect'; // Import the BubblingEffect component

const TapCoin = () => {
    const [coin, setCoin] = useState(() => {
        const storedCoin = localStorage.getItem('coin');
        return storedCoin ? parseInt(storedCoin, 10) : 0;
    });
    const [point, setPoint] = useState(() => {
        const storedPoint = localStorage.getItem('point');
        return storedPoint ? parseInt(storedPoint, 10) : 1;
    });
    const [energy, setEnergy] = useState(() => {
        const storedEnergy = localStorage.getItem('energy');
        return storedEnergy ? parseInt(storedEnergy, 10) : 1500;
    });
    const [limit, setLimit] = useState(() => {
        const storedLimit = localStorage.getItem('limit');
        return storedLimit ? parseInt(storedLimit, 10) : 1500;
    });
    const [bubbles, setBubbles] = useState([]);
    const [level, setLevel] = useState(() => {
        const storedLevel = localStorage.getItem('level');
        return storedLevel ? parseInt(storedLevel, 10) : 1;
    });
    const [exp, setExp] = useState(() => {
        const storedExp = localStorage.getItem('exp');
        return storedExp ? parseInt(storedExp, 10) : 0;
    });

    // Save state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('coin', coin.toString());
    }, [coin]);

    useEffect(() => {
        localStorage.setItem('point', point.toString());
    }, [point]);

    useEffect(() => {
        localStorage.setItem('energy', energy.toString());
    }, [energy]);

    useEffect(() => {
        localStorage.setItem('limit', limit.toString());
    }, [limit]);

    useEffect(() => {
        localStorage.setItem('level', level.toString()); 
    }, [level]);

    useEffect(() => {
        localStorage.setItem('exp', exp.toString());
    }, [exp]);

    const [maxProgress, setMaxProgress] = useState(() => {
        const storedMaxProgress = localStorage.getItem("maxProgress");
        return storedMaxProgress ? parseInt(storedMaxProgress, 10) : 10000;
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setEnergy(prev => {
                if (prev < limit) {
                    return prev + 1;
                } else {
                    return prev;
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [limit]);

    useEffect(() => {
        if (energy < limit) {
            const interval = setInterval(() => {
                setEnergy(prev => Math.min(prev + 1, limit));
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [energy, limit]);

    const handleClick = (event) => {
        if (energy > 0) {
            setEnergy(prev => prev - 1);
            const newCoin = level * point; // Calculate newCoin based on level and point
            setCoin(prevCoin => prevCoin + newCoin); // Update coin state with newCoin

            const newBubble = {
                id: Date.now(),
                x: event.clientX - 25, // Adjust x position
                y: event.clientY - 25, // Adjust y position
                point: point * level // Multiply point by level for the bubble
            };
            setBubbles(prev => [...prev, newBubble]);
            setTimeout(() => {
                setBubbles(prev => prev.filter(bubble => bubble.id !== newBubble.id));
            }, 1000); // Remove the bubble after 1 second
        }
    };

    useEffect(() => {
        if (level === 1 && exp === 10000) {
            alert("new level");
            setLevel(prev => prev + 1);
            setMaxProgress((prev) => prev * 5);
            setExp(0);
        }
    }, [level, exp]);

    return (
        <>
            <DividerCustom text={"TapCoin"} />
            <div className='container mx-auto max-w-[80%] flex flex-col justify-between h-[90vh] relative'>
                <div className="tepa flex justify-between">
                    <div className="bg-transparent text-mono border-2 flex px-5 rounded-box py-2 text-sm text-bold text-warning border-warning min-w-[340px] text-right shadow shadow-warning items-center justify-end gap-4">
                        <CountAnimation limit={coin} />
                        <span>
                            <img src="./coin.png" className='size-8' alt="" />
                        </span>
                    </div>

                    <div className="bg-transparent text-mono border-2 flex px-5 rounded-box py-2 text-sm text-bold text-warning border-warning min-w-[340px] text-right shadow shadow-warning items-center justify-between gap-4">
                        <span>
                            LV:
                        </span>
                        <CountAnimation limit={level} />
                    </div>
                </div>

                {/* Long progress bar for coins */}
                <div className="w-full mt-4">
                    <progress className="progress progress-primary w-full" value={coin} max={maxProgress}></progress>
                </div>

                <div className="ortasi flex justify-center items-center mt-20">
                    <button onClick={handleClick} className='active:scale-95 transition-all'>
                        <img src="./coin.png" alt="" />
                    </button>
                </div>
                <div className="pasi">
                    <div>
                        <p className='flex gap-2'>
                            <span className='text-accent'>{energy}</span>
                            /
                            <span className='text-primary'>{limit}</span>
                        </p>
                    </div>
                </div>
                {bubbles.map(bubble => (
                    <BubblingEffect
                        key={bubble.id}
                        x={bubble.x}
                        y={bubble.y}
                        point={bubble.point}
                    />
                ))}
            </div>
        </>
    );
}

export default TapCoin;
