import { Search } from "lucide-react";
import { useState } from "react";

const MainSection = () => {
    const manandwomantalking = "/assets/img/manadnwomantalking.png";
    const smartphone = "/assets/img/freepik--Smartphone--inject-10.png";
    const book = "/assets/img/freepik--files--inject-369.png";
    const student = "/assets/svg/student-icon.svg";

    return (
        <div className="flex flex-col items-center min-h-screen relative">
            <div className="flex flex-col items-center w-full mt-16">
                {/* Bagian grades dihapus */}
            </div>

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

            <div className="flex justify-between items-end w-full absolute bottom-20 -z-10">
                <img
                    src={smartphone}
                    alt="gambar handphone"
                    width={300}
                    className="-ml-16"
                    data-aos="fade-right"
                />
                <img
                    src={manandwomantalking}
                    alt="gambar objek"
                    width={450}
                    className="mx-auto"
                    data-aos="fade-up"
                />
                <img
                    src={book}
                    alt="gambar buku"
                    width={380}
                    className="-mr-32"
                    data-aos="fade-left"
                />
            </div>
        </div>
    );
};

export default MainSection;
