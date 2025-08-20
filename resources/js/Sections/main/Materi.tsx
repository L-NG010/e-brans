import { router } from "@inertiajs/react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { MapelType } from "@/types/Main/mapel";
import { MateriType } from "@/types/Main/materi";

interface MateriProps {
    mapel: MapelType[];
    materi: MateriType[];
}

const Materi = ({ mapel, materi }: MateriProps) => {
    const [selected, setSelected] = useState("X");
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const [isHovering, setIsHovering] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const controls = useAnimation();

    const grades = ["X", "XI", "XII"];
    const student = "/assets/svg/student-icon.svg";
    const rpl = "/assets/img/iconrpl.png";

    const filteredMateri = materi.filter((item) => item.kelas === selected);

    // Only duplicate cards if there are more than 3 items for seamless scrolling
    const duplicatedMateri = filteredMateri.length > 3
        ? [...filteredMateri, ...filteredMateri, ...filteredMateri, ...filteredMateri]
        : filteredMateri;

    // Auto-scroll animation - only if more than 3 items
    useEffect(() => {
        if (filteredMateri.length > 3 && !isHovering) {
            controls.start({
                x: "-50%",
                transition: {
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: duplicatedMateri.length * 3, // Adjust speed based on number of items
                        ease: "linear",
                    },
                },
            });
        } else {
            // Stop animation if 3 or fewer items
            controls.set({ x: 0 });
        }
    }, [controls, duplicatedMateri.length, isHovering, filteredMateri.length]);

    // Stop animation on hover - only if scrolling is active
    const handleMouseEnter = () => {
        if (filteredMateri.length > 3) {
            setIsHovering(true);
            controls.stop();
        }
    };

    // Resume animation when not hovering - only if scrolling should be active
    const handleMouseLeave = () => {
        if (filteredMateri.length > 3) {
            setIsHovering(false);
        }
    };

    const stripHtmlAndLimit = (html: string, limit: number = 100) => {
        if (!html) return '';
        const div = document.createElement('div');
        div.innerHTML = html;
        const text = div.textContent || div.innerText || '';
        return text.length > limit ? text.substring(0, limit) + '...' : text;
    };

    return (
        <div className="relative flex flex-col items-center mt-20 px-4 sm:px-10 w-full">
            <div className="w-1/2 border-t-2 border-gray-300 my-4 mx-auto"></div>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-8"
            >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B2441] mb-4">
                    Materi Pembelajaran
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">Pilih kelas dan jelajahi materi yang tersedia</p>
            </motion.div>

            {/* Grade Selector */}
            <div className="flex flex-col items-center w-full mb-12">
                <div className="flex items-center gap-4 mb-6 w-full max-w-md px-4">
                    <img
                        src={student}
                        alt="ikon siswa"
                        width={40}
                        className="mr-2 flex-shrink-0"
                    />
                    <div className="flex bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full p-1 w-full shadow-lg border border-blue-200">
                        {grades.map((grade) => (
                            <button
                                key={grade}
                                onClick={() => {
                                    setSelected(grade);
                                }}
                                className={`flex-1 h-12 flex items-center justify-center rounded-full font-bold transition-all duration-300 ${selected === grade
                                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105"
                                    : "text-blue-800 hover:bg-blue-100 hover:scale-102"
                                }`}
                            >
                                {grade}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scrolling Cards Container */}
            {filteredMateri.length > 0 ? (
                <div
                    className="w-full max-w-full overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 py-8 rounded-2xl shadow-inner"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    ref={containerRef}
                >
                    <motion.div
                        className={`flex items-center gap-8 px-6 ${filteredMateri.length <= 3 ? 'justify-center' : ''}`}
                        animate={controls}
                        style={{
                            display: "inline-flex",
                            whiteSpace: "nowrap",
                            ...(filteredMateri.length <= 3 && { width: "100%" })
                        }}
                    >
                        {duplicatedMateri.map((item, index) => {
                            const mapelName = mapel.find((m) => m.id === item.mapel_id)?.nama ?? "Mata Pelajaran";

                            return (
                                <motion.div
                                    key={`${item.id}-${index}`}
                                    className="flex-shrink-0 w-80 relative"
                                    onMouseEnter={() => setHoveredCard(item.id)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 h-full">
                                        {/* Image Section */}
                                        <div className="relative">
                                            <div className="w-full h-48 overflow-hidden">
                                                {item.gambar ? (
                                                    <img
                                                        src={item.gambar}
                                                        alt={item.judul}
                                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                                                        <svg className="w-16 h-16 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Grade Badge */}
                                            <div className="absolute top-4 right-4">
                                                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-center py-1 px-3 rounded-full text-xs font-bold shadow-lg">
                                                    KELAS {item.kelas}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="p-6">
                                            {/* Subject Badge */}
                                            <div className="mb-3">
                                                <span className="text-blue-600 text-sm font-semibold bg-blue-100 px-3 py-1 rounded-full">
                                                    {mapelName}
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <h3 className="font-bold text-lg text-gray-800 mb-3 line-clamp-2 break-words min-h-[3.5rem]">
                                                {item.judul}
                                            </h3>

                                            {/* Content Preview */}
                                            <div className="text-gray-600 text-sm mb-4 min-h-[2.5rem]">
                                                {stripHtmlAndLimit(item.konten, 80)}
                                            </div>

                                            {/* Date */}
                                            <div className="flex items-center text-gray-500 text-xs mb-6">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                {new Date(item.created_at).toLocaleDateString('id-ID')}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex space-x-3">
                                                <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-all duration-200 hover:shadow-md">
                                                    Detail
                                                </button>
                                                <button
                                                    onClick={() => router.visit(`/materi/mapel/${item.mapel_id}`)}
                                                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl text-sm font-bold hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                                                >
                                                    Mulai
                                                </button>
                                            </div>
                                        </div>

                                        {/* Hover Overlay */}
                                        <AnimatePresence>
                                            {hoveredCard === item.id && (
                                                <motion.div
                                                    className="absolute inset-0 bg-white rounded-2xl shadow-2xl border-2 border-blue-200"
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <div className="p-6 h-full flex flex-col">
                                                        <div className="flex-1">
                                                            <div className="mb-2">
                                                                <span className="text-blue-600 text-sm font-semibold bg-blue-100 px-3 py-1 rounded-full">
                                                                    {mapelName}
                                                                </span>
                                                            </div>

                                                            <h4 className="text-xl font-bold text-gray-800 mb-3 break-words">
                                                                {item.judul}
                                                            </h4>

                                                            <div className="flex items-center text-gray-500 text-sm mb-4">
                                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                </svg>
                                                                Diposting: {new Date(item.created_at).toLocaleDateString('id-ID')}
                                                            </div>

                                                            <div className="border-t border-gray-200 my-4"></div>

                                                            <div className="text-gray-600 text-sm leading-relaxed max-h-40 overflow-y-auto">
                                                                {stripHtmlAndLimit(item.konten, 200)}
                                                            </div>
                                                        </div>

                                                        <div className="flex space-x-3 mt-6">
                                                            <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors">
                                                                Detail Lengkap
                                                            </button>
                                                            <button
                                                                onClick={() => router.visit(`/materi/mapel/${item.mapel_id}`)}
                                                                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl text-sm font-bold hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-md hover:shadow-lg"
                                                            >
                                                                Mulai Belajar
                                                            </button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            ) : (
                <div className="text-center py-20">
                    <div className="text-gray-400 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-500 mb-2">Belum Ada Materi</h3>
                    <p className="text-gray-400">Materi untuk kelas {selected} akan segera tersedia</p>
                </div>
            )}

            {/* Scroll Indicator */}
            {filteredMateri.length > 3 && (
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 3v10a2 2 0 002 2h6a2 2 0 002-2V7H7z" />
                        </svg>
                        Hover untuk menghentikan scroll otomatis
                    </p>
                </div>
            )}
        </div>
    );
};

export default Materi;
