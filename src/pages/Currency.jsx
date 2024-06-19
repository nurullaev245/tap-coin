import React, { useEffect, useState } from 'react';

const Currency = () => {
    const url = 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/symbols';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '0217d5091cmsh7170cad16fad984p1a9523jsn522b08448fb8',
            'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
        }
    };

    const [symbols, setSymbols] = useState({});
    const [value1, setValue1] = useState("Choise currency");
    const [value2, setValue2] = useState("Choise currency");
    const [amount, setAmount] = useState("");
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [time, settime] = useState("")
    const [res, setRes] = useState([])

    const requestConvert = async () => {
        const fromCurrency = value1.split(' - ')[0];
        const toCurrency = value2.split(' - ')[0];

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '0217d5091cmsh7170cad16fad984p1a9523jsn522b08448fb8',
                'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
            }
        };
        try {
            let request = await fetch(`https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`, options);
            let response = await request.json();
            console.log(response);
            setConvertedAmount(response.result);
            settime(response.date);
            setRes(response)
        } catch (error) {
            console.log("Error:", error);
        }

        console.log(res)
    };

    console.log(time)

    useEffect(() => {
        const requestSymbols = async () => {
            try {
                let request = await fetch(url, options);
                let response = await request.json();
                setSymbols(response.symbols);
                console.log(response.symbols);
            } catch (error) {
                console.log("Error:", error);
            }
        };
        requestSymbols();
    }, []);

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleCurrencySelection = (setCurrencyValue, currencyKey) => {
        setCurrencyValue(currencyKey);
    };

    return (
        <div className='max-w-[80%] mx-auto'>
            <div className="divider divider-primary">Currency Converter</div>
            <div className="glass bg-primary py-10 px-5 rounded-lg mt-20">
                <div className="flex flex-col w-full lg:flex-row">
                    <div className="drawer">
                        <input id="drawer1" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            <label htmlFor="drawer1" className="btn btn-square drawer-button text-white w-full">{value1}</label>
                        </div>
                        <div className="drawer-side">
                            <label htmlFor="drawer1" className="drawer-overlay"></label>
                            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                                {Object.keys(symbols).map((symbolKey, id) => (
                                    <li key={id} onClick={() => handleCurrencySelection(setValue1, symbolKey)}>
                                        <a>{`${symbolKey} - ${symbols[symbolKey]}`}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="divider lg:divider-horizontal text-white">OR</div>
                    <div className="drawer">
                        <input id="drawer2" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            <label htmlFor="drawer2" className="btn btn-square text-white drawer-button w-full">{value2}</label>
                        </div>
                        <div className="drawer-side">
                            <label htmlFor="drawer2" className="drawer-overlay"></label>
                            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                                {Object.keys(symbols).map((symbolKey, id) => (
                                    <li key={id} onClick={() => handleCurrencySelection(setValue2, symbolKey)}>
                                        <a>{`${symbolKey} - ${symbols[symbolKey]}`}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="join w-full mx-auto mt-10">
                        <div className='w-full'>
                            <div className='w-full'>
                                <input className="input input-bordered join-item w-full" placeholder="Type amount" onChange={handleAmountChange} />
                            </div>
                        </div>
                        <div className="indicator">
                            <button className="btn join-item" onClick={requestConvert}>Convert</button>
                        </div>
                    </div>
                </div>

                <div className="stats text-primary w-full mt-20">

                    <div className="stat">
                        <div className="stat-title">Amount</div>
                        <div className="stat-value">${amount || 0}</div>
                        <div className="stat-actions">
                            <button className="btn btn-sm btn-success">
                                <p>
                                    Time:
                                    <span>{time || "-- -- --"}</span>
                                </p>
                            </button>
                        </div>
                    </div>

                    <div className="stat ">
                        <div className="stat-title">Converted Currency</div>
                        <div className="stat-value">
                            ${convertedAmount || 0}
                        </div>
                        <div className="stat-actions">
                            <button className="btn btn-sm">Withdrawal</button>
                            <button className="btn btn-sm">Deposit</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Currency;
