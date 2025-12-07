import React, { useRef } from 'react';

const Intro = () => {
    const containerRef = useRef(null);

    const handleMouseMove = (e) => {
        const container = containerRef.current;
        const rect = container.getBoundingClientRect();

        const x = ((e.clientX - rect.left) / rect.width - 0.5);
        const y = ((e.clientY - rect.top) / rect.height - 0.5);

        const layers = container.querySelectorAll(".layer");

        layers.forEach((layer) => {
            const depth = parseFloat(layer.dataset.depth);
            const speed = parseFloat(layer.dataset.speed) || 1;

            // Layer movement
            const moveX = x * 40 * speed;
            const moveY = y * 20 * speed;
            const rotateX = y * 2 * speed;
            const rotateY = x * 2 * speed;

            if (depth > 0) {
                // Front Element: Adding Offset to Base Centering
                layer.style.transform = `
                    translateX(-50%) translateX(${moveX}px)
                    translateY(${moveY}px)
                    translateZ(${depth}px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                `;
            } else {
                // Background: almost motionless
                layer.style.transform = `
                    translateZ(${depth}px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
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
            {/* BACKGROUND */}
            <img
                src="/assets/introPage/background.jpg"
                className="layer"
                data-depth="-5"
                data-speed="0.2"  // slow movement
                style={backgroundStyle}
                alt=""
            />

            {/* FRONT ELEMENT  */}
            <img
                src="/assets/introPage/notes.png"
                className="layer"
                data-depth="60"
                data-speed="1"   // active movement
                style={frontStyle}
                alt=""
            />
        </div>
    );
};

const backgroundStyle = {
    position: "absolute",
    width: "120%",    // hide the white edges
    height: "120%",
    top: "-10%",
    left: "-10%",
    objectFit: "cover",
    transition: "transform 0.1s linear",
    willChange: "transform",
};

const frontStyle = {
    position: "absolute",
    bottom: "0",         // stick to the bottom
    left: "50%",          // horizontal center
    transform: "translateX(-50%)",  // basic centering
    width: "110%",         // adjustable size
    height: "auto",
    objectFit: "contain",
    transition: "transform 0.1s linear",
    willChange: "transform",
};

export default Intro;
