import React, { useState } from "react";
import { BookOpen, Menu, X, ChevronLeft, ChevronRight, Clock, Users, Star } from "lucide-react";
import { MapelType } from "@/types/Main/mapel";
import { MateriType } from "@/types/Main/materi";
import { router } from "@inertiajs/react";

interface MateriProps {
    mapel: MapelType[];
    materi: MateriType[];
}

const MainSection = ({ materi, mapel }: MateriProps) => {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    console.log(materi);
    const currentMapelId = materi.length > 0 ? materi[0].mapel_id : 0;
    const currentMapel = mapel.find((m) => m.id === currentMapelId);

    const currentMateri = materi.length > 0 ? materi[0] : null;

    const getMapelNama = (mapel_id: number) => {
        const targetMapel = mapel.find((m) => m.id === mapel_id);
        return targetMapel ? targetMapel.nama : "Mapel tidak ditemukan";
    };

    // Strip html untuk rangkuman card
    const stripHtmlAndLimit = (html: string, limit: number = 150) => {
        const div = document.createElement("div");
        div.innerHTML = html;
        const text = div.textContent || div.innerText || "";
        return text.length > limit ? text.substring(0, limit) + "..." : text;
    };

    const createMarkup = (htmlString: string) => {
        return { __html: htmlString };
    };

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
                <div
                    className="lg:hidden fixed inset-0 z-40 bg-black/50"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div className="flex min-h-screen">
                {/* Sidebar */}
                <div
                    className={`
            fixed lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-40
            w-80 p-4 lg:p-6 bg-white lg:bg-transparent h-full overflow-y-auto
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
                >
                    <div className="pt-16 lg:pt-0 h-full">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 flex-shrink-0">
                            {currentMateri && (
                                <div className="w-full h-64 rounded-lg overflow-hidden mb-4">
                                    {currentMateri.gambar ? (
                                        <img
                                            src={currentMateri.gambar}
                                            alt={currentMateri.judul}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
                                            <BookOpen className="w-20 h-20 text-white opacity-80 animate-bounce" />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl mt-4 p-4 flex-shrink-0">
                            <h2 className="font-bold text-lg mb-4 text-gray-800">RANGKUMAN MATERI</h2>
                            <h1 className="font-semibold mb-3 text-sm text-gray-700">
                                disini nanti adalah rangkuman materi
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-4 lg:p-6 pt-16 lg:pt-6 min-w-0">
                    {/* Judul Materi */}
                    <div className="mb-6">
                        {currentMateri && (
                            <>
                                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 break-words mb-2">
                                    KELAS {currentMateri.kelas} • {getMapelNama(currentMateri.mapel_id)}
                                </h1>
                                <p className="text-xl text-gray-700">
                                    {currentMateri.judul}
                                </p>
                            </>
                        )}
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
                                                        className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: item.konten }}
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        {/* Fade atas */}
                                        <div className="pointer-events-none absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-white to-transparent" />
                                        {/* Fade bawah */}
                                        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>


                    {/* Action Buttons */}
                    <div className="flex flex-wrap mt-4 gap-3">
                        <button
                            onClick={() => router.visit(`/`)}
                            className="px-4 sm:px-6 py-2 sm:py-3 bg-[#008509] text-white text-sm font-medium rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                            Selesai
                        </button>
                        <button className="px-4 sm:px-6 py-2 sm:py-3 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-sm hover:shadow-md">
                            <ChevronLeft className="w-4 h-4 inline mr-1" />
                            Sebelumnya
                        </button>
                        <button className="px-4 sm:px-6 py-2 sm:py-3 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-sm hover:shadow-md">
                            Lanjut Materi
                            <ChevronRight className="w-4 h-4 inline ml-1" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Materi Lainnya */}
            <div className="max-w-7xl mx-auto mt-8 lg:mt-16 px-4 lg:px-6 pb-12">
                <div className="mb-8">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-gray-800 mb-2">
                        Materi Lainnya
                    </h2>
                    <p className="text-gray-600 text-center text-sm sm:text-base">
                        Jelajahi materi pembelajaran yang menarik
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {materi
                        .filter((item) => item.mapel_id !== currentMapelId)
                        .slice(0, 3)
                        .map((item) => {
                            const mapelName =
                                mapel.find((m) => m.id === item.mapel_id)?.nama ??
                                "Mata Pelajaran";

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
                                            <span className="truncate">
                                                {new Date(item.created_at).toLocaleDateString("id-ID")}
                                            </span>
                                        </div>

                                        {/* Buttons */}
                                        <div className="flex space-x-2 mt-auto">
                                            <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-200 transition-colors">
                                                Tentang
                                            </button>
                                            <button
                                                onClick={() =>
                                                    router.visit(`/materi/mapel/${item.mapel_id}`)
                                                }
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
                                                        <span className="truncate">
                                                            Diposting:{" "}
                                                            {new Date(item.created_at).toLocaleDateString(
                                                                "id-ID"
                                                            )}
                                                        </span>
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
                                                        onClick={() =>
                                                            router.visit(`/materi/mapel/${item.mapel_id}`)
                                                        }
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
