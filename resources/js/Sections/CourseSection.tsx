import {
    Monitor,
    Palette,
    Settings,
    Car,
    Zap,
    Scissors,
    Utensils,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";

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
    const sectionRef = useRef<HTMLDivElement>(null);

    const loadMore = () => {
        const currentCount = visibleCount;
        const newCount = Math.min(currentCount + 3, majors.length);
        setVisibleCount(newCount);

        // Scroll ke bawah setelah data baru dimuat
        setTimeout(() => {
            if (sectionRef.current) {
                const yOffset = -100; // Offset untuk memberi sedikit ruang
                const y =
                    sectionRef.current.getBoundingClientRect().top +
                    window.pageYOffset +
                    yOffset;
                window.scrollTo({ top: y, behavior: "smooth" });
            }
        }, 100); // Delay kecil agar animasi muncul dulu
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
                <AnimatePresence>
                    {majors.slice(0, visibleCount).map((major, index) => {
                        const IconComponent = major.icon;
                        return (
                            <motion.button
                                key={major.id}
                                className={`relative group bg-gradient-to-br ${major.color} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden`}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {/* Background decorative */}
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
                </AnimatePresence>
            </div>

            {visibleCount < majors.length && (
                <motion.button
                    onClick={loadMore}
                    className="mt-8 px-6 py-3 bg-[#0B2441] text-white font-semibold rounded-full shadow-md hover:bg-opacity-90 transition duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    Load More
                </motion.button>
            )}
        </div>
    );
};

export default CourseSection;
