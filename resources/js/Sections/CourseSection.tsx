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
            id: "otomotif",
            name: "Teknik Otomotif",
            icon: Car,
            color: "from-red-500 to-red-600",
        },
        {
            id: "listrik",
            name: "Teknik Listrik",
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

    return (
        <div className="relative flex flex-col items-center mt-20 px-4">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl w-full">
                {majors.map((major, index) => {
                    const IconComponent = major.icon;
                    return (
                        <motion.button
                            key={major.id}
                            className={`relative group bg-gradient-to-br ${major.color} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
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
            </div>
        </div>
    );
};

export default CourseSection;
