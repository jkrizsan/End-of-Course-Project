import React from 'react';

const TechnicalIndicators = ({ indicators, setIndicators }) => {
    const handleChange = (indicator) => {
        const updatedIndicators = indicators.includes(indicator)
            ? indicators.filter((i) => i !== indicator) // Remove indicator if already selected
            : [...indicators, indicator]; // Add indicator if not selected

        setIndicators(updatedIndicators); // Update indicators in App component
    };

    return (
        <div>
            <h4>Select Technical Indicators:</h4>
            {['SMA', 'EMA', 'BOLL'].map((indicator) => (
                <label key={indicator}>
                    <input
                        type="checkbox"
                        checked={indicators.includes(indicator)}
                        onChange={() => handleChange(indicator)}
                    />
                    {indicator}
                </label>
            ))}
        </div>
    );
};

export default TechnicalIndicators;