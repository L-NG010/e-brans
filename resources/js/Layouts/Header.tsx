import { useState, useEffect, ReactNode, useCallback } from "react";
import {
    Search,
    ChevronDown,
    Code,
    Smartphone,
    HandCoins,
    User,
    Lock,
    Eye,
    EyeOff,
    X,
} from "lucide-react";
import { router, usePage } from "@inertiajs/react";

// Types
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
    children: ReactNode;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

type DropdownType = "courses" | "certificate" | "task" | null;

export default function Header(): JSX.Element {
    const logo: string = "/assets/img/smkbraka-icon.png";
    const [openDropdown, setOpenDropdown] = useState<DropdownType>(null);
    const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(
        null
    );
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [showSearch, setShowSearch] = useState<boolean>(true);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [isLoginMode, setIsLoginMode] = useState<boolean>(true);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isExiting, setIsExiting] = useState<boolean>(false);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });

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

    // Scroll Handler
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

    // Handle dropdown dan mouse events
    const handleDropdownClick = (dropdownName: DropdownType): void => {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
            setHoverTimeout(null);
        }
        setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
    };

    const handleMouseEnter = (dropdownName: DropdownType): void => {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
            setHoverTimeout(null);
        }
        setOpenDropdown(dropdownName);
    };

    const handleMouseLeave = (): void => {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
        }
        const timeout = setTimeout(() => {
            setOpenDropdown(null);
        }, 200);
        setHoverTimeout(timeout);
    };

    const handleDropdownHover = (): void => {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
            setHoverTimeout(null);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: Event): void => {
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

    useEffect(() => {
        return () => {
            if (hoverTimeout) {
                clearTimeout(hoverTimeout);
            }
        };
    }, [hoverTimeout]);

    // Toggle popup dan mode
    const handlePopupToggle = (mode: boolean) => {
        setIsLoginMode(mode);
        setShowPopup(true);
        setIsExiting(false);
        setFormData({ username: "", password: "", confirmPassword: "" });
        setShowPassword(false);
        document.body.classList.add("overflow-hidden"); // Mencegah scroll saat popup aktif
    };

    const handleClosePopup = () => {
        setIsExiting(true);
        setTimeout(() => {
            setShowPopup(false);
            setIsExiting(false);
            setFormData({ username: "", password: "", confirmPassword: "" });
            setShowPassword(false);
            document.body.classList.remove("overflow-hidden"); // Mengembalikan scroll saat popup ditutup
        }, 300);
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = () => {
        console.log("Form submitted:", formData);
        handleClosePopup();
    };

    // Ganti mode dengan animasi
    const switchMode = (mode: boolean) => {
        setIsAnimating(true);
        setTimeout(() => {
            setIsLoginMode(mode);
            setIsAnimating(false);
            setShowPassword(false);
            setFormData({ username: "", password: "", confirmPassword: "" });
        }, 300);
    };

    // halaman beranda
    const homePage = () => {
        router.visit('/');
    }

    const {url} = usePage();

    const DropdownMenu = ({
        isOpen,
        children,
        onMouseEnter,
        onMouseLeave,
    }: DropdownMenuProps): JSX.Element => (
        <div
            className={`absolute bg-white shadow-lg rounded-lg mt-2 w-48 z-20 border border-gray-100 pt-1 pb-1 transition-all duration-200 ease-out ${isOpen
                ? "opacity-100 visible translate-y-0 scale-100"
                : "opacity-0 invisible -translate-y-1 scale-95"
                }`}
            style={{
                transformOrigin: "top center",
                position: "absolute",
                top: "100%",
                left: "0",
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="py-1">{children}</div>
        </div>
    );

    return (
        <>
            {/* Animasi Modal dan Slide */}
            <style>{`
                @keyframes modalEnter {
                    from {
                        opacity: 0;
                        transform: translateY(40px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                @keyframes modalExit {
                    from {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                    to {
                        opacity: 0;
                        transform: translateY(40px) scale(0.95);
                    }
                }
                @keyframes slideInFromRight {
                    from {
                        opacity: 0;
                        transform: translateX(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                @keyframes slideInFromLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                @keyframes slideOutToLeft {
                    from {
                        opacity: 1;
                        transform: translateX(0);
                    }
                    to {
                        opacity: 0;
                        transform: translateX(-30px);
                    }
                }
                @keyframes slideOutToRight {
                    from {
                        opacity: 1;
                        transform: translateX(0);
                    }
                    to {
                        opacity: 0;
                        transform: translateX(30px);
                    }
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
                className={`bg-white/90 backdrop-blur-md px-6 flex items-center justify-center shadow-md fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${isScrolled ? "py-2 h-16" : "py-4 h-24"
                    }`}
            >
                {/* Logo, teks, dan search */}
                <div
                    className={`flex items-center w-full justify-between transition-all duration-300 ease-out ${isScrolled
                        ? "opacity-0 pointer-events-none"
                        : "opacity-100"
                        }`}
                >
                    <div className="flex items-center">
                        <img
                            src={logo}
                            alt="logo sekolah"
                            width={60}
                            height={60}
                            className="flex-shrink-0"
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
                            className={`relative w-64 mr-8 transition-all duration-300 ease-out ${showSearch
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 translate-x-4"
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

                {/* Navigasi dropdown */}
                <div
                    className={`flex items-center gap-6 transition-all duration-300 ease-out ${isScrolled
                        ? "absolute left-1/2 transform -translate-x-1/2"
                        : ""
                        }`}
                >
                    {url !== '/' && (
                        <button
                            className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium text-sm whitespace-nowrap py-2 px-1"
                            onClick={homePage}
                        >
                            Beranda
                        </button>
                    )}
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
                                className={`transition-transform duration-200 ease-out ${openDropdown === "courses"
                                    ? "rotate-180"
                                    : "rotate-0"
                                    }`}
                            />
                        </button>
                        <DropdownMenu
                            isOpen={openDropdown === "courses"}
                            onMouseEnter={handleDropdownHover}
                            onMouseLeave={handleMouseLeave}
                        >
                            {courses.map(
                                (service: CourseItem, index: number) => {
                                    const IconComponent = service.icon;
                                    return (
                                        <a
                                            key={index}
                                            href={service.href}
                                            className="px-4 py-2.5 text-sm hover:bg-blue-50 transition-colors duration-150 flex items-center"
                                        >
                                            <IconComponent size={16} />
                                            <span className="ms-2">
                                                {service.name}
                                            </span>
                                        </a>
                                    );
                                }
                            )}
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
                                className={`transition-transform duration-200 ease-out ${openDropdown === "certificate"
                                    ? "rotate-180"
                                    : "rotate-0"
                                    }`}
                            />
                        </button>
                        <DropdownMenu
                            isOpen={openDropdown === "certificate"}
                            onMouseEnter={handleDropdownHover}
                            onMouseLeave={handleMouseLeave}
                        >
                            {sertificate.map(
                                (service: MenuItem, index: number) => (
                                    <a
                                        key={index}
                                        href={service.href}
                                        className="block px-4 py-2.5 text-sm hover:bg-blue-50 transition-colors duration-150"
                                    >
                                        {service.name}
                                    </a>
                                )
                            )}
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
                                className={`transition-transform duration-200 ease-out ${openDropdown === "task"
                                    ? "rotate-180"
                                    : "rotate-0"
                                    }`}
                            />
                        </button>
                        <DropdownMenu
                            isOpen={openDropdown === "task"}
                            onMouseEnter={handleDropdownHover}
                            onMouseLeave={handleMouseLeave}
                        >
                            {task.map((service: MenuItem, index: number) => (
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

                {/* Login/Signup - hilang saat di-scroll */}
                <nav
                    className={`flex gap-4 transition-all duration-300 ease-out ${
                        isScrolled
                            ? "opacity-0 pointer-events-none"
                            : "opacity-100"
                    }`}
                >
                    <button
                        className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200 text-sm whitespace-nowrap"
                        onClick={() => handlePopupToggle(true)}
                    >
                        Login
                    </button>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-600 transition-colors duration-200 text-sm whitespace-nowrap"
                        onClick={() => handlePopupToggle(false)}
                    >
                        Signup
                    </button>
                </nav>
            </header>

            {/* Popup Login/Signup dengan Animasi Slide */}
            {showPopup && (
                <div
                    className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6 transition-opacity duration-300 ${
                        isExiting ? "opacity-0" : "opacity-100"
                    }`}
                    onClick={handleClosePopup}
                >
                    <div
                        className={`bg-white rounded-3xl shadow-2xl w-full max-w-md mx-auto relative overflow-hidden p-6 ${
                            isExiting ? "modal-exit" : "modal-enter"
                        }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-4 z-10 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
                            onClick={handleClosePopup}
                        >
                            <X size={16} className="text-gray-600" />
                        </button>

                        {/* Header */}
                        <div className="px-4 pt-8 pb-6 text-center">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                {isLoginMode
                                    ? "Welcome Back"
                                    : "Create Account"}
                            </h2>
                            <p className="text-gray-500 text-sm">
                                {isLoginMode
                                    ? "Hi, we are waiting for your contributions"
                                    : "Join us to start your learning journey"}
                            </p>
                        </div>

                        {/* Form dengan Animasi Slide */}
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
                                    {/* Username */}
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                                            <User
                                                size={20}
                                                className="text-gray-400"
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            value={formData.username}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "username",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-gray-700"
                                            placeholder="Username"
                                        />
                                    </div>

                                    {/* Password */}
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                                            <Lock
                                                size={20}
                                                className="text-gray-400"
                                            />
                                        </div>
                                        <input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={formData.password}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-gray-700"
                                            placeholder="Password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10"
                                        >
                                            {showPassword ? (
                                                <EyeOff
                                                    size={20}
                                                    className="text-gray-400 hover:text-gray-600"
                                                />
                                            ) : (
                                                <Eye
                                                    size={20}
                                                    className="text-gray-400 hover:text-gray-600"
                                                />
                                            )}
                                        </button>
                                    </div>

                                    {/* Confirm Password (Signup only) */}
                                    {!isLoginMode && (
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                                                <Lock
                                                    size={20}
                                                    className="text-gray-400"
                                                />
                                            </div>
                                            <input
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                value={formData.confirmPassword}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        "confirmPassword",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-gray-700"
                                                placeholder="Confirm Password"
                                            />
                                        </div>
                                    )}

                                    {/* Submit Button */}
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

                        {/* Toggle Mode */}
                        <div className="px-6 pb-6 text-center">
                            <p className="text-gray-600 text-sm">
                                {isLoginMode
                                    ? "Belum punya akun?"
                                    : "Sudah punya akun?"}
                                <button
                                    onClick={() => switchMode(!isLoginMode)}
                                    className="text-orange-500 hover:text-orange-600 font-medium underline transition-colors duration-200 ml-1"
                                >
                                    {isLoginMode ? "Sign up" : "Login"}
                                </button>
                            </p>
                        </div>

                        {/* Decorative Bottom */}
                        <div className="h-2 bg-gradient-to-r from-orange-400 to-orange-600"></div>
                    </div>
                </div>
            )}

            {/* Floating Buttons saat scroll */}
            {isScrolled && (
                <div className="fixed bottom-10 right-10 flex flex-col items-center gap-3 z-50">
                    <div
                        className="w-14 h-14 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-200 shadow-lg"
                        onClick={() => handlePopupToggle(true)}
                    >
                        <User size={24} className="text-white" />
                    </div>
                    <div
                        className="w-14 h-14 bg-gray-600 hover:bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-200 shadow-lg"
                        onClick={() =>
                            window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                    >
                        <ChevronDown
                            size={24}
                            className="text-white rotate-180"
                        />
                    </div>
                </div>
            )}
        </>
    );
}
