import { useState } from "react";
import { User, Lock, Eye, EyeOff, X } from "lucide-react";

interface AuthPopupProps {
  isLoginMode: boolean;
  onClose: () => void;
  onSwitchMode: (mode: boolean) => void;
  onSubmit: (data: { username: string; password: string; confirmPassword: string }) => void;
}

export const AuthPopup = ({ isLoginMode, onClose, onSwitchMode, onSubmit }: AuthPopupProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [isAnimating, setIsAnimating] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  const switchMode = (mode: boolean) => {
    setIsAnimating(true);
    setTimeout(() => {
      onSwitchMode(mode);
      setIsAnimating(false);
      setShowPassword(false);
      setFormData({ username: "", password: "", confirmPassword: "" });
    }, 300);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-auto relative overflow-hidden p-6">
        <button
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
          onClick={onClose}
        >
          <X size={16} className="text-gray-600" />
        </button>

        <div className="px-4 pt-8 pb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {isLoginMode ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-gray-500 text-sm">
            {isLoginMode
              ? "Hi, we are waiting for your contributions"
              : "Join us to start your learning journey"}
          </p>
        </div>

        <div className="px-6 pb-8 relative min-h-80 h-auto">
          <div
            key={isLoginMode ? "login" : "signup"}
            className={`absolute inset-0 transition-none ${
              isLoginMode
                ? isAnimating
                  ? "slide-exit-login"
                  : "slide-enter-login"
                : isAnimating
                ? "slide-exit"
                : "slide-enter"
            }`}
          >
            <div className="space-y-6">
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                  <User size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-gray-700"
                  placeholder="Username"
                />
              </div>

              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                  <Lock size={20} className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-gray-700"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10"
                >
                  {showPassword ? (
                    <EyeOff size={20} className="text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye size={20} className="text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>

              {!isLoginMode && (
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                    <Lock size={20} className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-gray-700"
                    placeholder="Confirm Password"
                  />
                </div>
              )}

              <div className="flex flex-col gap-4">
                <button
                  onClick={handleSubmit}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors duration-200"
                >
                  {isLoginMode ? "Masuk" : "Daftar"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6 text-center">
          <p className="text-gray-600 text-sm">
            {isLoginMode ? "Belum punya akun?" : "Sudah punya akun?"}
            <button
              onClick={() => switchMode(!isLoginMode)}
              className="text-orange-500 hover:text-orange-600 font-medium underline transition-colors duration-200 ml-1"
            >
              {isLoginMode ? "Sign up" : "Login"}
            </button>
          </p>
        </div>

        <div className="h-2 bg-gradient-to-r from-orange-400 to-orange-600"></div>
      </div>
    </div>
  );
};
