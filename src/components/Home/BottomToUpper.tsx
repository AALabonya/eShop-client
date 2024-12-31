// "use client";

// import { ArrowUp } from "lucide-react";
// import { useEffect, useState } from "react";

// function BotomToTop() {
//     const [showButton, setShowButton] = useState(false);

//     useEffect(() => {
//         const handleScroll = () => {
//             if (window.scrollY > 300) {
//                 setShowButton(true);
//             } else {
//                 setShowButton(false);
//             }
//         };
//         window.addEventListener("scroll", handleScroll);
//         return () => {
//             window.removeEventListener("scroll", handleScroll);
//         };
//     }, []);

//     const scrollToTop = () => {
//         window.scrollTo({
//             top: 0,
//             behavior: "smooth",
//         });
//     };

//     return (
//         <>
//             <div
//                 className={`fixed bottom-8 right-6 z-50 transition-transform duration-500 ease-in-out ${
//                     showButton ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
//                 }`}
//             >
//                 <button
//                     onClick={scrollToTop}
//                     className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-[#80b500] to-[#80b500] shadow-lg hover:shadow-xl transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
//                     aria-label="Scroll to top"
//                 >
//                     <span className="absolute inset-0 rounded-full border-4 border-transparent animate-border"></span>
//                     <ArrowUp className="w-6 h-6 text-white z-10" />
//                 </button>
//             </div>
//             <style jsx>{`
//                 @keyframes borderAnimation {
//                     0% {
//                         border-color: transparent;
//                     }
//                     50% {
//                         border-color: #DC2626;
//                     }
//                     100% {
//                         border-color: transparent;
//                     }
//                 }
//                 .animate-border {
//                     animation: borderAnimation 2s infinite;
//                 }
//             `}</style>
//         </>
//     );
// }

// export default BotomToTop;
"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

function BotomToTop() {
    const [showButton, setShowButton] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY; 
            const docHeight = document.documentElement.scrollHeight - window.innerHeight; 
            const progress = (scrollTop / docHeight) * 100;

            setScrollProgress(progress);

            if (scrollTop > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            <div
                className={`fixed bottom-8 right-6 z-50 transition-transform duration-500 ease-in-out ${
                    showButton ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
            >
                <button
                    onClick={scrollToTop}
                    className="relative flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-r from-[#80b500] to-[#80b500] shadow-lg hover:shadow-xl transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    aria-label="Scroll to top"
                >
                    <svg
                        className="absolute inset-0 w-full h-full transform -rotate-90"
                        viewBox="0 0 36 36"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            className="text-gray-300"
                            strokeWidth="3"
                            stroke="currentColor"
                            fill="transparent"
                            r="16"
                            cx="18"
                            cy="18"
                        />
                        <circle
                            className="text-[#DC2626]"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeDasharray="100, 100"
                            strokeDashoffset={100 - scrollProgress}
                            stroke="currentColor"
                            fill="transparent"
                            r="16"
                            cx="18"
                            cy="18"
                        />
                    </svg>
                    <ArrowUp className="w-6 h-6 text-white z-10" />
                </button>
            </div>
        </>
    );
}

export default BotomToTop;
