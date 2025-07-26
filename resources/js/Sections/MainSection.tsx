import { Search } from "lucide-react";
import { useState } from "react";

const MainSection = () => {
    const [selected, setSelected] = useState("X");
    const grades = ["X", "XI", "XII"];
    const manandwomantalking = "/assets/img/manadnwomantalking.png";
    const smartphone = "/assets/img/freepik--Smartphone--inject-10.png";
    const book = "/assets/img/freepik--files--inject-369.png";
    const student = "/assets/svg/student-icon.svg";

    return (
        <div className="flex flex-col items-center min-h-screen relative">
            {/* Section Grades dengan Icon Siswa */}
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
                                className={`flex-1 h-12 flex items-center justify-center rounded-full font-bold transition-all
                                ${
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

            {/* Search Bar - Tengah Layar */}
            <div className="relative w-full max-w-xl my-12 z-10">
                <div className="absolute transform translate-x-36 inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search size={18} className="text-gray-500" />
                </div>
                <input
                    type="text"
                    placeholder="Apa Yang Ingin Kamu Pelajari"
                    className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-lg text-center placeholder:text-gray-400 bg-white shadow-sm"
                />
            </div>

            {/* Tiga Gambar - Bawah Layar */}

            <div className="flex justify-between items-end w-full absolute bottom-20 -z-10 " data-aos="fade-down-right">
                <img
                    src={smartphone}
                    alt="gambar handphone"
                    width={300}
                    className="-ml-16"
                />
                <img
                    src={manandwomantalking}
                    alt="gambar objek"
                    width={450}
                    className="mx-auto"
                />
                <img
                    src={book}
                    alt="gambar buku"
                    width={380}
                    className="-mr-32"
                />
            </div>
        </div>
    );
};

export default MainSection;
