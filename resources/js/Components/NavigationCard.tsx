import React, { useState  } from "react";

interface NavigationCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  route: string;
}
interface NavigationCardsProps {
  cards: NavigationCard[];
  onCardClick: (route: string) => void;
}


// Navigation Cards Component
const NavigationCards: React.FC<NavigationCardsProps> = ({ cards, onCardClick }) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-white to-green-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Navigate Your Hotel Operations
          </h3>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Access all essential management tools through our intuitive card-based navigation system
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 ${
                hoveredCard === card.id ? 'scale-105' : ''
              }`}
              onClick={() => onCardClick(card.route)}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 ${card.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>

              {/* Card Content */}
              <div className="relative p-6 md:p-8">
                <div className={`inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-xl ${card.gradient} mb-4 md:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {React.cloneElement(card.icon as React.ReactElement, {
                      size: window.innerWidth >= 768 ? 24 : 20
                    })}
                  </div>
                </div>

                <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3 group-hover:text-green-700 transition-colors">
                  {card.title}
                </h4>

                <p className="text-gray-600 text-sm md:text-base leading-relaxed group-hover:text-gray-700 transition-colors">
                  {card.description}
                </p>

                {/* Hover Arrow */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default NavigationCards
