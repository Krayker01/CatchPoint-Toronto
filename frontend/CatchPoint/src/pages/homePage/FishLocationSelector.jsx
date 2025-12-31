import axios from "axios";
import React, { useState } from 'react';

const FishLocationSelector = ({ onRateLimit }) => {
    const [fish, setFish] = useState('');
    const [selectedFish, setSelectedFish] = useState(null);
    const [location, setLocation] = useState('');
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [fishSuggestions, setFishSuggestions] = useState([]);
    const [locationSuggestions, setLocationSuggestions] = useState([]);
    const [message, setMessage] = useState('');

    // Handle fish input change
    const handleFishChange = async (e) => {
        const value = e.target.value;
        setFish(value);
        setLocation('');
        setSelectedFish(null);
        setSelectedLocation(null);
        if (value.length < 2) {
            setFishSuggestions([]);
            return;
        }
        try {
            const res = await axios.get(`http://localhost:3000/api/search/fish`, { params: { name: value } });
            setFishSuggestions(res.data);
            if (res.data.length > 0) {
                setSelectedFish(res.data[0]);
            } else {
                setSelectedFish(null);
            }
        } catch (error) {
            console.error("Error fetching fish suggestions:", error);
            setFishSuggestions([]);
            setSelectedFish(null);
        }
    };


    // Handle location input change
    const handleLocationChange = async (e) => {
        const value = e.target.value;
        setLocation(value);
        setFish('');
        setSelectedFish(null);
        setSelectedLocation(null);
        if (value.length < 2) {
            setLocationSuggestions([]);
            return;
        }
        try {
            const res = await axios.get("http://localhost:3000/api/search/location", { params: { name: value } });
            setLocationSuggestions(res.data);
            if (res.data.length > 0) {
                setSelectedLocation(res.data[0]);
            } else {
                setSelectedLocation(null);
            }
        } catch (error) {
            console.error("Error fetching location suggestions:", error);
            setLocationSuggestions([]);
            setSelectedLocation(null);
        }
    };


    // Select a fish from suggestions
    const handleSelectFish = (fishObj) => {
        setFish(fishObj.name);
        setSelectedFish(fishObj);
        setFishSuggestions([]);
        setLocation('');
        setSelectedLocation(null);
    };

    // Select a location from suggestions
    const handleSelectLocation = (locationObj) => {
        setLocation(locationObj.name);
        setSelectedLocation(locationObj);
        setLocationSuggestions([]);
        setFish('');
        setSelectedFish(null);
    };

    // Fetch data on button click
    const fetchNotes = async () => {
        setMessage('');
        try {
            if (fish) {
                if (selectedFish) {
                    const res = await axios.get(`http://localhost:3000/api/search/fish/${selectedFish.id}/location`);
                    console.log("Locations for fish:", res.data);
                    if (!res.data.locations || res.data.locations.length === 0) {
                        setMessage(`No locations found for "${selectedFish.name}"`);
                    }
                } else {
                    const res = await axios.get(`http://localhost:3000/api/search/fish`, { params: { name: fish } });
                    const fishResults = res.data;
                    console.log("Locations for typed fish:", fishResults);
                    if (fishResults.length === 0) {
                        setMessage(`Fish "${fish}" not found in database`);
                    } else {
                        setSelectedFish(fishResults[0]);
                    }
                }
            }

            if (location) {
                if (selectedLocation) {
                    const res = await axios.get(`http://localhost:3000/api/search/location/${selectedLocation.id}/fish`);
                    console.log("Fish in location:", res.data);
                    if (!res.data.fishes || res.data.fishes.length === 0) {
                        setMessage(`No fish found in "${selectedLocation.name}"`);
                    }
                } else {
                    const res = await axios.get(`http://localhost:3000/api/search/location`, { params: { name: location } });
                    const locationResults = res.data;
                    console.log("Fish in typed location:", locationResults);
                    if (locationResults.length === 0) {
                        setMessage(`Location "${location}" not found in database`);
                    } else {
                        setSelectedLocation(locationResults[0]);
                    }
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setMessage('Error fetching data from server');
        }
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
                            {fishSuggestions.map((f) => (
                                <li key={f.id} onClick={() => handleSelectFish(f)}>
                                    {f.name}
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
                            {locationSuggestions.map((l) => (
                                <li key={l.id} onClick={() => handleSelectLocation(l)}>
                                    {l.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* See Catch button */}
                <button
                    className="see-catch-button"
                    onClick={fetchNotes}
                >
                    See Catch
                </button>
            </div>
            {message && <div className="message">{message}</div>}
        </div>
    );
};

export default FishLocationSelector;
