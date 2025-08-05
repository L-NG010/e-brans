import { router } from "@inertiajs/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { MapelType } from "@/types/main/mapel";
import { MateriType } from "@/types/main/materi";

interface MateriProps {
    mapel: MapelType[];
    materi: MateriType[];
}

const Materi = ({ mapel, materi }: MateriProps) => {
    const [selected, setSelected] = useState("X");
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    const grades = ["X", "XI", "XII"];
    const student = "/assets/svg/student-icon.svg";
    const rpl = "/assets/img/iconrpl.png";
    // console.log(mapel.map((item) => item.nama));
    // console.log(materi)


    const filteredMateri = materi.filter((item) => item.kelas === selected);

    return (
        <div className="relative flex flex-col items-center mt-20 px-4">
            {/* Garis */}
            {/* <ul>
                {materi.map((item) => (
                    <li key={item.id}>{item.judul}</li>
                ))}
            </ul> */}
            <div className="w-1/2 border-t-2 border-gray-300 my-4 mx-auto"></div>

            {/* Selector Grade */}
            <div className="flex flex-col items-center w-full mt-16">
                <div className="flex items-center gap-4 mb-6 w-full max-w-md px-4">
                    <img
                        src={student}
                        alt="ikon siswa"
                        width={40}
                        className="mr-2"
                    />
                    <div className="flex bg-blue-50 rounded-full p-1 w-full shadow-inner">
                        {grades.map((grade) => (
                            <button
                                key={grade}
                                onClick={() => setSelected(grade)}
                                className={`flex-1 h-12 flex items-center justify-center rounded-full font-bold ${selected === grade
                                        ? "bg-blue-600 text-white shadow-md"
                                        : "text-blue-800 hover:bg-blue-100"
                                    }`}
                            >
                                {grade}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Kartu Materi */}
            <div className="flex flex-wrap justify-center gap-8 w-full max-w-6xl mt-8 ">
                {filteredMateri.map((item) => {
                    const mapelName =
                        mapel.find((m) => m.id === item.mapel_id)?.nama ??
                        "Mata Pelajaran";

                    return (
                        <div
                            key={item.id}
                            className="relative w-80 mt-10 hover:cursor-pointer"
                            onMouseEnter={() => setHoveredCard(item.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <motion.div className="relative bg-white rounded-2xl p-6 shadow-lg overflow-hidden z-0 border border-gray-200">
                                {/* Gambar (jika ada) */}
                                <div className="w-full">
                                    <img
                                        src={item.gambar || rpl}
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
                                {/* <div className="text-gray-800 font-semibold text-lg">
          {item.judul}
        </div> */}

                                {/* Tombol tetap di bawah */}
                                <div className="absolute bottom-4 left-4 flex space-x-2 z-30">
                                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm">
                                        Tentang
                                    </button>
                                    <button
                                        onClick={() => router.visit(`/materi/mapel/${item.mapel_id}`)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
                                    >
                                        Mulai Belajar
                                    </button>
                                </div>

                                {/* Hover Detail */}
                                {hoveredCard === item.id && (
                                    <motion.div className="absolute inset-0 bg-white rounded-2xl p-4 shadow-2xl z-20 pb-20">
                                        <h4 className="text-lg font-bold text-gray-800">
                                            {item.judul}
                                        </h4>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Diposting:{" "}
                                            {new Date(
                                                item.created_at
                                            ).toLocaleDateString()}
                                        </p>
                                        <div className="w-full border-t-2 border-gray-300 my-4 mx-auto"></div>
                                        {/* <div className="mt-2">
              <h5 className="text-sm font-semibold">Konten Materi</h5>
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {item.konten.slice(0, 200)}...
              </p>
            </div> */}
                                    </motion.div>
                                )}
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Materi;
