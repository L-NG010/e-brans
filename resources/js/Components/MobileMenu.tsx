// Mobile Menu Component
const MobileMenu: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 md:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div className="absolute top-16 left-0 right-0 bg-white border-b border-green-100 shadow-lg">
        <nav className="px-4 py-6 space-y-4">
          <a href="#" className="block text-gray-600 hover:text-green-600 font-medium py-2 transition-colors">
            Dashboard
          </a>
          <a href="#" className="block text-gray-600 hover:text-green-600 font-medium py-2 transition-colors">
            Reports
          </a>
          <a href="#" className="block text-gray-600 hover:text-green-600 font-medium py-2 transition-colors">
            Settings
          </a>
          <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg">
            Profile
          </button>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu
