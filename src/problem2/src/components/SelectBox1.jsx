import { useState } from "react";
import currencyImages from "../constants/currencyImages";

export default function SelectBox1({ currencies, selectedCurrency, onCurrencyChange }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleCurrencySelect = (currency) => {
        onCurrencyChange(currency);
        setDropdownOpen(false);
    };

    return (
        <div className="relative flex-1  rounded-xl">
            <button
                onClick={handleDropdownToggle}
                className="w-full p-2 outline-none cursor-pointer border-[#46475E] border-[1px] rounded-md bg-[#36324A] text-white flex items-center justify-between"
            >
                <img
                    src={currencyImages[selectedCurrency]}
                    alt={selectedCurrency}
                    className="w-6 h-6 mr-2"
                />
                {selectedCurrency}
                <span className="ml-2">&#9662;</span>
            </button>
            {dropdownOpen && (
                <ul className="absolute w-[300px] bottom-12 bg-[#36324A] h-[300px] overflow-auto rounded-md mt-1 z-10">
                    {currencies.map((currency) => (
                        <li
                            key={currency}
                            onClick={() => handleCurrencySelect(currency)}
                            className="p-2 flex items-center cursor-pointer hover:bg-[#2B2B36] text-white"
                        >
                            <img
                                src={currencyImages[currency]}
                                alt={currency}
                                className="w-6 h-6 mr-2"
                            />
                            {currency}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
