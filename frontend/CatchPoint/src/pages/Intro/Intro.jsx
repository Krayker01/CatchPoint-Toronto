import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BackgroundMusic from './BackgroundMusic';
import IntroToast from './IntroToast';
import SiteTitle from '../SiteTitle';
import CreditLabel from './CreditLabel';
import GetStartedButton from './GetStartedButton';
import LearnMoreButton from './AboutUsButton';
import Footer from './Footer';

import './intro.css';
import "./IntroButtons.css"

const Intro = () => {
    const containerRef = useRef(null);
    const navigate = useNavigate();
    const [disableEffects, setDisableEffects] = useState(false);

    useEffect(() => {
        const checkScreen = () => setDisableEffects(window.innerWidth < 1024);
        checkScreen();
        window.addEventListener('resize', checkScreen);
        return () => window.removeEventListener('resize', checkScreen);
    }, []);

    const handleMouseMove = (e) => {
        if (disableEffects) return;

        const container = containerRef.current;
        const rect = container.getBoundingClientRect();

        const x = ((e.clientX - rect.left) / rect.width - 0.5);
        const y = ((e.clientY - rect.top) / rect.height - 0.5);

        const layers = container.querySelectorAll(".layer");

        layers.forEach((layer) => {
            const depth = parseFloat(layer.dataset.depth);
            const speed = parseFloat(layer.dataset.speed) || 1;

            const moveX = x * 40 * speed;
            const moveY = y * 20 * speed;
            const rotateX = y * 2 * speed;
            const rotateY = x * 2 * speed;

            if (depth > 0) {
                layer.style.transform = `
                    translateX(-50%) translateX(${moveX}px)
                    translateY(${moveY}px)
                    translateZ(${depth}px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    scale(1.05)  /* небольшой масштаб для фронтального слоя */
                `;
            } else {
                layer.style.transform = `
                    translateZ(${depth}px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    scale(1.02)  /* небольшой масштаб для фонового слоя */
                `;
            }
        });
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                perspective: "1000px",
            }}
        >
            <SiteTitle />
            <div className="intro-buttons">
                <GetStartedButton onClick={() => navigate("/home")} />
                <LearnMoreButton onClick={() => navigate("/about")} />
            </div>
            <CreditLabel />
            <IntroToast />
            <BackgroundMusic />
            <Footer />

            {/* BACKGROUND */}
            <img
                src="/assets/introPage/background.jpg"
                className="layer background-layer"
                data-depth="-5"
                data-speed="0.2"
                alt="Page background"
            />

            {/* FRONT ELEMENT */}
            <img
                src="/assets/introPage/notes.png"
                className="layer front-layer"
                data-depth="60"
                data-speed="1"
                alt="Image of notes"
            />
        </div>
    );
};

export default Intro;
