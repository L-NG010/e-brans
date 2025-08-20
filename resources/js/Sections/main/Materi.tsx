import { useState } from "react";
import { router } from "@inertiajs/react";
import { Eye, X } from "lucide-react";
import { MapelType } from "@/types/Main/mapel";
import { MateriType } from "@/types/Main/materi";

interface MateriProps {
  mapel: MapelType[];
  materi: MateriType[];
}

const Materi = ({ mapel, materi }: MateriProps) => {
  const [selected, setSelected] = useState("X");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const grades = ["X", "XI", "XII"];
  const studentIcon = "/assets/svg/student-icon.svg";

  // Filter materi sesuai kelas
  const filteredMateri = materi.filter((item) => item.kelas === selected);

  return (
    <div className="flex flex-col items-center mt-20 px-4 sm:px-10 w-full bg-white">
      {/* Divider */}
      <div className="w-24 h-px bg-gray-300 mb-8"></div>

      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Materi Pembelajaran
        </h2>
        <p className="text-gray-600">
          Pilih kelas dan jelajahi materi yang tersedia
        </p>
      </div>

      {/* Grade Selector */}
      <div className="flex items-center gap-4 mb-12">
        <img src={studentIcon} alt="ikon siswa" width={40} height={40} />
        <div className="flex bg-gray-100 rounded-full p-1 shadow-sm">
          {grades.map((grade) => (
            <button
              key={grade}
              onClick={() => setSelected(grade)}
              className={`flex-1 h-12 flex items-center justify-center rounded-full font-semibold transition-all duration-300 px-6 ${
                selected === grade
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {grade}
            </button>
          ))}
        </div>
      </div>

      {/* Materi Cards */}
      {filteredMateri.length > 0 ? (
        <div className="w-full max-w-6xl">
          <div className={`grid gap-6 ${
            filteredMateri.length === 1
              ? 'grid-cols-1 max-w-sm mx-auto'
              : filteredMateri.length === 2
              ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {filteredMateri.map((item) => {
              const mapelName =
                mapel.find((m) => m.id === item.mapel_id)?.nama ??
                "Mata Pelajaran";

              return (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col"
                  style={{ height: '400px' }}
                  onMouseEnter={() => setHoveredCard(item.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {hoveredCard === item.id ? (
                    // Hover State - Show Rangkuman
                    <div className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex flex-col">
                      <div className="mb-4">
                        <span className="text-xs text-blue-600 uppercase tracking-wider font-semibold bg-blue-100 px-3 py-1 rounded-full">
                          Rangkuman
                        </span>
                      </div>

                      <h4 className="text-lg font-bold text-gray-900 mb-4 leading-tight">
                        {item.judul}
                      </h4>

                      <div className="flex-1 overflow-y-auto mb-6">
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {item.rangkuman || "Rangkuman belum tersedia untuk materi ini."}
                        </p>
                      </div>

                      <div className="flex space-x-3 mt-auto">
                        <button
                          onClick={() => setShowDetailModal(true)}
                          className="flex-1 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded hover:bg-gray-200 transition-colors"
                        >
                          Detail
                        </button>
                        <button
                          onClick={() =>
                            router.visit(`/materi/mapel/${item.mapel_id}`)
                          }
                          className="flex-1 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
                        >
                          Mulai Belajar
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Normal State
                    <>
                      {/* Thumbnail */}
                      <div className="relative h-48">
                        {item.gambar ? (
                          <img
                            src={item.gambar}
                            alt={item.judul}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <svg
                              className="w-12 h-12 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                              />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5 flex-1 flex flex-col">
                        <div className="mb-3">
                          <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                            {mapelName}
                          </span>
                        </div>

                        <h3 className="font-semibold text-gray-900 mb-4 leading-snug line-clamp-2">
                          {item.judul}
                        </h3>

                        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                          <span>
                            {new Date(item.created_at).toLocaleDateString("id-ID")}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye size={12} />
                            {item.jumlah_dilihat}
                          </span>
                        </div>

                        <div className="flex space-x-3 mt-auto">
                          <button
                            onClick={() => setShowDetailModal(true)}
                            className="flex-1 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded hover:bg-gray-200 transition-colors"
                          >
                            Detail
                          </button>
                          <button
                            onClick={() =>
                              router.visit(`/materi/mapel/${item.mapel_id}`)
                            }
                            className="flex-1 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
                          >
                            Mulai Belajar
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        // Empty state
        <div className="text-center py-16">
          <svg
            className="w-12 h-12 mx-auto text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-500 mb-1">
            Belum Ada Materi
          </h3>
          <p className="text-gray-400 text-sm">
            Materi untuk kelas {selected} akan segera tersedia
          </p>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Detail Materi</h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            <p className="text-gray-600 text-center py-8">
              Masih belum kepikiran buat apa
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Materi;
