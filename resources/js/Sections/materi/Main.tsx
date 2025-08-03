import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { MapelType } from "@/types/main/mapel";
import { MateriType } from "@/types/main/materi";
import { router } from "@inertiajs/react";
import { motion } from "framer-motion";


interface MateriProps {
    mapel: MapelType[];
    materi: MateriType[];
}

const MainSection = ({ materi, mapel }: MateriProps) => {
    // pindahin hooknya ke sini
    const [selected, setSelected] = useState("X");
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const currentId = 3; // contoh id materi yg sedang dibuka, bisa diganti
    const rpl = "/assets/img/iconrpl.png";

    const WebDevelopingIllustration = ({ mapel, materi }: MateriProps) => (
    <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-lg p-6 text-white overflow-hidden h-48">
        <div className="absolute top-3 left-3 text-xs opacity-75">WEB DEVELOPING</div>
        <div className="absolute top-3 right-3 flex space-x-1">
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
        </div>

        {/* Code blocks left */}
        <div className="absolute left-4 top-12 space-y-1">
            <div className="flex space-x-1">
                <div className="w-12 h-2 bg-cyan-400 rounded"></div>
                <div className="w-6 h-2 bg-orange-400 rounded"></div>
                <div className="w-8 h-2 bg-white rounded"></div>
            </div>
            <div className="flex space-x-1">
                <div className="w-8 h-2 bg-cyan-400 rounded"></div>
                <div className="w-12 h-2 bg-orange-400 rounded"></div>
                <div className="w-6 h-2 bg-white rounded"></div>
            </div>
            <div className="flex space-x-1">
                <div className="w-14 h-2 bg-cyan-400 rounded"></div>
                <div className="w-4 h-2 bg-orange-400 rounded"></div>
            </div>
            <div className="flex space-x-1">
                <div className="w-10 h-2 bg-cyan-400 rounded"></div>
                <div className="w-8 h-2 bg-orange-400 rounded"></div>
                <div className="w-6 h-2 bg-white rounded"></div>
            </div>
            <div className="flex space-x-1">
                <div className="w-16 h-2 bg-cyan-400 rounded"></div>
                <div className="w-4 h-2 bg-orange-400 rounded"></div>
            </div>
        </div>

        {/* Circular chart */}
        <div className="absolute left-6 bottom-8">
            <div className="w-8 h-8 rounded-full border-4 border-purple-400 relative">
                <div className="absolute top-0 left-0 w-4 h-4 bg-orange-400 rounded-full transform -translate-x-1 -translate-y-1"></div>
            </div>
        </div>

        {/* Character */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-b from-pink-400 to-pink-500 rounded-full relative">
                    <div className="absolute top-2 left-3 w-10 h-6 bg-white rounded-full flex items-center justify-center">
                        <div className="flex space-x-1">
                            <div className="w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
                            <div className="w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
                        </div>
                    </div>
                    <div className="absolute top-8 left-5 w-6 h-3 bg-pink-600 rounded-full"></div>
                </div>
                <div className="w-20 h-12 bg-gradient-to-b from-orange-400 to-orange-500 rounded-t-full mt-1"></div>
                <div className="w-24 h-10 bg-cyan-400 rounded-lg mt-1 relative overflow-hidden">
                    <div className="absolute bottom-1 right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <span className="text-xs text-gray-800 font-bold">×</span>
                    </div>
                </div>
            </div>
        </div>

        {/* CSS panel */}
        <div className="absolute top-12 right-6 bg-gray-800 rounded p-2 text-xs">
            <div className="text-cyan-300 mb-1">CSS</div>
            <div className="space-y-1">
                <div className="w-12 h-1.5 bg-blue-400 rounded"></div>
                <div className="w-8 h-1.5 bg-orange-400 rounded"></div>
                <div className="w-14 h-1.5 bg-white rounded"></div>
            </div>
        </div>

        {/* Right side code blocks */}
        <div className="absolute right-4 top-16 space-y-1">
            <div className="flex space-x-1">
                <div className="w-10 h-2 bg-blue-400 rounded"></div>
                <div className="w-6 h-2 bg-orange-400 rounded"></div>
            </div>
            <div className="flex space-x-1">
                <div className="w-8 h-2 bg-blue-400 rounded"></div>
                <div className="w-8 h-2 bg-orange-400 rounded"></div>
            </div>
            <div className="flex space-x-1">
                <div className="w-12 h-2 bg-blue-400 rounded"></div>
                <div className="w-4 h-2 bg-orange-400 rounded"></div>
            </div>
        </div>

        {/* Bottom right elements */}
        <div className="absolute bottom-4 right-6">
            <div className="text-lg text-yellow-400">{'</>'}</div>
        </div>

        {/* Floating elements */}
        <div className="absolute bottom-6 left-16 w-4 h-4 bg-green-400 rounded transform rotate-45"></div>
        <div className="absolute top-20 right-12 w-3 h-3 bg-pink-400 rounded-full"></div>

        {/* Charts on right */}
        <div className="absolute right-8 bottom-12 space-y-1">
            <div className="w-1 h-4 bg-orange-400"></div>
            <div className="w-1 h-6 bg-pink-400"></div>
            <div className="w-1 h-3 bg-blue-400"></div>
        </div>
    </div>
    );

return (
    <div className="bg-white min-h-screen">
        {/* Blue header bar */}

        <div className="flex max-w-6xl mx-auto">
            {/* Left Sidebar */}
            <div className="w-80 p-6">
                <div className="border rounded p-4 mb-6">
                    <h2 className="font-bold text-lg mb-4">Kelas X</h2>
                    <div className="mb-6">
                        <h3 className="font-semibold mb-3 text-sm">Materi Yang Diberikan :</h3>
                        <div className="space-y-2 text-sm">
                            <div className="cursor-pointer hover:bg-gray-50 p-1">Naratif</div>
                            <div className="cursor-pointer hover:bg-gray-50 p-1">Argumentatif</div>
                            <div className="cursor-pointer hover:bg-gray-50 p-1">Eksposisi</div>
                        </div>
                    </div>
                </div>

                <div className="border border-gray-300 rounded p-4">
                    <h3 className="font-bold text-base mb-4">Teks Naratif</h3>
                    <div className="mb-4">
                        <h4 className="font-semibold text-sm mb-2">Struktur teks Narasi</h4>
                        <div className="space-y-3 text-xs">
                            <div>
                                <div className="font-semibold mb-1">Orientasi</div>
                                <div className="text-gray-700 leading-relaxed">
                                    Bagian ini memperkenalkan tokoh, latar (waktu dan tempat), serta suasana awal cerita. Biasanya para pembaca memahami situasi awal tokoh utama.
                                </div>
                            </div>
                            <div>
                                <div className="font-semibold mb-1">Komplikasi (Masalah atau Konflik)</div>
                                <div className="text-gray-700 leading-relaxed">
                                    Bagian ini memperkenalkan tokoh, latar (waktu dan tempat), serta suasana awal cerita.
                                </div>
                            </div>
                            <div>
                                <div className="font-semibold mb-1">Resolusi</div>
                                <div className="text-gray-700 leading-relaxed">
                                    Bagian ini akan memberikan solusi dan menunjukkan bahwa sudah berakhir
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mt-6">
                        <div className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center">
                            <BookOpen className="w-4 h-4 text-gray-500" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-2">Materi Bahasa Indonesia</h1>
                <p className="text-gray-600 mb-6 text-sm">Mengidentifikasi informasi terkait dalam teks naratif</p>
                <div className="border border-gray-300 rounded p-6">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold mb-2">Teks Naratif</h2>
                        <p className="text-gray-600 text-sm mb-4">Mengidentifikasi informasi</p>

                        <div className="mb-6">
                            <WebDevelopingIllustration />
                        </div>

                        <div className="space-y-4 text-sm leading-relaxed">
                            <div>
                                <h3 className="font-bold mb-2">Pengertian Teks Naratif</h3>
                                <p className="text-gray-800 mb-3">
                                    Teks naratif adalah jenis teks yang menceritakan suatu peristiwa atau rangkaian kejadian secara kronologis dengan tujuan menghibur, menyampaikan pengalaman, atau memberikan pesan moral kepada pembaca. Pembaca dapat memahami alur cerita: tokoh, konflik, dan latar; disusun secara berurutan dari awal hingga akhir.
                                </p>
                                <p className="text-gray-800">
                                    serta menggunakan bahasa yang imajinatif atau deskriptif. Struktur teks naratif terdiri dari orientasi (pengenalan tokoh dan latar), komplikasi (munculnya masalah), dan resolusi (penyelesaian masalah). Contoh teks naratif dapat ditemukan dalam cerpen, dongeng, legenda, fabel, dan novel.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                        <button 
                            onClick={() => router.visit(`/`)}
                            className="px-6 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors">
                            Selesai
                        </button>
                        <button className="px-6 py-2 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50 transition-colors">
                            Sebelumnya
                        </button>
                        <button className="px-6 py-2 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50 transition-colors">
                            Lanjut Materi
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* ==== Card Materi ==== */}
        <div className="max-w-6xl mx-auto mt-16">
            <div className="flex flex-wrap justify-center gap-8 w-full mt-8">
                {materi
                    .filter((item) => item.mapel_id !== currentId) 
                    .slice(0, 3)
                    .map((item) => {
                        const mapelName =
                            mapel.find((m) => m.id === item.mapel_id)?.nama ?? "Mata Pelajaran";

                        return (
                            <div
                                key={item.id}
                                className="relative w-72 hover:cursor-pointer"
                                onMouseEnter={() => setHoveredCard(item.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                <div className="relative bg-white rounded-2xl p-6 shadow-lg overflow-hidden border border-gray-200">
                                    <div className="w-full">
                                        <img
                                            src={item.gambar || "/assets/img/iconrpl.png"}
                                            alt=""
                                            className="w-full h-40 object-cover rounded-t-2xl"
                                        />
                                        <div className="w-full bg-green-600 text-white text-center py-2 rounded-b-xl">
                                            KELAS {item.kelas}
                                        </div>
                                    </div>

                                    <div className="mt-4 text-gray-700 font-semibold text-sm">
                                        {mapelName}
                                    </div>

                                    {/* Tombol */}
                                    <div className="absolute bottom-4 left-4 flex space-x-2 z-30">
                                        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm">
                                            Tentang
                                        </button>
                                        <button 
                                            onClick={() => router.visit(`/materi/mapel/${item.mapel_id}`)}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
                                            Mulai Belajar
                                        </button>
                                    </div>

                                    {/* Hover Detail */}
                                    {hoveredCard === item.id && (
                                        <div className="absolute inset-0 bg-white rounded-2xl p-4 shadow-2xl z-20 pb-20">
                                            <h4 className="text-lg font-bold text-gray-800">{item.judul}</h4>
                                            <p className="text-sm text-gray-600 mt-1">
                                                Diposting: {new Date(item.created_at).toLocaleDateString()}
                                            </p>
                                            <div className="w-full border-t-2 border-gray-300 my-4 mx-auto"></div>
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