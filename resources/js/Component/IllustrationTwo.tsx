import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { Database, Laptop, FolderCode, CodeXml } from 'lucide-react';

const IllustrationTwo = () => {
  const Programming = "/assets/json/programming.json";

  return (
    <div className="bg-slate-800 rounded-3xl p-8 shadow-2xl transform transition-all duration-500 hover:scale-105 relative overflow-hidden flex justify-center items-center">
      <div className="w-96 h-64 relative">
        {/* Lottie in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Player
            autoplay
            loop
            src={Programming}
            style={{ height: "70%", width: "70%" }}
          />
        </div>

        {/* Floating icons */}
        <div className="absolute bottom-4 left-14 bg-slate-700 rounded-md p-2 transform -rotate-3 animate-bounce">
          <Database className="w-4 h-4 text-green-400" />
        </div>

        <div className="absolute bottom-6 right-6 bg-slate-700 rounded-md p-2 transform rotate-[5deg] shadow-md animate-pulse">
          <CodeXml className="w-5 h-5 text-orange-400" />
        </div>

        <div className="absolute top-6 left-6 bg-slate-700 rounded-md p-2 transform -rotate-[12deg] shadow-md">
          <FolderCode className="w-5 h-5 text-purple-400" />
        </div>

        <div className="absolute top-8 right-14 bg-slate-700 rounded-md p-2 transform rotate-6 animate-pulse">
          <Laptop className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  );
};

export default IllustrationTwo;
