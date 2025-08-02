import {
    Monitor,
    Palette,
    Settings,
    Car,
    Zap,
    Scissors,
    Utensils,
    BookText,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const CourseSection = () => {
    const majors = [
        { id: "rpl", name: "Rekayasa Perangkat", icon: Monitor, color: "from-green-600 to-green-700" },
        { id: "dkv", name: "Desain Komunikasi Visual", icon: Palette, color: "from-green-500 to-green-600" },
        { id: "mesin", name: "Teknik Mesin", icon: Settings, color: "from-blue-400 to-blue-700" },
        { id: "otomotif1", name: "TBSM", icon: Car, color: "from-red-500 to-red-600" },
        { id: "otomotif2", name: "TKR", icon: Car, color: "from-red-500 to-red-600" },
        { id: "listrik1", name: "TPTL", icon: Zap, color: "from-yellow-500 to-yellow-600" },
        { id: "listrik2", name: "TPTU", icon: Zap, color: "from-yellow-500 to-yellow-600" },
        { id: "busana", name: "Tata Busana", icon: Scissors, color: "from-pink-500 to-pink-600" },
        { id: "boga", name: "Tata Boga", icon: Utensils, color: "from-cyan-500 to-cyan-600" },
    ];

    const umumSubjects = [
        { id: "indo", name: "Bahasa Indonesia" },
        { id: "inggris", name: "Bahasa Inggris" },
        { id: "jawa", name: "Bahasa Jawa" },
        { id: "mtk", name: "Matematika" },
        { id: "sejarah", name: "Sejarah" },
        { id: "pai", name: "Pendidikan Agama Islam" },
        { id: "ipa", name: "IPAS" },
        { id: "pjok", name: "PJOK" },
        { id: "bk", name: "Bimbingan Konseling" },
    ];

    const [visibleCount, setVisibleCount] = useState(3);
    const [visibleUmum, setVisibleUmum] = useState(3);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        AOS.init({ duration: 800, easing: "ease-in-out", once: true, offset: 100 });
    }, []);

    const toggleItems = () => {
        if (visibleCount >= majors.length) {
            setVisibleCount(3);
        } else {
            setVisibleCount(Math.min(visibleCount + 3, majors.length));
        }
    };

    const toggleUmum = () => {
        if (visibleUmum >= umumSubjects.length) {
            setVisibleUmum(3);
        } else {
            setVisibleUmum(Math.min(visibleUmum + 3, umumSubjects.length));
        }
    };

    const isAllVisible = visibleCount >= majors.length;
    const isAllUmumVisible = visibleUmum >= umumSubjects.length;

    return (
        <div className="relative flex flex-col items-center mt-20 px-4" ref={sectionRef}>

            {/* Always show main title */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B2441] border-b-2 border-gray-700 pb-2 mb-12 text-center">
                Jelajahi Materi
            </h2>
            </motion.div>

            <div className="flex justify-center w-full mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl w-full justify-center mb-12">
                {[
                { type: "umum", icon: BookText, color: "from-gray-400 to-gray-500" },
                { type: "jurusan", icon: Settings, color: "from-orange-400 to-orange-600" },
                ].map(({ type, icon, color }) => (
                <div key={type} onClick={() => setSelectedCategory(type)}>
                    <Card
                    title={type === "umum" ? "Umum" : "Jurusan"}
                    icon={icon}
                    color={type === "jurusan" ? color : (selectedCategory === type ? color : "from-gray-400 to-gray-500")}
                    />
                </div>
                ))}
            </div>
            </div>

            {/* Show sub-title after selecting a category */}
            {selectedCategory && (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B2441] border-b-2 border-gray-700 pb-2 mb-12 text-center">
                {selectedCategory === "umum" ? "Jelajahi Materi Umum" : "Jelajahi Materi Jurusan"}
                </h2>
            </motion.div>
            )}

            {selectedCategory === "jurusan" && (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
                <AnimatePresence>
                    {majors.slice(0, visibleCount).map((major, index) => {
                    const IconComponent = major.icon;
                    return (
                        <motion.div
                        key={major.id}
                        initial={{ opacity: 0, y: 20, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -20, height: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        layout
                        >
                        <Card title={major.name} icon={IconComponent} color={major.color} index={index} />
                        </motion.div>
                    );
                    })}
                </AnimatePresence>
                </div>
                {majors.length > 3 && <LoadMoreButton isAllVisible={isAllVisible} onClick={toggleItems} />}
            </>
            )}

            {selectedCategory === "umum" && (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
                <AnimatePresence>
                    {umumSubjects.slice(0, visibleUmum).map((subject, index) => (
                    <motion.div
                        key={subject.id}
                        initial={{ opacity: 0, y: 20, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -20, height: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        layout
                    >
                        <Card title={subject.name} icon={BookText} color="from-gray-400 to-gray-500" index={index} />
                    </motion.div>
                    ))}
                </AnimatePresence>
                </div>
                {umumSubjects.length > 3 && <LoadMoreButton isAllVisible={isAllUmumVisible} onClick={toggleUmum} />}
            </>
            )}
        </div>
    );
};

interface CardProps {
    title: string;
    icon: React.ComponentType<{ size?: string | number; className?: string }>;
    color: string;
    index?: number;
}

const Card = ({ title, icon: Icon, color, index }: CardProps) => (
    <motion.button
        className={`relative group bg-gradient-to-br ${color} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden w-full`}
        data-aos="fade-up"
        data-aos-delay={(index || 0) * 100}
        data-aos-anchor-placement="top-bottom"
    >
        <div className="absolute -top-4 -right-4 w-20 h-20 bg-white bg-opacity-10 rounded-full" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white bg-opacity-5 rounded-full" />
        <div className="relative z-10 flex flex-col items-center text-center">
            <motion.div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4" whileHover={{ rotate: 10 }}>
                <Icon size={32} className="text-white" />
            </motion.div>
            <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
            <div className="w-0 h-0.5 bg-white bg-opacity-50 group-hover:w-full transition-all duration-300" />
        </div>
    </motion.button>
);

interface LoadMoreButtonProps {
    isAllVisible: boolean;
    onClick: () => void;
}

const LoadMoreButton = ({ isAllVisible, onClick }: LoadMoreButtonProps) => (
    <motion.button
        onClick={onClick}
        className={`mt-8 relative inline-flex items-center justify-center px-6 py-3 font-medium rounded-full cursor-pointer group transition-all duration-300 ${isAllVisible ? "text-white bg-gray-700" : "text-gray-600 bg-white"}`}
        data-aos="fade-up"
    >
        {!isAllVisible && (
            <>
                <div className="absolute inset-0 rounded-full border-2 border-gray-300 group-hover:border-transparent transition-all duration-300" />
                <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-blue-400 group-hover:shadow-[0_0_15px_3px_rgba(59,130,246,0.5)] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-purple-400 group-hover:shadow-[0_0_25px_5px_rgba(147,51,234,0.3)] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100" />
            </>
        )}
        <span className="relative flex items-center gap-2 z-10">
            <span>{isAllVisible ? "Collapse" : "Load More"}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${isAllVisible ? "group-hover:-rotate-90" : "group-hover:rotate-90"}`}>
                {isAllVisible ? (
                    <line x1="5" y1="12" x2="19" y2="12" />
                ) : (
                    <>
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </>
                )}
            </svg>
        </span>
    </motion.button>
);

export default CourseSection;
