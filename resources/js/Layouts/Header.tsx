import { useState, useEffect, ReactNode, useCallback } from "react";
import {
    Search,
    ChevronDown,
    Code,
    Smartphone,
    HandCoins,
    LucideIcon,
} from "lucide-react";
import { div } from "framer-motion/client";


// Types (tetap sama)
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
    // State baru untuk melacak scroll
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

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

    // --- Logika Scroll Handler ---
    const handleScroll = useCallback(() => {
        if (window.scrollY >= 100) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll]);

    // Handle click toggle (tetap sama)
    const handleDropdownClick = (dropdownName: DropdownType): void => {
        setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
    };

    // Handle mouse enter with delay (tetap sama)
    const handleMouseEnter = (dropdownName: DropdownType): void => {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
        }
        setOpenDropdown(dropdownName);
    };

    // Handle mouse leave with delay (tetap sama)
    const handleMouseLeave = (): void => {
        const timeout = setTimeout(() => {
            setOpenDropdown(null);
        }, 300);
        setHoverTimeout(timeout);
    };

    // Handle dropdown content hover (prevent closing) (tetap sama)
    const handleDropdownHover = (): void => {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
            setHoverTimeout(null);
        }
    };

    // Close dropdown when clicking outside (tetap sama)
    useEffect(() => {
        const handleClickOutside = (event: Event): void => {
            const target = event.target as Element;
            if (!target.closest(".dropdown-container")) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const DropdownMenu = ({
        isOpen,
        children,
        onMouseEnter,
        onMouseLeave,
    }: DropdownMenuProps): JSX.Element => (
        <div
            className={`absolute bg-white shadow-lg rounded-lg mt-2 w-48 z-10 border border-gray-100 pt-1 pb-1 transition-all duration-200 ${isOpen
                ? "opacity-100 visible translate-y-0"
                : "opacity-0 invisible -translate-y-2"
                }`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="py-1">{children}</div>
        </div>
    );

    return (
        <>
            {/* Modifikasi class header untuk collapse, blur, dan animasi */}
            <header
                className={`bg-white/90 backdrop-blur-md px-6 flex items-center justify-between shadow-md fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isScrolled
                    ? "py-2 h-16" // State collapsed
                    : "py-4 h-24" // State normal
                    }`}
            >

                {/* Logo dan teks */}
                <div className="flex items-center">
                    {/* Logo tetap ukuran penuh */}
                    <img
                        src={logo}
                        alt="logo sekolah"
                        width={60}
                        height={60}
                        className="flex-shrink-0"
                    />

                    {/* Kontainer untuk teks yang akan di-collapse */}
                    <div
                        className={`ms-2 flex flex-col transition-all duration-500 ease-in-out overflow-hidden ${isScrolled
                            ? "max-w-[120px] opacity-100" // Hanya tampilkan SMK BRAKA
                            : "max-w-xs opacity-100" // Tampilkan lengkap
                            }`}
                    >
                        {/* SMK BRAKA - selalu ada */}
                        <div className="text-xl  font-extrabold text-[#465159] leading-none whitespace-nowrap">
                            SMK BRAKA
                        </div>
                        {/* BRANTAS KARANGKATES - hilang saat collapsed */}
                        <span
                            className={`text-[#888888] font-semibold leading-none transition-all duration-500 ease-in-out whitespace-nowrap ${isScrolled
                                ? "max-h-0 opacity-0 mt-0" // Hilang dan tidak ambil ruang
                                : "max-h-5 opacity-100 mt-1" // Muncul dengan sedikit margin
                                }`}
                        >
                            BRANTAS KARANGKATES
                        </span>
                    </div>

                    {/* Bagian menu dan search - akan hilang saat collapsed */}
                    <div
                        className={`ms-8 flex items-center gap-4 transition-all duration-500 ease-in-out ${isScrolled
                            ? "opacity-0 w-0 overflow-hidden ml-0"
                            : "opacity-100 w-auto ml-8"
                            }`}
                    >
                        <div className="relative w-64">
                            <input
                                type="text"
                                placeholder="Cari sesuatu..."
                                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                            />
                            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 transition">
                                <Search size={18} />
                            </button>
                        </div>
                        <div className="flex items-center gap-4">
                            {/* Dropdown menus (Telusuri Kursus, dll.) - Kode tetap sama, hanya dibungkus dalam div yang collapsible */}
                            <div className="relative dropdown-container">
                                <button
                                    className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition font-medium text-sm whitespace-nowrap"
                                    onClick={() =>
                                        handleDropdownClick("courses")
                                    }
                                    onMouseEnter={() =>
                                        handleMouseEnter("courses")
                                    }
                                    onMouseLeave={handleMouseLeave}
                                >
                                    Telusuri Kursus
                                    <ChevronDown
                                        size={16}
                                        className={`transition-transform duration-200 ${openDropdown === "courses"
                                            ? "rotate-180"
                                            : ""
                                            }`}
                                    />
                                </button>
                                <DropdownMenu
                                    isOpen={openDropdown === "courses"}
                                    onMouseEnter={handleDropdownHover}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    {courses.map(
                                        (
                                            service: CourseItem,
                                            index: number
                                        ) => (
                                            <a
                                                key={index}
                                                href={service.href}
                                                className="px-4 py-2 text-sm hover:bg-blue-50 transition flex items-center"
                                            >
                                                <service.icon size={16} />
                                                <span className="ms-2">
                                                    {service.name}
                                                </span>
                                            </a>
                                        )
                                    )}
                                </DropdownMenu>
                            </div>
                            <div className="relative dropdown-container">
                                <button
                                    className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition font-medium text-sm whitespace-nowrap"
                                    onClick={() =>
                                        handleDropdownClick("certificate")
                                    }
                                    onMouseEnter={() =>
                                        handleMouseEnter("certificate")
                                    }
                                    onMouseLeave={handleMouseLeave}
                                >
                                    Klaim Sertifikat Anda
                                    <ChevronDown
                                        size={16}
                                        className={`transition-transform duration-200 ${openDropdown === "certificate"
                                            ? "rotate-180"
                                            : ""
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
                                                className="block px-4 py-2 text-sm hover:bg-blue-50 transition"
                                            >
                                                {service.name}
                                            </a>
                                        )
                                    )}
                                </DropdownMenu>
                            </div>
                            <div className="relative dropdown-container">
                                <button
                                    className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition font-medium text-sm whitespace-nowrap"
                                    onClick={() => handleDropdownClick("task")}
                                    onMouseEnter={() =>
                                        handleMouseEnter("task")
                                    }
                                    onMouseLeave={handleMouseLeave}
                                >
                                    Temukan Tugas Anda
                                    <ChevronDown
                                        size={16}
                                        className={`transition-transform duration-200 ${openDropdown === "task"
                                            ? "rotate-180"
                                            : ""
                                            }`}
                                    />
                                </button>
                                <DropdownMenu
                                    isOpen={openDropdown === "task"}
                                    onMouseEnter={handleDropdownHover}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    {task.map(
                                        (service: MenuItem, index: number) => (
                                            <a
                                                key={index}
                                                href={service.href}
                                                className="block px-4 py-2 text-sm hover:bg-blue-50 transition"
                                            >
                                                {service.name}
                                            </a>
                                        )
                                    )}
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bagian Login/Signup - akan mengecil saat collapsed */}
                <nav
                    className={`flex gap-2 md:gap-4 transition-all duration-500 ease-in-out ${isScrolled ? "scale-90" : "scale-100"
                        }`}
                >
                    <button className="bg-white text-blue-600 px-3 py-1.5 md:px-4 md:py-2 rounded-md font-medium hover:bg-gray-100 transition text-sm whitespace-nowrap">
                        Login
                    </button>
                    <button className="bg-blue-500 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-md font-medium hover:bg-blue-600 transition text-sm whitespace-nowrap">
                        Signup
                    </button>
                </nav>
            </header>

            {isScrolled && (
                <div className="fixed bottom-10 right-10 flex flex-col items-center gap-3 z-50">
                    <img
                        src={LoginIcon}
                        alt="Login"
                        width={55}
                        className="cursor-pointer shadow-md hover:scale-110 transition-transform"
                    />
                    <img
                        src={ScrollToTop}
                        alt="Scroll to top"
                        width={55}
                        className="cursor-pointer shadow-md hover:scale-110 transition-transform"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    />
                </div>
            )}
        </>
    );
}
