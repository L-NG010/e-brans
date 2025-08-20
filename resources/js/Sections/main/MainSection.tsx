import { Search } from "lucide-react";

const MainSection = () => {
    const manandwomantalking = "/assets/svg/manandwomantalk.svg";
    const smartphone = "/assets/svg/smartphone.svg";
    const book = "/assets/svg/book.svg";
    const light = "/assets/svg/light.svg";
    const light2 = "/assets/svg/light-2.svg";

    return (
        <div className="flex flex-col items-center min-h-screen relative">
            <div
                className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600"
                style={{
                    backgroundImage: `url('/assets/img/background-2.png')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundBlendMode: "overlay",
                    zIndex: -1,
                }}
            ></div>

            <div className="relative font-extrabold text-3xl text-white mt-20 text-center">CARI MATERI DENGAN MUDAH <br /> SEKARANG JUGA</div>

            <div className="absolute w-full max-w-xl bottom-1/2 mb-20 z-10">
                <div className="absolute transform translate-x-36 inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search size={18} className="text-white" />
                </div>
                <input
                    type="text"
                    placeholder="Apa Yang Ingin Kamu Pelajari"
                    className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-lg text-center placeholder:text-white bg-transparent shadow-sm"
                />
            </div>

            <div className="flex justify-between items-end w-full absolute bottom-20 z-0">
                <img
                    src={smartphone}
                    alt="gambar handphone"
                    width={300}
                    className="-ml-16"
                    data-aos="fade-right"
                    data-aos-offset="0"
                    data-aos-threshold="0.1"
                />
                <img
                    src={manandwomantalking}
                    alt="gambar objek"
                    width={650}
                    className="mx-auto"
                    data-aos="fade-up"
                    data-aos-offset="0"
                    data-aos-threshold="0.1"
                />
                <img
                    src={book}
                    alt="gambar buku"
                    width={380}
                    className="-mr-32"
                    data-aos="fade-left"
                    data-aos-offset="0"
                    data-aos-threshold="0.1"
                />
                <img
                    src={light2}
                    alt="gambar light kiri"
                    width={700}
                    className="absolute bottom-8 -left-36 z-0"
                    data-aos="fade-up"
                    data-aos-offset="0"
                    data-aos-threshold="0.1"
                />
                <img
                    src={light}
                    alt="gambar light kanan"
                    width={600}
                    className="absolute bottom-8 right-0 z-0"
                    data-aos="fade-up"
                    data-aos-offset="0"
                    data-aos-threshold="0.1"
                />
            </div>
        </div>
    );
};

export default MainSection;
