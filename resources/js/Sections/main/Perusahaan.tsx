import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const Perusahaan = () => {
  const images = [
    "assets/img/perusahaan/suzuki.png",
    "assets/img/perusahaan/pama.png",
    "assets/img/perusahaan/utschool.png",
    "assets/img/perusahaan/amman.png",
    "assets/img/perusahaan/ubig.png",
    "assets/img/perusahaan/alatbrat.png",
  ];

  const duplicatedImages = [...images,...images,...images,...images,...images,...images, ...images];

  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      x: "-50%",
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        },
      },
    });
  }, [controls]);

  return (
    <div className="relative flex flex-col items-center mt-20  py-16  bg-gray-100  min-h-[40vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B2441] text-center mb-10">
          Perusahaan Yang Sudah Bekerja Sama
        </h2>
      </motion.div>

      <div className="w-full max-w-full overflow-hidden">
        <motion.div
          className="flex items-center gap-12 px-6 py-4"
          animate={controls}
          style={{ display: "inline-flex", whiteSpace: "nowrap" }}
        >
          {duplicatedImages.map((src, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <img
                src={src}
                alt={`Logo perusahaan ${index + 1}`}
                className="h-20 md:h-24 object-contain"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Perusahaan;
