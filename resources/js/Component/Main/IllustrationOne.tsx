import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { LibraryBig, StickyNote, BookOpen } from 'lucide-react';

const IllustrationOne = () => {
  const Document = "/assets/json/document.json";

  return (
    <div className="bg-slate-800 rounded-3xl p-8 shadow-2xl transform transition-all duration-500 hover:scale-105 relative overflow-hidden flex justify-center items-center">
      <div className="w-96 h-64 relative">

        {/* Lottie */}
        <div className="absolute inset-0 flex justify-center items-center transform translate-x-2">
          <Player
            autoplay
            loop
            src={Document}
            style={{ height: "230px", width: "230px", objectFit: 'contain' }}
          />
        </div>

        {/* Floating icons  */}
        <div className="absolute top-6 left-6 bg-slate-700 rounded-md p-2 transform -rotate-[12deg] shadow-md">
          <LibraryBig className="w-5 h-5 text-purple-400" />
        </div>

        <div className="absolute top-4 right-6 bg-slate-700 rounded-md p-2 transform rotate-[15deg] animate-spin-slow shadow-md animate-pulse">
          <StickyNote className="w-5 h-5 text-yellow-400" />
        </div>

        <div className="absolute bottom-6 right-6 bg-slate-700 rounded-md p-2 transform rotate-[5deg] shadow-md animate-bounce">
          <BookOpen className="w-5 h-5 text-blue-400" />
        </div>

        <div className="absolute bottom-8 left-14 bg-slate-700 rounded-md p-2 transform -rotate-[20deg] shadow-md animate-pulse">
          <StickyNote className="w-5 h-5 text-pink-400" />
        </div>
      </div>
    </div>
  );
};

export default IllustrationOne;
