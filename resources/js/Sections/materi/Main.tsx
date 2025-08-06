import React, { useState } from "react";
import { BookOpen, Menu, X, ChevronLeft, ChevronRight, Clock, Users, Star } from "lucide-react";
import { MapelType } from "@/types/main/mapel";
import { MateriType } from "@/types/main/materi";
import { router } from "@inertiajs/react";
import { motion } from "framer-motion";

interface MateriProps {
    mapel: MapelType[];
    materi: MateriType[];
}

const MainSection = ({ materi, mapel }: MateriProps) => {
    const [selected, setSelected] = useState("X");
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const currentMapelId = materi.length > 0 ? materi[0].mapel_id : 0;
    const currentMapel = mapel.find((m) => m.id === currentMapelId);

    const getMapelNama = (mapel_id: number) => {
        const targetMapel = mapel.find((m) => m.id === mapel_id);
        return targetMapel ? targetMapel.nama : "Mapel tidak ditemukan";
    };

    // Function to strip HTML tags and limit text
    const stripHtmlAndLimit = (html: string, limit: number = 150) => {
        const div = document.createElement('div');
        div.innerHTML = html;
        const text = div.textContent || div.innerText || '';
        return text.length > limit ? text.substring(0, limit) + '...' : text;
    };

    // Function to safely render HTML content
    const createMarkup = (htmlString: string) => {
        return { __html: htmlString };
    };

    const WebDevelopingIllustration = ({ mapel, materi }: MateriProps) => (
        <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-xl p-6 text-white overflow-hidden min-h-[12rem] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/10 rounded-xl"></div>

            {/* Animated background elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20">
                <div className="absolute top-4 left-4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <div className="absolute top-8 right-8 w-3 h-3 bg-yellow-300 rounded-full animate-bounce"></div>
                <div className="absolute bottom-6 left-8 w-2 h-2 bg-green-300 rounded-full animate-ping"></div>
            </div>

            <div className="relative z-10 text-center">
                <div className="flex items-center justify-between mb-4">
                    <div className="text-sm font-medium opacity-90">LEARNING MATERIAL</div>
                    <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                </div>

                {/* Central illustration */}
                <div className="flex items-center justify-center mb-4">
                    <div className="relative">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                            <Star className="w-3 h-3 text-yellow-800" />
                        </div>
                    </div>
                </div>

                {/* Code-like elements */}
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 space-y-2 opacity-60">
                    <div className="flex space-x-1">
                        <div className="w-6 h-1.5 bg-cyan-300 rounded"></div>
                        <div className="w-4 h-1.5 bg-white rounded"></div>
                    </div>
                    <div className="flex space-x-1">
                        <div className="w-4 h-1.5 bg-orange-300 rounded"></div>
                        <div className="w-6 h-1.5 bg-white rounded"></div>
                    </div>
                </div>

                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 space-y-2 opacity-60">
                    <div className="flex space-x-1">
                        <div className="w-4 h-1.5 bg-pink-300 rounded"></div>
                        <div className="w-6 h-1.5 bg-white rounded"></div>
                    </div>
                    <div className="flex space-x-1">
                        <div className="w-6 h-1.5 bg-blue-300 rounded"></div>
                        <div className="w-3 h-1.5 bg-white rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    );

    const SidebarContent = () => (
        <div className="space-y-4 h-full">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 flex-shrink-0">
                <h2 className="font-bold text-lg mb-4 text-gray-800">Kelas X</h2>
                <div>
                    <h3 className="font-semibold mb-3 text-sm text-gray-700">
                        Materi Yang Diberikan :
                    </h3>
                    <div className="space-y-2">
                        <div className="cursor-pointer hover:bg-white/60 p-2 rounded-lg transition-colors duration-200 text-sm font-medium text-gray-700">
                            Naratif
                        </div>
                        <div className="cursor-pointer hover:bg-white/60 p-2 rounded-lg transition-colors duration-200 text-sm font-medium text-gray-700">
                            Argumentatif
                        </div>
                        <div className="cursor-pointer hover:bg-white/60 p-2 rounded-lg transition-colors duration-200 text-sm font-medium text-gray-700">
                            Eksposisi
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex-1 min-h-0">
                <h3 className="font-bold text-base mb-4 text-gray-800">Teks Naratif</h3>
                <div className="mb-4">
                    <h4 className="font-semibold text-sm mb-3 text-gray-700">Struktur teks Narasi</h4>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                        <div className="border-l-4 border-blue-400 pl-3">
                            <div className="font-semibold text-xs mb-1 text-gray-800">Orientasi</div>
                            <div className="text-gray-600 leading-relaxed text-xs">
                                Bagian ini memperkenalkan tokoh, latar (waktu dan tempat), serta suasana awal cerita. Biasanya para pembaca memahami situasi awal tokoh utama.
                            </div>
                        </div>
                        <div className="border-l-4 border-purple-400 pl-3">
                            <div className="font-semibold text-xs mb-1 text-gray-800">Komplikasi (Masalah atau Konflik)</div>
                            <div className="text-gray-600 leading-relaxed text-xs">
                                Bagian ini memperkenalkan tokoh, latar (waktu dan tempat), serta suasana awal cerita.
                            </div>
                        </div>
                        <div className="border-l-4 border-green-400 pl-3">
                            <div className="font-semibold text-xs mb-1 text-gray-800">Resolusi</div>
                            <div className="text-gray-600 leading-relaxed text-xs">
                                Bagian ini akan memberikan solusi dan menunjukkan bahwa sudah berakhir
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
                        <BookOpen className="w-5 h-5 text-white" />
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
            {/* Mobile menu button */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
                >
                    {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setSidebarOpen(false)} />
            )}

            <div className="flex min-h-screen">
                {/* Left Sidebar */}
                <div className={`
                    fixed lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-40
                    w-80 p-4 lg:p-6 bg-white lg:bg-transparent h-full overflow-y-auto
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                `}>
                    <div className="pt-16 lg:pt-0 h-full">
                        <SidebarContent />
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-4 lg:p-6 pt-16 lg:pt-6 min-w-0">
                    <div className="mb-6">
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent break-words">
                            {currentMapel?.nama}
                        </h1>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-4 lg:p-6 shadow-sm">
                        <div className="mb-6">
                            <div className="mb-4">
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 text-gray-800 break-words">
                                    {materi.map((item) => (
                                        <div key={item.id} className="break-words">{item.judul}</div>
                                    ))}
                                </h2>
                            </div>

                            <div className="mb-6">
                                <WebDevelopingIllustration mapel={mapel} materi={materi} />
                            </div>

                            <div className="space-y-4">
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
                                    <div className="text-gray-800 max-h-64 overflow-y-auto">
                                        <div className="space-y-3 prose prose-sm max-w-none">
                                            {materi.map((item) => (
                                                <div key={item.id} className="break-words">
                                                    <div
                                                        className="text-sm leading-relaxed"
                                                        dangerouslySetInnerHTML={createMarkup(item.konten)}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={() => router.visit(`/`)}
                                className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-medium rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                                Selesai
                            </button>
                            <button className="px-4 sm:px-6 py-2 sm:py-3 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-sm hover:shadow-md">
                                <ChevronLeft className="w-4 h-4 inline mr-1" />
                                <span className="hidden sm:inline">Sebelumnya</span>
                                <span className="sm:hidden">Prev</span>
                            </button>
                            <button className="px-4 sm:px-6 py-2 sm:py-3 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-sm hover:shadow-md">
                                <span className="hidden sm:inline">Lanjut Materi</span>
                                <span className="sm:hidden">Next</span>
                                <ChevronRight className="w-4 h-4 inline ml-1" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Card Materi Section */}
            <div className="max-w-7xl mx-auto mt-8 lg:mt-16 px-4 lg:px-6 pb-12">
                <div className="mb-8">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-gray-800 mb-2">
                        Materi Lainnya
                    </h2>
                    <p className="text-gray-600 text-center text-sm sm:text-base">Jelajahi materi pembelajaran yang menarik</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {materi
                        .filter((item) => item.mapel_id !== currentMapelId)
                        .slice(0, 3)
                        .map((item) => {
                            const mapelName = mapel.find((m) => m.id === item.mapel_id)?.nama ?? "Mata Pelajaran";

                            return (
                                <div
                                    key={item.id}
                                    className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden h-full flex flex-col"
                                    onMouseEnter={() => setHoveredCard(item.id)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    <div className="relative flex-shrink-0">
                                        <div className="w-full h-48 overflow-hidden">
                                            {item.gambar ? (
                                                <img
                                                    src={item.gambar}
                                                    alt={item.judul}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                                                    <BookOpen className="w-16 h-16 text-white opacity-80" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="absolute top-4 right-4">
                                            <div className="bg-green-600 text-white text-center py-1 px-3 rounded-full text-xs font-medium">
                                                KELAS {item.kelas}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 sm:p-6 flex-1 flex flex-col">
                                        <div className="mb-3">
                                            <span className="text-blue-600 text-xs sm:text-sm font-medium bg-blue-50 px-2 py-1 rounded-lg">
                                                {mapelName}
                                            </span>
                                        </div>

                                        <h3 className="font-bold text-base sm:text-lg text-gray-800 mb-2 line-clamp-2 break-words flex-1">
                                            {item.judul}
                                        </h3>

                                        <div className="flex items-center text-gray-500 text-xs sm:text-sm mb-4">
                                            <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                                            <span className="truncate">{new Date(item.created_at).toLocaleDateString('id-ID')}</span>
                                        </div>

                                        {/* Buttons */}
                                        <div className="flex space-x-2 mt-auto">
                                            <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-200 transition-colors">
                                                Tentang
                                            </button>
                                            <button
                                                onClick={() => router.visit(`/materi/mapel/${item.mapel_id}`)}
                                                className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-xs sm:text-sm font-medium hover:from-blue-600 hover:to-purple-600 transition-all shadow-md hover:shadow-lg"
                                            >
                                                Mulai Belajar
                                            </button>
                                        </div>

                                        {/* Hover Detail Overlay */}
                                        {hoveredCard === item.id && (
                                            <div className="absolute inset-0 bg-white rounded-2xl p-4 sm:p-6 shadow-2xl z-20 transform transition-all duration-300 flex flex-col">
                                                <div className="flex-1">
                                                    <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 break-words">
                                                        {item.judul}
                                                    </h4>
                                                    <div className="flex items-center text-gray-500 text-sm mb-4">
                                                        <Clock className="w-4 h-4 mr-1 flex-shrink-0" />
                                                        <span className="truncate">Diposting: {new Date(item.created_at).toLocaleDateString('id-ID')}</span>
                                                    </div>
                                                    <div className="border-t border-gray-200 my-4"></div>
                                                    <div className="text-gray-600 text-sm leading-relaxed max-h-32 overflow-y-auto">
                                                        {stripHtmlAndLimit(item.konten, 120)}
                                                    </div>
                                                </div>

                                                <div className="flex space-x-2 mt-4">
                                                    <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                                                        Tentang
                                                    </button>
                                                    <button
                                                        onClick={() => router.visit(`/materi/mapel/${item.mapel_id}`)}
                                                        className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-sm font-medium hover:from-blue-600 hover:to-purple-600 transition-all shadow-md hover:shadow-lg"
                                                    >
                                                        Mulai Belajar
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default MainSection;
