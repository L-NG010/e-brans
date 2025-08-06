import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import IllustrationOne from '@/Component/IllustrationOne';
import IllustrationTwo from '@/Component/IllustrationTwo';
import IllustrationThree from '@/Component/IllustrationThree';

const FirstSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "KUMPULAN MATERI PELAJARAN SMK BRANTAS KARANGKATES",
      description: "Website ini menyediakan seluruh materi yang ada pada setiap jurusan dan kelas yang ada di SMK Brantas Karangkates",
      buttonText: "Lanjutkan",
      illustration: <IllustrationOne />
    },
    {
      title: "BELAJAR PROGRAMMING DENGAN MUDAH",
      description: "Akses materi pemrograman lengkap dari dasar hingga advanced untuk semua jurusan IT di SMK Brantas Karangkates",
      buttonText: "Mulai Belajar",
      illustration: <IllustrationTwo />
    },
    {
      title: "MATERI DIGITAL TERLENGKAP",
      description: "Dapatkan akses ke ribuan materi digital, video pembelajaran, dan latihan soal untuk semua mata pelajaran",
      buttonText: "Jelajahi",
      illustration: <IllustrationThree />
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };
  const goToSlide = (index: React.SetStateAction<number>) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background with pattern */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600"
        style={{
          backgroundImage: `url('/assets/img/background-1.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white border-opacity-20 rounded-full"></div>
        <div className="absolute top-20 left-20 w-16 h-16 border border-white border-opacity-30 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border-2 border-white border-opacity-20 rounded-full"></div>
        <div className="absolute bottom-32 right-32 w-12 h-12 border border-white border-opacity-30 rounded-full"></div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 flex items-center justify-between h-full max-w-7xl mx-auto px-20">
        {/* Left content */}
        <div className="flex-1 max-w-xl ms-14">
          <div className="transform transition-all duration-500 ease-in-out">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {slides[currentSlide].title}
            </h1>
            <p className="text-white text-lg mb-8 leading-relaxed opacity-90">
              {slides[currentSlide].description}
            </p>
            <button className="border border-white text-white px-16 py-4 rounded-full font-extrabold text-xl hover:bg-orange-500 hover:bg-opacity-30 transition-all duration-300 transform">
              {slides[currentSlide].buttonText}
            </button>
          </div>
        </div>

        {/* Right illustration and dots */}
        <div className="flex-1 relative flex justify-center items-center ">
          <div className="w-[500px] h-[350px]">
            {slides[currentSlide].illustration}
          </div>
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? 'bg-white scale-125'
                    : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300 z-20"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300 z-20"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default FirstSection;
