import React, { useState, useEffect } from "react";

import "./CreditLabel.css";

const CreditLabel = () => {
    const fullText = "From a fisherman, for fishermen...";
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let index = 0;

        const typeLetter = () => {
            if (index >= fullText.length) return;

            setDisplayedText((prev) => prev + fullText.charAt(index));
            index++;
            setTimeout(typeLetter, 50);
        };

        typeLetter();

        return () => {
            index = fullText.length;
        };
    }, []);

    return <div className="credit-label caveat-500">{displayedText}</div>;
};

export default CreditLabel;
