import { useEffect } from "react";
import toast from "react-hot-toast";
import './IntroToast.css';
import { Music, ArrowRight } from "lucide-react";

const IntroToast = () => {
    useEffect(() => {
        toast.custom(
            (t) => (
                <div className={`custom-toast ${t.visible ? 'enter' : 'leave'}`}>
                    <span>
                        <Music size={20} /> Turn on the music and enjoy the atmosphere <ArrowRight className="arrow" size={20} />
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
