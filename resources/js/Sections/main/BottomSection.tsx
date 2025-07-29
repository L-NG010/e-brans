export default function BottomSection() {
  const tags = [
    { label: 'Flutter Component' },
    { label: 'PHP' },
    { label: 'Pudding', color: 'border-blue-500 text-blue-700' },
    { label: 'Perawatan Sepeda', color: 'border-red-400 text-red-500' },
    { label: 'Figma', color: 'border-green-400 text-green-500' },
    { label: 'Jahit Baju' },
    { label: 'Pengertian AC', color: 'border-orange-300 text-orange-500' },
    { label: 'Cara Menjahit', color: 'border-pink-300 text-pink-500' },
  ];

  return (
    <div className="text-center py-12 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
        Pencarian Cepat, Mungkin Anda Tertarik.
      </h2>
      <p className="text-sm md:text-base text-gray-500 mt-2">
        Mari kita tingkatkan kecerdasan anak bangsa dengan memanfaatkan teknologi yang ada.
      </p>

      <div className="flex justify-center items-center mt-6 gap-4">
        <button className="w-10 h-10 border border-black rounded-full flex items-center justify-center">
          &#8592;
        </button>

        <div className="flex flex-wrap justify-center gap-3 max-w-2xl">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`px-4 py-2 rounded-full border hover:cursor-pointer ${
                tag.color || 'border-gray-300 text-gray-700'
              } text-sm`}
            >
              {tag.label}
            </span>
          ))}
        </div>

        <button className="w-10 h-10 border border-black rounded-full flex items-center justify-center">
          &#8594;
        </button>
      </div>
    </div>
  );
}
