import { useEffect } from "react";
import toast from "react-hot-toast";
import './IntroToast.css';
import { Music } from "lucide-react";

const IntroToast = () => {
    useEffect(() => {
        if (window.innerWidth < 768) return;
        toast.custom(
            (t) => (
                <div className={`custom-toast ${t.visible ? 'enter' : 'leave'}`}>
                    <span>
                        <Music size={20} /> Turn on the music and enjoy the atmosphere
                    </span>
                </div>
            ),
            {
                id: "welcome-toast",
                duration: 10000,
                position: "top-center",
            }
        );
    }, []);

    return null;
};

export default IntroToast;
