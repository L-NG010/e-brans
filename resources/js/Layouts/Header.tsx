import { useState, useEffect, ReactNode, useCallback } from "react";
import {
    Search,
    ChevronDown,
    Code,
    Smartphone,
    HandCoins,
    LucideIcon,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

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
    const [showButtons, setShowButtons] = useState<boolean>(false);
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

    // Debounce function
    const debounce = (func: Function, wait: number) => {
        let timeout: NodeJS.Timeout;
        return (...args: any[]) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    };

    // Inisialisasi AOS
    useEffect(() => {
        AOS.init({
            duration: 600,
            easing: "ease-in-out",
            once: false,
            anchorPlacement: "bottom-bottom",
        });
        AOS.refresh();
    }, []);

    // Logika Scroll Handler
    const handleScroll = useCallback(
        debounce(() => {
            const scrolled = window.scrollY >= 100;
            setIsScrolled(scrolled);
            setShowButtons(scrolled);
        }, 100),
        []
    );

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll]);

    // Handle click toggle
    const handleDropdownClick = (dropdownName: DropdownType): void => {
        setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
    };

    // Handle mouse enter with delay
    const handleMouseEnter = (dropdownName: DropdownType): void => {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
        }
        setOpenDropdown(dropdownName);
    };

    // Handle mouse leave with delay
    const handleMouseLeave = (): void => {
        const timeout = setTimeout(() => {
            setOpenDropdown(null);
        }, 300);
        setHoverTimeout(timeout);
    };

    // Handle dropdown content hover
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
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

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
            className={`absolute bg-white shadow-lg rounded-lg mt-2 w-48 z-10 border border-gray-100 pt-1 pb-1 transition-all duration-200 ${
                isOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2"
            }`}
            data-aos={isOpen ? "fade-down" : ""}
            data-aos-duration="200"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="py-1">{children}</div>
        </div>
    );

    return (
        <>
            <header
                className={`bg-white/90 backdrop-blur-md px-6 flex items-center justify-between shadow-md fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
                    isScrolled ? "py-2 h-16" : "py-4 h-24"
                }`}
            >
                <div className="flex items-center">
                    <img
                        src={logo}
                        alt="logo sekolah"
                        width={60}
                        height={60}
                        className="flex-shrink-0"
                        onError={() =>
                            console.error("Error loading logo image")
                        }
                    />
                    <div
                        className={`ms-2 flex flex-col transition-all duration-500 ease-in-out overflow-hidden ${
                            isScrolled
                                ? "max-w-[120px] opacity-100"
                                : "max-w-xs opacity-100"
                        }`}
                    >
                        <div className="text-xl font-extrabold text-[#465159] leading-none whitespace-nowrap">
                            SMK BRAKA
                        </div>
                        <span
                            className={`text-[#888888] font-semibold leading-none transition-all duration-500 ease-in-out whitespace-nowrap ${
                                isScrolled
                                    ? "max-h-0 opacity-0 mt-0"
                                    : "max-h-5 opacity-100 mt-1"
                            }`}
                        >
                            BRANTAS KARANGKATES
                        </span>
                    </div>
                    <div
                        className={`ms-8 flex items-center gap-4 transition-all duration-500 ease-in-out ${
                            isScrolled
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
                                        className={`transition-transform duration-200 ${
                                            openDropdown === "courses"
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
                                        className={`transition-transform duration-200 ${
                                            openDropdown === "certificate"
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
                                        className={`transition-transform duration-200 ${
                                            openDropdown === "task"
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
                <nav
                    className={`flex gap-2 md:gap-4 transition-all duration-500 ease-in-out ${
                        isScrolled ? "scale-90" : "scale-100"
                    }`}
                >
                    <button
                        className="bg-white text-blue-600 px-3 py-1.5 md:px-4 md:py-2 rounded-md font-medium hover:bg-gray-100 transition text-sm whitespace-nowrap"
                        onClick={handleLoginClick}
                    >
                        Login
                    </button>
                    <button className="bg-blue-500 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-md font-medium hover:bg-blue-600 transition text-sm whitespace-nowrap">
                        Signup
                    </button>
                </nav>
            </header>

            {showLoginPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-80">
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
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                    placeholder="Email"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                    placeholder="Username"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                    placeholder="Password"
                                />
                            </div>
                            <button className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition">
                                Buat Akun
                            </button>
                            <p className="text-center text-orange-500 text-sm mt-2">
                                Sudah Punya Akun? Login
                            </p>
                        </div>
                        <button
                            className="mt-4 text-gray-500 hover:text-gray-700 absolute top-2 right-2"
                            onClick={handleLoginClick}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

            <div
                className={`fixed bottom-10 right-10 flex flex-col items-center gap-3 z-50 transition-all duration-1000 ease-in-out ${
                    showButtons
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10 pointer-events-none"
                }`}
            >
                <img
                    src={LoginIcon}
                    alt="Login"
                    width={55}
                    className="cursor-pointer shadow-md hover:scale-110 transition-transform"
                    onClick={handleLoginClick}
                    onError={() => console.error("Error loading Login icon")}
                />
                <img
                    src={ScrollToTop}
                    alt="Scroll to top"
                    width={55}
                    className="cursor-pointer shadow-md hover:scale-110 transition-transform"
                    onError={() =>
                        console.error("Error loading Scroll to Top icon")
                    }
                    onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                />
            </div>
        </>
    );
}
