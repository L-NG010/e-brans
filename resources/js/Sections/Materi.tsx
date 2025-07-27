import { motion } from "framer-motion";
import { useState } from "react";

const Materi = () => {
  const [selected, setSelected] = useState("X");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const grades = ["X", "XI", "XII"];
  const student = "/assets/svg/student-icon.svg";
  const rpl = "/assets/img/iconrpl.png";

  const materiData = [
    {
      id: 1,
      kelas: "XII",
      jurusan: "Rekayasa Perangkat Lunak",
      title: "Program Flutter Membuat Aplikasi Sekolah",
      duration: "⏰ 3-7 Jam",
      learned: "⏳ 280 Siswa Telah Belajar",
      img: rpl,
      grade: "XII",
      description: {
        title: "Program Flutter Membuat Aplikasi Sekolah",
        duration: "3-7 Jam",
        lessons: "10 Pelajaran",
        created :"Nella Ayu Ambarwati S.T",
        materials: ["State Management", "API Integration", "Firebase Auth"],
      },
    },
    {
      id: 2,
      kelas: "XI",
      jurusan: "Rekayasa Perangkat Lunak",
      title: "Belajar UI/UX Dasar dengan Figma",
      duration: "⏰ 2-5 Jam",
      learned: "⏳ 150 Siswa Telah Belajar",
      img: rpl,
      grade: "XI",
      description: {
        title: "UI/UX Design",
        duration: "2-5 Jam",
        lessons: "8 Pelajaran",
        created :"Nella Ayu Ambarwati S.T",
        materials: ["Wireframe", "Prototype", "User Flow"],
      },
    },
  ];

  // Filter berdasarkan kelas
  const filteredMateri = materiData.filter((item) => item.grade === selected);

  return (
    <div className="relative flex flex-col items-center mt-20 px-4">
      {/* Garis */}
      <div className="w-1/2 border-t-2 border-gray-300 my-4 mx-auto"></div>

      {/* Selector Grade */}
      <div className="flex flex-col items-center w-full mt-16">
        <div className="flex items-center gap-4 mb-6 w-full max-w-md px-4">
          <img src={student} alt="ikon siswa" width={40} className="mr-2" />
          <div className="flex bg-blue-50 rounded-full p-1 w-full shadow-inner">
            {grades.map((grade) => (
              <button
                key={grade}
                onClick={() => setSelected(grade)}
                className={`flex-1 h-12 flex items-center justify-center rounded-full font-bold transition-all ${
                  selected === grade
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
      {/* <div className="flex flex-wrap justify-center gap-8 w-full max-w-6xl mt-8"> */}
        {filteredMateri.map((major) => (
          <div
            key={major.id}
            className="relative w-80"
            onMouseEnter={() => setHoveredCard(major.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <motion.div
              className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden z-0"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Isi Card */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-white bg-opacity-10 rounded-full"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white bg-opacity-5 rounded-full"></div>
              <div className="relative z-10 flex flex-col items-start text-left pl-4">
                <img src={major.img} alt=""  />
                <div className="w-full bg-green-600 text-white text-center py-2 mt-4">
                  KELAS {major.kelas}
                </div>
                <div className="text-black font-semibold text-sm">
                  {major.jurusan}
                </div>
                <div className="text-black font-semibold text-lg">
                  {major.title}
                </div>
                <div className="text-gray-500 text-sm mt-2">
                  {major.duration} {major.learned}
                </div>
                <div className="mt-4 flex space-x-2">
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded text-sm">
                    Tentang
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded text-sm">
                    Mulai Belajar
                  </button>
                </div>
              </div>

              {/* Hover Detail Menutupi Card */}
              {hoveredCard === major.id && (
                <motion.div
                  className="absolute inset-0 bg-white rounded-2xl p-4 shadow-2xl z-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="text-lg font-bold text-black">
                    {major.description.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {major.description.duration} | {major.description.lessons}
                  </p>
                  <h4 className="text-lg font-bold text-gray-600">
                    {major.description.created}
                  </h4>
                   <div className="w-full border-t-2 border-gray-300 my-4 mx-auto"></div>
                  <div className="mt-2">
                    <h5 className="text-sm font-semibold">
                      Materi Yang Diajarkan
                    </h5>
                    <ul className="text-sm text-gray-700 list-disc list-inside">
                      {major.description.materials.map((material, i) => (
                        <li key={i}>{material}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <button className="text-blue-500 hover:underline">
                      Tentang
                    </button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">
                      Mulai Belajar
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        ))}
      </div>
    // </div>
  );
};

export default Materi;
