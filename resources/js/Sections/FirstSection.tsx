import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Code, Database, Globe, Settings, BookOpen, BarChart3 } from 'lucide-react';

const FirstSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "KUMPULAN MATERI PELAJARAN SMK BRANTAS KARANGKATES",
      description: "Website ini menyediakan seluruh materi yang ada pada setiap jurusan dan kelas yang ada di SMK Brantas Karangkates",
      buttonText: "Lanjutkan"
    },
    {
      title: "BELAJAR PROGRAMMING DENGAN MUDAH",
      description: "Akses materi pemrograman lengkap dari dasar hingga advanced untuk semua jurusan IT di SMK Brantas Karangkates",
      buttonText: "Mulai Belajar"
    },
    {
      title: "MATERI DIGITAL TERLENGKAP",
      description: "Dapatkan akses ke ribuan materi digital, video pembelajaran, dan latihan soal untuk semua mata pelajaran",
      buttonText: "Jelajahi"
    }
  ];

  // Auto slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
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
        {/* Decorative circles */}
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white border-opacity-20 rounded-full"></div>
        <div className="absolute top-20 left-20 w-16 h-16 border border-white border-opacity-30 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border-2 border-white border-opacity-20 rounded-full"></div>
        <div className="absolute bottom-32 right-32 w-12 h-12 border border-white border-opacity-30 rounded-full"></div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 flex items-center justify-between h-full max-w-7xl mx-auto px-8">

        {/* Left content */}
        <div className="flex-1 max-w-xl ms-14">
          <div className="transform transition-all duration-500 ease-in-out">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {slides[currentSlide].title}
            </h1>
            <p className="text-white text-lg mb-8 leading-relaxed opacity-90">
              {slides[currentSlide].description}
            </p>
            <button className="bg-white text-orange-500 px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
              {slides[currentSlide].buttonText}
            </button>
          </div>
        </div>

        {/* Right illustration */}
        <div className="flex-1 flex justify-center items-center">
          <div className="relative">
            {/* Main illustration container */}
            <div className="bg-slate-800 rounded-3xl p-8 shadow-2xl transform transition-all duration-500 hover:scale-105 relative overflow-hidden">
              <div className="w-96 h-64 relative">

                {/* Code windows */}
                <div className="absolute top-0 left-0 bg-slate-700 rounded-lg p-3 w-32 h-20 transform rotate-3">
                  <div className="flex items-center gap-1 mb-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="text-purple-400 text-xs">WEB DEVELOPING</div>
                  <Code className="w-4 h-4 text-blue-400 mt-1" />
                </div>

                <div className="absolute top-0 right-0 bg-slate-700 rounded-lg p-3 w-28 h-16 transform -rotate-2">
                  <div className="text-blue-400 text-xs font-bold">CSS</div>
                  <div className="w-full h-1 bg-pink-500 rounded mt-1"></div>
                  <div className="w-3/4 h-1 bg-blue-400 rounded mt-1"></div>
                </div>

                <div className="absolute top-12 right-8 bg-slate-700 rounded-lg p-3 w-24 h-14 transform rotate-1">
                  <div className="text-orange-400 text-xs font-bold">HTML</div>
                  <div className="text-gray-400 text-xs mt-1">&lt;/&gt;</div>
                </div>

                {/* Character */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                  <div className="relative">
                    {/* Character illustration */}
                    <div className="w-24 h-32 relative">
                      <img
                        src="iconrpl.png"
                        alt="RPL Character"
                        className="w-full h-full object-contain"
                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                          // If image fails to load, show a fallback character
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const nextSibling = target.nextSibling as HTMLElement;
                          if (nextSibling) {
                            nextSibling.style.display = 'block';
                          }
                        }}
                      />
                      {/* Fallback character */}
                      <div className="w-full h-full bg-orange-500 rounded-t-full hidden items-end justify-center pb-2">
                        <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-full mr-1"></div>
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                      </div>
                    </div>

                    {/* Laptop */}
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-10 bg-gray-300 rounded-t-lg">
                      <div className="w-full h-6 bg-slate-900 rounded-t-lg flex items-center justify-center">
                        <div className="w-8 h-3 bg-blue-400 rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating icons */}
                <div className="absolute bottom-4 left-4 bg-slate-600 rounded-lg p-2 transform -rotate-3 animate-bounce">
                  <Database className="w-4 h-4 text-green-400" />
                </div>

                <div className="absolute bottom-8 right-4 bg-slate-600 rounded-lg p-2 transform rotate-2 animate-pulse">
                  <Settings className="w-4 h-4 text-yellow-400" />
                </div>

                <div className="absolute bottom-16 left-8 bg-slate-600 rounded-lg p-2 transform rotate-1">
                  <BarChart3 className="w-4 h-4 text-purple-400" />
                </div>

                {/* Books */}
                <div className="absolute bottom-0 right-0 flex gap-1">
                  <div className="w-3 h-8 bg-red-500 rounded-t transform rotate-12"></div>
                  <div className="w-3 h-6 bg-blue-500 rounded-t transform rotate-6"></div>
                  <div className="w-3 h-7 bg-green-500 rounded-t"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation dots - positioned below the illustration */}
      <div className="absolute bottom-36 right-80 mr-2 flex gap-3 z-20 transform translate-x-12">
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
