import { motion } from "framer-motion";
import { useState } from "react";

const Materi = () => {
  const [selected, setSelected] = useState("X");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const grades = ["X", "XI", "XII"];
  const student = "/assets/svg/student-icon.svg";
  const rpl = "/assets/img/iconrpl.png";

  const materiData = [
    // Kelas X
    {
      id: 1,
      kelas: "X",
      jurusan: "Rekayasa Perangkat Lunak",
      title: "Dasar-Dasar Pemrograman Web",
      duration: "⏰ 2-4 Jam",
      learned: "⏳ 320 Siswa Telah Belajar",
      img: rpl,
      grade: "X",
      description: {
        title: "Dasar-Dasar Pemrograman Web",
        duration: "2-4 Jam",
        lessons: "6 Pelajaran",
        created: "Budi Santoso S.Kom",
        materials: ["HTML Dasar", "CSS Styling", "JavaScript Intro"],
      },
    },
    {
      id: 2,
      kelas: "X",
      jurusan: "Rekayasa Perangkat Lunak",
      title: "Pengenalan Algoritma dan Struktur Data",
      duration: "⏰ 3-5 Jam",
      learned: "⏳ 285 Siswa Telah Belajar",
      img: rpl,
      grade: "X",
      description: {
        title: "Algoritma dan Struktur Data",
        duration: "3-5 Jam",
        lessons: "8 Pelajaran",
        created: "Sari Wijaya S.T",
        materials: ["Flowchart", "Pseudocode", "Array & Loop"],
      },
    },
    {
      id: 3,
      kelas: "X",
      jurusan: "Rekayasa Perangkat Lunak",
      title: "Dasar Database dan MySQL (PHPMyAdmin)",
      duration: "⏰ 2-3 Jam",
      learned: "⏳ 195 Siswa Telah Belajar",
      img: rpl,
      grade: "X",
      description: {
        title: "Database dan MySQL",
        duration: "2-3 Jam",
        lessons: "5 Pelajaran",
        created: "Ahmad Fauzi S.Kom",
        materials: ["ERD", "SQL Query", "Database Design"],
      },
    },
    // Kelas XI
    {
      id: 4,
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
        created: "Nella Ayu Ambarwati S.T",
        materials: ["Wireframe", "Prototype", "User Flow"],
      },
    },
    {
      id: 5,
      kelas: "XI",
      jurusan: "Rekayasa Perangkat Lunak",
      title: "Framework Laravel untuk Web Development",
      duration: "⏰ 4-6 Jam",
      learned: "⏳ 210 Siswa Telah Belajar",
      img: rpl,
      grade: "XI",
      description: {
        title: "Laravel Framework",
        duration: "4-6 Jam",
        lessons: "12 Pelajaran",
        created: "Rina Kartika S.Kom",
        materials: ["MVC Pattern", "Eloquent ORM", "Blade Template"],
      },
    },
    {
      id: 6,
      kelas: "XI",
      jurusan: "Rekayasa Perangkat Lunak",
      title: "Version Control dengan Git dan GitHub",
      duration: "⏰ 1-3 Jam",
      learned: "⏳ 175 Siswa Telah Belajar",
      img: rpl,
      grade: "XI",
      description: {
        title: "Git dan GitHub",
        duration: "1-3 Jam",
        lessons: "4 Pelajaran",
        created: "Dedi Kurniawan S.T",
        materials: ["Git Commands", "Branching", "Collaboration"],
      },
    },
    // Kelas XII
    {
      id: 7,
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
        created: "Nella Ayu Ambarwati S.T",
        materials: ["State Management", "API Integration", "Firebase Auth"],
      },
    },
    {
      id: 8,
      kelas: "XII",
      jurusan: "Rekayasa Perangkat Lunak",
      title: "DevOps dan Deployment Aplikasi Web",
      duration: "⏰ 4-8 Jam",
      learned: "⏳ 95 Siswa Telah Belajar",
      img: rpl,
      grade: "XII",
      description: {
        title: "DevOps dan Deployment",
        duration: "4-8 Jam",
        lessons: "15 Pelajaran",
        created: "Agus Setiawan S.T",
        materials: ["Docker", "CI/CD Pipeline", "Cloud Hosting"],
      },
    },
    {
      id: 9,
      kelas: "XII",
      jurusan: "Rekayasa Perangkat Lunak",
      title: "Proyek Akhir: Sistem Informasi Sekolah",
      duration: "⏰ 5-10 Jam",
      learned: "⏳ 120 Siswa Telah Belajar",
      img: rpl,
      grade: "XII",
      description: {
        title: "Proyek Akhir",
        duration: "5-10 Jam",
        lessons: "20 Pelajaran",
        created: "Tim Pengajar RPL",
        materials: ["Full Stack Development", "Testing", "Documentation"],
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
      <div className="flex flex-wrap justify-center gap-8 w-full max-w-6xl mt-8 ">
        {filteredMateri.map((major) => (
          <div
            key={major.id}
            className="relative w-80 mt-10 hover:cursor-pointer"
            onMouseEnter={() => setHoveredCard(major.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <motion.div
  className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden z-0 border border-gray-200"
  whileHover={{ scale: 1.05, y: -5 }}
  whileTap={{ scale: 0.95 }}
>
  {/* Background hiasan */}
  <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-100 rounded-full"></div>
  <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-50 rounded-full"></div>

  {/* Konten Utama */}
  <div className="relative z-10 flex flex-col items-start text-left pl-4 pb-20">
    <img src={major.img} alt="" />
    <div className="w-full bg-green-600 text-white text-center py-2 mt-4">
      KELAS {major.kelas}
    </div>
    <div className="text-gray-700 font-semibold text-sm">
      {major.jurusan}
    </div>
    <div className="text-gray-800 font-semibold text-lg">
      {major.title}
    </div>
    <div className="text-gray-500 text-sm mt-2">
      {major.duration} {major.learned}
    </div>
  </div>

  {/* Tombol tetap di bawah */}
  <div className="absolute bottom-4 left-4 flex space-x-2 z-30">
    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded text-sm">
      Tentang
    </button>
    <button className="px-4 py-2 bg-blue-600 text-white rounded text-sm">
      Mulai Belajar
    </button>
  </div>

  {/* Hover Detail */}
  {hoveredCard === major.id && (
    <motion.div
      className="absolute inset-0 bg-white rounded-2xl p-4 shadow-2xl z-20 pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h4 className="text-lg font-bold text-gray-800">
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
        <h5 className="text-sm font-semibold">Materi Yang Diajarkan</h5>
        <ul className="text-sm text-gray-700 list-disc list-inside">
          {major.description.materials.map((material, i) => (
            <li key={i}>{material}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  )}
</motion.div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Materi;
