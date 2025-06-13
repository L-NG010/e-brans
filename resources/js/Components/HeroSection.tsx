interface HeroSectionProps {
    className?: string;
}

// Hero Section Component
const HeroSection: React.FC<HeroSectionProps> = ({ className = "" }) => {
    return (
        <section
            className={`relative overflow-hidden bg-gradient-to-br from-white via-green-50 to-white ${className}`}
        >
            {/* Paint Splash Background */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-10 left-10 w-32 h-32 md:w-64 md:h-64 bg-gradient-to-br from-green-300 to-green-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-24 h-24 md:w-48 md:h-48 bg-gradient-to-tl from-green-200 to-green-400 rounded-full blur-2xl"></div>
                <div className="absolute top-1/2 left-1/3 w-16 h-16 md:w-32 md:h-32 bg-gradient-to-r from-green-400 to-green-300 rounded-full blur-xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <div className="text-center">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-800 via-green-700 to-gray-800 bg-clip-text text-transparent leading-tight">
                        Welcome to Sakura Hotel
                        <br />
                        <span className="text-2xl md:text-4xl lg:text-5xl">
                            Management Hub
                        </span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                        Streamline your hotel operations. Monitor rooms, track
                        revenue, manage activities, and plan for the future—all
                        in one place.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            Get Started
                        </button>
                        <button className="w-full sm:w-auto border border-green-500 text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-50 transition-all duration-300">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection
