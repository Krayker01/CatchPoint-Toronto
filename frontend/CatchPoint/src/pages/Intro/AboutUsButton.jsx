import React from "react";
import { Info } from "lucide-react";
import "./AboutUsButton.css";

const LearnMoreButton = ({ onClick }) => {
    return (
        <button className="learn-more-button" onClick={onClick}>
            <Info size={18} className="icon" />
            <span>About us</span>
        </button>
    );
};

export default LearnMoreButton;
