import React, { useState } from 'react';

const fishList = ['Salmon', 'Tuna', 'Trout', 'Bass', 'Carp'];
const locationList = ['River', 'Lake', 'Sea', 'Pond', 'Stream'];

const FishLocationSelector = () => {
    const [fish, setFish] = useState('');
    const [location, setLocation] = useState('');
    const [fishSuggestions, setFishSuggestions] = useState([]);
    const [locationSuggestions, setLocationSuggestions] = useState([]);

    // Handle fish input change
    const handleFishChange = (e) => {
        const value = e.target.value;
        setFish(value);
        setLocation(''); // reset location
        setFishSuggestions(fishList.filter(f => f.toLowerCase().includes(value.toLowerCase())));
    };

    // Handle location input change
    const handleLocationChange = (e) => {
        const value = e.target.value;
        setLocation(value);
        setFish(''); // reset fish
        setLocationSuggestions(locationList.filter(l => l.toLowerCase().includes(value.toLowerCase())));
    };

    // Select a fish from suggestions
    const handleSelectFish = (value) => {
        setFish(value);
        setLocation(''); // reset location
        setFishSuggestions([]);
    };

    // Select a location from suggestions
    const handleSelectLocation = (value) => {
        setLocation(value);
        setFish(''); // reset fish
        setLocationSuggestions([]);
    };

    return (
        <div className="fish-location-selector">
            <h3 className="selector-title tagesschrift-regular">
                Type a fish or location to see what you can catch
            </h3>

            <div className="inputs">
                {/* Fish input */}
                <div className="autocomplete">
                    <input
                        type="text"
                        placeholder="Search fish..."
                        value={fish}
                        onChange={handleFishChange}
                        className={location ? 'disabled-input' : ''}
                    />
                    {fishSuggestions.length > 0 && (
                        <ul className="suggestions">
                            {fishSuggestions.map((f, idx) => (
                                <li key={idx} onClick={() => handleSelectFish(f)}>
                                    {f}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Location input */}
                <div className="autocomplete">
                    <input
                        type="text"
                        placeholder="Search location..."
                        value={location}
                        onChange={handleLocationChange}
                        className={fish ? 'disabled-input' : ''}
                    />
                    {locationSuggestions.length > 0 && (
                        <ul className="suggestions">
                            {locationSuggestions.map((l, idx) => (
                                <li key={idx} onClick={() => handleSelectLocation(l)}>
                                    {l}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* See Catch button */}
                <button
                    className="see-catch-button"
                    onClick={() => console.log('Show catch for:', fish || location)}
                >
                    See Catch
                </button>
            </div>
        </div>
    );
};

export default FishLocationSelector;
