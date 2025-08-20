import { useState, useEffect, useCallback } from "react";
import { Search, ChevronDown, Code, Smartphone, HandCoins, User } from "lucide-react";
import { router } from "@inertiajs/react";
import { AuthPopup } from "../Component/AuthPopUp";

interface CourseItem {
  name: string;
  href: string;
  icon: any;
}

interface MenuItem {
  name: string;
  href: string;
}

interface DropdownMenuProps {
  isOpen: boolean;
  children: React.ReactNode;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

type DropdownType = "courses" | "certificate" | "task" | null;

const DropdownMenu = ({ isOpen, children, onMouseEnter, onMouseLeave }: DropdownMenuProps) => (
  <div
    className={`absolute bg-white shadow-lg rounded-lg mt-2 w-48 z-20 border border-gray-100 pt-1 pb-1 transition-all duration-200 ease-out ${
      isOpen
        ? "opacity-100 visible translate-y-0 scale-100"
        : "opacity-0 invisible -translate-y-1 scale-95"
    }`}
    style={{ transformOrigin: "top center", position: "absolute", top: "100%", left: "0" }}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <div className="py-1">{children}</div>
  </div>
);

export default function Header() {
  const logo = "/assets/img/smkbraka-icon.png";
  const [openDropdown, setOpenDropdown] = useState<DropdownType>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const courses: CourseItem[] = [
    { name: "Web Design", href: "#", icon: Code },
    { name: "Mobile", href: "#", icon: Smartphone },
    { name: "Marketing", href: "#", icon: HandCoins },
  ];

  const sertificate: MenuItem[] = [
    { name: "Praktik Kerja Lapangan", href: "#" },
    { name: "Lomba", href: "#" },
  ];

  const task: MenuItem[] = [
    { name: "Jurusan", href: "#" },
    { name: "Umum", href: "#" },
  ];

  const handleScroll = useCallback(() => {
    if (window.scrollY >= 100) {
      setIsScrolled(true);
      setShowSearch(false);
    } else {
      setIsScrolled(false);
    }
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    if (!isScrolled) {
      timeout = setTimeout(() => {
        setShowSearch(true);
      }, 300);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isScrolled]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const handleDropdownClick = (dropdownName: DropdownType) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const handleMouseEnter = (dropdownName: DropdownType) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setOpenDropdown(dropdownName);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    const timeout = setTimeout(() => {
      setOpenDropdown(null);
    }, 200);
    setHoverTimeout(timeout);
  };

  const handleDropdownHover = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      const target = event.target as Element;
      if (!target.closest(".dropdown-container")) {
        setOpenDropdown(null);
        if (hoverTimeout) {
          clearTimeout(hoverTimeout);
          setHoverTimeout(null);
        }
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [hoverTimeout]);

  const handlePopupToggle = (mode: boolean) => {
    setIsLoginMode(mode);
    setShowPopup(true);
    setIsExiting(false);
    document.body.classList.add("overflow-hidden");
  };

  const handleClosePopup = () => {
    setIsExiting(true);
    setTimeout(() => {
      setShowPopup(false);
      setIsExiting(false);
      document.body.classList.remove("overflow-hidden");
    }, 300);
  };

  const handleSubmit = (data: { username: string; password: string; confirmPassword: string }) => {
    console.log("Form submitted:", data);
    handleClosePopup();
  };

  const homePage = () => {
    router.visit('/');
  };

  return (
    <>
      <style>{`
        @keyframes modalEnter {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes modalExit {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to { opacity: 0; transform: translateY(40px) scale(0.95); }
        }
        @keyframes slideInFromRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInFromLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideOutToLeft {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(-30px); }
        }
        @keyframes slideOutToRight {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(30px); }
        }
        .modal-enter {
          animation: modalEnter 0.3s ease-out forwards;
        }
        .modal-exit {
          animation: modalExit 0.3s ease-in forwards;
        }
        .slide-enter {
          animation: slideInFromRight 0.3s ease-out forwards;
        }
        .slide-exit {
          animation: slideOutToLeft 0.3s ease-in forwards;
        }
        .slide-enter-login {
          animation: slideInFromLeft 0.3s ease-out forwards;
        }
        .slide-exit-login {
          animation: slideOutToRight 0.3s ease-in forwards;
        }
      `}</style>

      <header
        className={`bg-white/90 backdrop-blur-md px-6 flex items-center justify-center shadow-md fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
          isScrolled ? "py-2 h-16" : "py-4 h-24"
        }`}
      >
        <div
          className={`flex items-center w-full justify-between transition-all duration-300 ease-out ${
            isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <div className="flex items-center">
            <img
              src={logo}
              alt="logo sekolah"
              width={60}
              height={60}
              className="flex-shrink-0 hover:cursor-pointer"
              onClick={homePage}
            />
            <div className="ms-2 flex flex-col transition-all duration-300 ease-out overflow-hidden max-w-xs">
              <div className="text-xl font-extrabold text-[#465159] leading-none whitespace-nowrap">
                SMK BRAKA
              </div>
              <span className="text-[#888888] font-semibold leading-none max-h-5 mt-1 whitespace-nowrap">
                BRANTAS KARANGKATES
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 ms-8">
            <div
              className={`relative w-64 mr-8 transition-all duration-300 ease-out ${
                showSearch ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
              }`}
            >
              <input
                type="text"
                placeholder="Cari sesuatu..."
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 transition">
                <Search size={18} />
              </button>
            </div>
          </div>
        </div>

        <div
          className={`flex items-center gap-6 transition-all duration-300 ease-out ${
            isScrolled ? "absolute left-1/2 transform -translate-x-1/2" : ""
          }`}
        >
          <div className="relative dropdown-container">
            <button
              className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium text-sm whitespace-nowrap py-2 px-1"
              onClick={() => handleDropdownClick("courses")}
              onMouseEnter={() => handleMouseEnter("courses")}
              onMouseLeave={handleMouseLeave}
            >
              Telusuri Kursus
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ease-out ${
                  openDropdown === "courses" ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
            <DropdownMenu
              isOpen={openDropdown === "courses"}
              onMouseEnter={handleDropdownHover}
              onMouseLeave={handleMouseLeave}
            >
              {courses.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <a
                    key={index}
                    href={service.href}
                    className="px-4 py-2.5 text-sm hover:bg-blue-50 transition-colors duration-150 flex items-center"
                  >
                    <IconComponent size={16} />
                    <span className="ms-2">{service.name}</span>
                  </a>
                );
              })}
            </DropdownMenu>
          </div>

          <div className="relative dropdown-container">
            <button
              className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium text-sm whitespace-nowrap py-2 px-1"
              onClick={() => handleDropdownClick("certificate")}
              onMouseEnter={() => handleMouseEnter("certificate")}
              onMouseLeave={handleMouseLeave}
            >
              Klaim Sertifikat Anda
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ease-out ${
                  openDropdown === "certificate" ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
            <DropdownMenu
              isOpen={openDropdown === "certificate"}
              onMouseEnter={handleDropdownHover}
              onMouseLeave={handleMouseLeave}
            >
              {sertificate.map((service, index) => (
                <a
                  key={index}
                  href={service.href}
                  className="block px-4 py-2.5 text-sm hover:bg-blue-50 transition-colors duration-150"
                >
                  {service.name}
                </a>
              ))}
            </DropdownMenu>
          </div>

          <div className="relative dropdown-container">
            <button
              className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium text-sm whitespace-nowrap py-2 px-1"
              onClick={() => handleDropdownClick("task")}
              onMouseEnter={() => handleMouseEnter("task")}
              onMouseLeave={handleMouseLeave}
            >
              Temukan Tugas Anda
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ease-out ${
                  openDropdown === "task" ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
            <DropdownMenu
              isOpen={openDropdown === "task"}
              onMouseEnter={handleDropdownHover}
              onMouseLeave={handleMouseLeave}
            >
              {task.map((service, index) => (
                <a
                  key={index}
                  href={service.href}
                  className="block px-4 py-2.5 text-sm hover:bg-blue-50 transition-colors duration-150"
                >
                  {service.name}
                </a>
              ))}
            </DropdownMenu>
          </div>
        </div>

        <nav
          className={`flex gap-4 transition-all duration-300 ease-out ${
            isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <button
            className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200 text-sm whitespace-nowrap"
            onClick={() => {
              setIsLoginMode(true);
              setShowPopup(true);
            }}
          >
            Login
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-600 transition-colors duration-200 text-sm whitespace-nowrap"
            onClick={() => {
              setIsLoginMode(false);
              setShowPopup(true);
            }}
          >
            Signup
          </button>
        </nav>
      </header>

      {showPopup && (
        <AuthPopup
          isLoginMode={isLoginMode}
          onClose={handleClosePopup}
          onSwitchMode={setIsLoginMode}
          onSubmit={handleSubmit}
        />
      )}

      {isScrolled && (
        <div className="fixed bottom-10 right-10 flex flex-col items-center gap-3 z-50">
          <div
            className="w-14 h-14 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-200 shadow-lg"
            onClick={() => {
              setIsLoginMode(true);
              setShowPopup(true);
            }}
          >
            <User size={24} className="text-white" />
          </div>
          <div
            className="w-14 h-14 bg-gray-600 hover:bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-200 shadow-lg"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <ChevronDown size={24} className="text-white rotate-180" />
          </div>
        </div>
      )}
    </>
  );
}
