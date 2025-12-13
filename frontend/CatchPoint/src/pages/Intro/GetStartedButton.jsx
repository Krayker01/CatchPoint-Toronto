import React from "react";
import { ArrowRight } from "lucide-react";
import "./GetStartedButton.css";

const GetStartedButton = ({ onClick }) => {
    return (
        <button className="get-started-button" onClick={onClick}>
            <span className="text">Get Started</span>
            <ArrowRight size={20} className="icon" />
        </button>
    );
};

export default GetStartedButton;
