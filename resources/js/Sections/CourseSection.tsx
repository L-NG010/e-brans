import {
    Monitor,
    Palette,
    Settings,
    Car,
    Zap,
    Scissors,
    Utensils,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const CourseSection = () => {
    const majors = [
        {
            id: "rpl",
            name: "Rekayasa Perangkat Lunak",
            icon: Monitor,
            color: "from-blue-500 to-blue-600",
        },
        {
            id: "dkv",
            name: "Desain Komunikasi Visual",
            icon: Palette,
            color: "from-purple-500 to-purple-600",
        },
        {
            id: "mesin",
            name: "Teknik Mesin",
            icon: Settings,
            color: "from-gray-600 to-gray-700",
        },
        {
            id: "otomotif1",
            name: "TBSM",
            icon: Car,
            color: "from-red-500 to-red-600",
        },
        {
            id: "otomotif2",
            name: "TKR",
            icon: Car,
            color: "from-red-500 to-red-600",
        },
        {
            id: "listrik1",
            name: "TPTL",
            icon: Zap,
            color: "from-yellow-500 to-yellow-600",
        },
        {
            id: "listrik2",
            name: "TPTU",
            icon: Zap,
            color: "from-yellow-500 to-yellow-600",
        },
        {
            id: "busana",
            name: "Tata Busana",
            icon: Scissors,
            color: "from-pink-500 to-pink-600",
        },
        {
            id: "boga",
            name: "Tata Boga",
            icon: Utensils,
            color: "from-green-500 to-green-600",
        },
    ];

    const [visibleCount, setVisibleCount] = useState(3);
    // Tambahkan tipe HTMLDivElement ke useRef
    const sectionRef = useRef<HTMLDivElement>(null);

    // Inisialisasi AOS
    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: "ease-in-out",
            once: true,
            offset: 100,
        });
    }, []);

    const loadMore = () => {
        const currentCount = visibleCount;
        const newCount = Math.min(currentCount + 3, majors.length);
        setVisibleCount(newCount);

        // Scroll ke bawah setelah data baru dimuat
        setTimeout(() => {
            // Pastikan sectionRef.current tidak null
            if (sectionRef.current) {
                const yOffset = -100;
                const y =
                    sectionRef.current.getBoundingClientRect().top +
                    window.pageYOffset +
                    yOffset;
                window.scrollTo({ top: y, behavior: "smooth" });
            }
        }, 100);
    };

    return (
        <div
            className="relative flex flex-col items-center mt-20 px-4"
            ref={sectionRef}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B2441] border-b-2 border-gray-700 pb-2 mb-12 text-center">
                    Jelajahi Materi, Sesuai Jurusan
                </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
                {majors.slice(0, visibleCount).map((major, index) => {
                    const IconComponent = major.icon;
                    return (
                        <motion.button
                            key={major.id}
                            className={`relative group bg-gradient-to-br ${major.color} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden`}
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            data-aos-anchor-placement="top-bottom"
                        >
                            <div className="absolute -top-4 -right-4 w-20 h-20 bg-white bg-opacity-10 rounded-full"></div>
                            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white bg-opacity-5 rounded-full"></div>

                            <div className="relative z-10 flex flex-col items-center text-center">
                                <motion.div
                                    className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4"
                                    whileHover={{ rotate: 10 }}
                                >
                                    <IconComponent
                                        size={32}
                                        className="text-white"
                                    />
                                </motion.div>
                                <h3 className="text-white font-bold text-lg mb-2">
                                    {major.name}
                                </h3>
                                <div className="w-0 h-0.5 bg-white bg-opacity-50 group-hover:w-full transition-all duration-300"></div>
                            </div>
                        </motion.button>
                    );
                })}
            </div>

            {visibleCount < majors.length && (
                <motion.div
                    onClick={loadMore}
                    className="mt-8 cursor-pointer rounded-full border border-gray-300 px-6 py-3 text-center text-gray-500 transition-colors duration-300 ease-in-out relative inline-block overflow-hidden group"
                    whileHover={{
                        borderColor: "transparent",
                        color: "#fff",
                        backgroundImage:
                            "linear-gradient(to right, #ff6f00, #ffcc00)",
                    }}
                    data-aos="fade-up"
                >
                    Load More
                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-white to-white transition-all duration-500 ease-in-out group-hover:left-0 group-hover:w-full"></span>
                </motion.div>
            )}
        </div>
    );
};

export default CourseSection;
