import React, { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { toast } from "react-hot-toast";
import "../layout/NavBarButton.css"
import "../layout/SoundButton.css"

const BackgroundMusic = () => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const toggleMusic = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().catch((e) => {
                toast.error("Music playback failed.");
                console.log("Playback error:", e);
            });
            setIsPlaying(true);
        }
    };

    return (
        <div>
            {/* Audio */}
            <audio ref={audioRef} loop preload="auto">
                <source src="/assets/music/background.mp3" type="audio/mpeg" />
                Your browser does not support audio.
            </audio>

            {/* button */}
            <button
                onClick={toggleMusic}
                className="navbar-button sound-button"
            >
                {isPlaying ? (
                    <Volume2 className="volume-icon playing" size={32} />
                ) : (
                    <VolumeX className="volume-icon muted" size={32} />
                )}
            </button>
        </div>
    );
};

export default BackgroundMusic;
