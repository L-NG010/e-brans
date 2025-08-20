import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { FileDigit, Lightbulb } from 'lucide-react';

const IllustrationThree = () => {
  const Learning = "/assets/json/learning-1.json";

  return (
    <div className="bg-slate-800 rounded-3xl p-8 shadow-2xl transform transition-all duration-500 hover:scale-105 relative overflow-hidden flex justify-center items-center">
      <div className="w-96 h-64 relative">
        {/* Lottie */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Player
            autoplay
            loop
            src={Learning}
            style={{ height: "80%", width: "80%" }}
          />
        </div>

        {/* Floating icons */}
        <div className="absolute bottom-4 left-4 bg-slate-700 rounded-md p-2 transform -rotate-3 animate-bounce">
          <FileDigit className="w-4 h-4 text-red-400" />
        </div>

        <div className="absolute top-4 right-6 bg-slate-700 rounded-md p-2 transform rotate-6 animate-pulse">
          <Lightbulb className="w-4 h-4 text-yellow-400" />
        </div>
      </div>
    </div>
  );
};

export default IllustrationThree;
