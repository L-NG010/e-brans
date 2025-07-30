import { useState, useEffect, ReactNode, useCallback } from "react";
import { Search, ChevronDown, Code, Smartphone, HandCoins, LucideIcon } from "lucide-react";

// Types
interface CourseItem {
    name: string;
    href: string;
    icon: LucideIcon;
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
    const LoginIcon = "/assets/svg/login-icon.svg";
    const ScrollToTop = "/assets/svg/scroll-to-top.svg";
    const logo: string = "/assets/img/smkbraka-icon.png";
    const [openDropdown, setOpenDropdown] = useState<DropdownType>(null);
    const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(
        null
    );
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [showSearch, setShowSearch] = useState<boolean>(true);
    const [showLoginPopup, setShowLoginPopup] = useState<boolean>(false);

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

    // Logika Scroll Handler
    const handleScroll = useCallback(() => {
        if (window.scrollY >= 100) {
            setIsScrolled(true);
            setShowSearch(false);
        } else {
            setIsScrolled(false);
        }
    }, []);

    // Efek untuk menunda munculnya search bar saat kembali ke atas
    useEffect(() => {
        let timeout: NodeJS.Timeout | null = null;
        if (!isScrolled) {
            timeout = setTimeout(() => {
                setShowSearch(true);
            }, 300); // Kurangi delay
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

    // Handle click toggle
    const handleDropdownClick = (dropdownName: DropdownType): void => {
        // Clear any existing timeout
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
            setHoverTimeout(null);
        }
        setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
    };

    // Handle mouse enter - langsung buka tanpa delay
    const handleMouseEnter = (dropdownName: DropdownType): void => {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
            setHoverTimeout(null);
        }
        setOpenDropdown(dropdownName);
    };

    // Handle mouse leave dengan delay yang lebih pendek
    const handleMouseLeave = (): void => {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
        }
        const timeout = setTimeout(() => {
            setOpenDropdown(null);
        }, 200); // Kurangi delay ke 200ms
        setHoverTimeout(timeout);
    };

    // Handle dropdown content hover - batalkan close timeout
    const handleDropdownHover = (): void => {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
            setHoverTimeout(null);
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: Event): void => {
            const target = event.target as Element;
            if (!target.closest(".dropdown-container")) {
                setOpenDropdown(null);
                // Clear timeout juga
                if (hoverTimeout) {
                    clearTimeout(hoverTimeout);
                    setHoverTimeout(null);
                }
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [hoverTimeout]);

    // Clean up timeout on unmount
    useEffect(() => {
        return () => {
            if (hoverTimeout) {
                clearTimeout(hoverTimeout);
            }
        };
    }, [hoverTimeout]);

    // Toggle login popup
    const handleLoginClick = () => {
        setShowLoginPopup(!showLoginPopup);
    };

    const DropdownMenu = ({
        isOpen,
        children,
        onMouseEnter,
        onMouseLeave,
    }: DropdownMenuProps): JSX.Element => (
        <div
            className={`absolute bg-white shadow-lg rounded-lg mt-2 w-48 z-20 border border-gray-100 pt-1 pb-1 transition-all duration-200 ease-out ${
                isOpen
                    ? "opacity-100 visible translate-y-0 scale-100"
                    : "opacity-0 invisible -translate-y-1 scale-95"
            }`}
            style={{
                transformOrigin: "top center",
                // Pastikan dropdown tidak bergeser
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
            <header
                className={`bg-white/90 backdrop-blur-md px-6 flex items-center justify-center shadow-md fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
                    isScrolled ? "py-2 h-16" : "py-4 h-24"
                }`}
            >
                {/* Logo, teks, dan search - hilang saat di-scroll */}
                <div
                    className={`flex items-center w-full justify-between transition-all duration-300 ease-out ${
                        isScrolled
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
                            className={`relative w-64 mr-8 transition-all duration-300 ease-out ${
                                showSearch
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

                {/* Navigasi dropdown - selalu terlihat dan di tengah saat di-scroll */}
                <div
                    className={`flex items-center gap-6 transition-all duration-300 ease-out ${
                        isScrolled
                            ? "absolute left-1/2 transform -translate-x-1/2"
                            : ""
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
                                    openDropdown === "courses"
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
                                            className="px-4 py-2.5 text-sm hover:bg-blue-50 transition-colors duration-150 flex items-center "
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
                                className={`transition-transform duration-200 ease-out ${
                                    openDropdown === "certificate"
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
                                className={`transition-transform duration-200 ease-out ${
                                    openDropdown === "task"
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
                    className={`flex gap-2 md:gap-4 transition-all duration-300 ease-out ${
                        isScrolled
                            ? "opacity-0 pointer-events-none"
                            : "opacity-100"
                    }`}
                >
                    <button
                        className="bg-white text-blue-600 px-3 py-1.5 md:px-4 md:py-2 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200 text-sm whitespace-nowrap"
                        onClick={handleLoginClick}
                    >
                        Login
                    </button>
                    <button className="bg-blue-500 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-md font-medium hover:bg-blue-600 transition-colors duration-200 text-sm whitespace-nowrap">
                        Signup
                    </button>
                </nav>
            </header>

            {/* Login Popup */}
            {showLoginPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-80 transform transition-transform duration-300 scale-100">
                        <h2 className="text-xl font-bold text-blue-600 mb-4">
                            Welcome
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 px-3 py-2 border"
                                    placeholder="Email"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 px-3 py-2 border"
                                    placeholder="Username"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 px-3 py-2 border"
                                    placeholder="Password"
                                />
                            </div>
                            <button className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors duration-200">
                                Buat Akun
                            </button>
                            <p className="text-center text-orange-500 text-sm mt-2">
                                Sudah Punya Akun? Login
                            </p>
                        </div>
                        <button
                            className="mt-4 text-gray-500 hover:text-gray-700 absolute top-2 right-2 text-xl font-bold w-8 h-8 flex items-center justify-center"
                            onClick={handleLoginClick}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

            {isScrolled && (
                <div className="fixed bottom-10 right-10 flex flex-col items-center gap-3 z-50">
                    <div
                        className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200 shadow-lg"
                        onClick={handleLoginClick}
                    >
                        <img src={LoginIcon} alt="login icon" />
                    </div>
                    <div
                        className="w-14 h-14 bg-gray-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200 shadow-lg"
                        onClick={() =>
                            window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                    >
                        <img src={ScrollToTop} alt="Scroll To Up" />
                    </div>
                </div>
            )}
        </>
    );
}
