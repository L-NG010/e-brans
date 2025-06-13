interface FooterProps {
  className?: string;
}

// Footer Component
const Footer: React.FC<FooterProps> = ({ className = "" }) => {
  return (
    <footer className={`bg-gradient-to-r from-green-800 to-green-900 text-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold">Sakura Hotel</span>
            </div>
            <p className="text-green-100 leading-relaxed">
              Premium hotel management platform designed to my Mom.
            </p>
          </div>

          <div>
            <h5 className="font-semibold mb-4 text-lg">Quick Links</h5>
            <ul className="space-y-2 text-green-100">
              <li><a href="#" className="hover:text-white transition-colors">Room Management</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Revenue Reports</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Activity Logs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Future Planning</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-4 text-lg">Contact</h5>
            <ul className="space-y-2 text-green-100">
              <li>📧 support@lnatanegara</li>
              <li>📞 +62 812-3065-9954</li>
              <li>📍 Jl.Raya Ngantru, Kepanjen, Malang</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-100">
          <p>&copy; 2025 Sakura Hotel Management. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer
