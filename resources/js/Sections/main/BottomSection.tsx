  import { useState } from "react";

  export default function BottomSection() {
    const allTags = [
      // RPL (Hijau)
      { label: 'Pemrograman Dasar', color: 'border-green-400 text-green-500' },
      { label: 'Basis Data', color: 'border-green-400 text-green-500' },
      { label: 'Web Development', color: 'border-green-400 text-green-500' },
      { label: 'Mobile Development', color: 'border-green-400 text-green-500' },

      // DKV (Hijau)
      { label: 'Desain Grafis', color: 'border-green-400 text-green-500' },
      { label: 'Fotografi', color: 'border-green-400 text-green-500' },
      { label: 'Videografi', color: 'border-green-400 text-green-500' },
      { label: 'Animasi', color: 'border-green-400 text-green-500' },

      // Permesinan (Biru)
      { label: 'Gambar Teknik', color: 'border-blue-400 text-blue-500' },
      { label: 'CNC', color: 'border-blue-400 text-blue-500' },
      { label: 'Mesin Bubut', color: 'border-blue-400 text-blue-500' },
      { label: 'Las', color: 'border-blue-400 text-blue-500' },

      // Otomotif (Merah)
      { label: 'Teknologi Motor', color: 'border-red-400 text-red-500' },
      { label: 'Teknologi Mobil', color: 'border-red-400 text-red-500' },
      { label: 'Chassis dan Suspensi', color: 'border-red-400 text-red-500' },
      { label: 'Kelistrikan Kendaraan', color: 'border-red-400 text-red-500' },

      // Kelistrikan (Oranye)
      { label: 'Dasar Kelistrikan', color: 'border-orange-400 text-orange-500' },
      { label: 'Pemasangan Instalasi', color: 'border-orange-400 text-orange-500' },
      { label: 'Elektronika Dasar', color: 'border-orange-400 text-orange-500' },
      { label: 'PLC', color: 'border-orange-400 text-orange-500' },

      // Tataboga (Hitam)
      { label: 'Pengolahan Makanan', color: 'border-gray-800 text-gray-900' },
      { label: 'Pastry dan Bakery', color: 'border-gray-800 text-gray-900' },
      { label: 'Gizi dan Hidangan', color: 'border-gray-800 text-gray-900' },
      { label: 'Manajemen Dapur', color: 'border-gray-800 text-gray-900' },

      // Busana (Ungu)
      { label: 'Dasar Menjahit', color: 'border-purple-400 text-purple-500' },
      { label: 'Desain Busana', color: 'border-purple-400 text-purple-500' },
      { label: 'Tekstil', color: 'border-purple-400 text-purple-500' },
      { label: 'Pola dan Konstruksi', color: 'border-purple-400 text-purple-500' },
    ];

    const [page, setPage] = useState(0);
    const itemsPerPage = 8; // 3 baris × 4 item per baris

    const totalPages = Math.ceil(allTags.length / itemsPerPage);

    const handlePrev = () => {
      if (page > 0) setPage(page - 1);
    };

    const handleNext = () => {
      if (page < totalPages - 1) setPage(page + 1);
    };

    const visibleTags = allTags.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

    return (
      <div className="text-center py-12 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Pencarian Cepat, Mungkin Anda Tertarik.
        </h2>
        <p className="text-sm md:text-base text-gray-500 mt-2">
          Mari kita tingkatkan kecerdasan anak bangsa dengan memanfaatkan teknologi yang ada.
        </p>

        <div className="flex justify-center items-center mt-6 gap-4">
          {/* Tombol kiri */}
          <div className="flex-shrink-0">
            <button
              onClick={handlePrev}
              disabled={page === 0}
              className="w-16 h-16 border  rounded-full flex items-center justify-center disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="82" height="82" viewBox="0 0 82 82" fill="none">
                <circle cx="41" cy="41" r="40.5" transform="matrix(-1 0 0 1 82 0)" stroke="black" />
                <path d="M39.0324 41.0002L46.5764 33.4562L44.2804 31.1602L34.4404 41.0002L44.2804 50.8402L46.5764 48.5442L39.0324 41.0002Z" fill="black" />
              </svg>
            </button>
          </div>

          {/* Tag yang tampil */}
          <div className="flex-1 flex flex-wrap justify-center gap-3 max-w-3xl">
            {visibleTags.map((tag, index) => (
              <span
                key={index}
                className={`px-4 py-2 rounded-full border hover:cursor-pointer ${tag.color || 'border-gray-300 text-gray-700'
                  } text-sm`}
              >
                {tag.label}
              </span>
            ))}
          </div>

          {/* Tombol kanan */}
          <div className="flex-shrink-0">
            <button
              onClick={handleNext}
              disabled={page === totalPages - 1}
              className="w-16 h-16 border  rounded-full flex items-center justify-center disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="82" height="82" viewBox="0 0 82 82" fill="none">
                <circle cx="41" cy="41" r="40.5" stroke="black" />
                <path d="M42.9676 41.0002L35.4236 33.4562L37.7196 31.1602L47.5596 41.0002L37.7196 50.8402L35.4236 48.5442L42.9676 41.0002Z" fill="black" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }
