import { Menu, X } from "lucide-react";

interface HeaderProps {
  onMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, isMobileMenuOpen }) => {
  return (
    <header className="relative z-50 bg-white/90 backdrop-blur-md border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg md:text-xl">S</span>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                Sakura Hotel
              </h1>
              <p className="text-xs md:text-sm text-gray-500 hidden sm:block">Premium Hospitality Management</p>
            </div>
          </div>

          <button
            onClick={onMenuToggle}
            className="md:hidden p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-all duration-200"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-green-600 font-medium transition-colors">
              Dashboard
            </a>
            <a href="#" className="text-gray-600 hover:text-green-600 font-medium transition-colors">
              Reports
            </a>
            <a href="#" className="text-gray-600 hover:text-green-600 font-medium transition-colors">
              Settings
            </a>
            <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl">
              Profile
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header
