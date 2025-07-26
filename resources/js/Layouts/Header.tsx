import { useState, useEffect, ReactNode, MouseEvent } from "react";
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

type DropdownType = 'courses' | 'certificate' | 'task' | null;

export default function Header(): JSX.Element {
    const logo: string = "/assets/img/smkbraka-icon.png";
    const [openDropdown, setOpenDropdown] = useState<DropdownType>(null);
    const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

    const courses: CourseItem[] = [
        { name: "Web Design", href: "#", icon: Code },
        { name: "Mobile", href: "#", icon: Smartphone },
        { name: "Marketing", href: "#", icon: HandCoins },
    ];

    const sertificate: MenuItem[] = [
        { name: "Praktik Kerja Lapangan", href: "#" },
        { name: "Lomba", href: "#" }
    ];

    const task: MenuItem[] = [
        { name: "Jurusan", href: "#" },
        { name: "Umum", href: "#" }
    ];

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
        }, 300); // 300ms delay before closing
        setHoverTimeout(timeout);
    };

    // Handle dropdown content hover (prevent closing)
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
            if (!target.closest('.dropdown-container')) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const DropdownMenu = ({ isOpen, children, onMouseEnter, onMouseLeave }: DropdownMenuProps): JSX.Element => (
        <div
            className={`absolute bg-white shadow-lg rounded-lg mt-2 w-48 z-10 border border-gray-100 pt-1 pb-1 transition-all duration-200 ${
                isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
            }`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="py-1">{children}</div>
        </div>
    );

    return (
        <>
            <header className="bg-white px-6 py-4 flex items-center justify-between shadow-md fixed w-full">
                <div className="flex items-center">
                    <img src={logo} alt="logo sekolah" width={60} />
                    <div className="ms-2 flex items-baseline flex-col">
                        <div className="text-2xl font-extrabold text-[#465159] leading-none">
                            SMK BRAKA
                        </div>
                        <span className="text-[#888888] font-semibold leading-none ml-2">
                            BRANTAS KARANGKATES
                        </span>
                    </div>
                    <div className="ms-8 flex items-center gap-4">
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
                            {/* Telusuri Kursus Dropdown */}
                            <div className="relative dropdown-container">
                                <button
                                    className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition font-medium text-sm whitespace-nowrap"
                                    onClick={() => handleDropdownClick('courses')}
                                    onMouseEnter={() => handleMouseEnter('courses')}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    Telusuri Kursus
                                    <ChevronDown
                                        size={16}
                                        className={`transition-transform duration-200 ${
                                            openDropdown === 'courses' ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>
                                <DropdownMenu
                                    isOpen={openDropdown === 'courses'}
                                    onMouseEnter={handleDropdownHover}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    {courses.map((service: CourseItem, index: number) => (
                                        <a
                                            key={index}
                                            href={service.href}
                                            className="px-4 py-2 text-sm hover:bg-blue-50 transition flex items-center"
                                        >
                                            <service.icon size={16} />
                                            <span className="ms-2">{service.name}</span>
                                        </a>
                                    ))}
                                </DropdownMenu>
                            </div>

                            {/* Klaim Sertifikat Dropdown */}
                            <div className="relative dropdown-container">
                                <button
                                    className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition font-medium text-sm whitespace-nowrap"
                                    onClick={() => handleDropdownClick('certificate')}
                                    onMouseEnter={() => handleMouseEnter('certificate')}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    Klaim Sertifikat Anda
                                    <ChevronDown
                                        size={16}
                                        className={`transition-transform duration-200 ${
                                            openDropdown === 'certificate' ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>
                                <DropdownMenu
                                    isOpen={openDropdown === 'certificate'}
                                    onMouseEnter={handleDropdownHover}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    {sertificate.map((service: MenuItem, index: number) => (
                                        <a
                                            key={index}
                                            href={service.href}
                                            className="block px-4 py-2 text-sm hover:bg-blue-50 transition"
                                        >
                                            {service.name}
                                        </a>
                                    ))}
                                </DropdownMenu>
                            </div>

                            {/* Temukan Tugas Dropdown */}
                            <div className="relative dropdown-container">
                                <button
                                    className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition font-medium text-sm whitespace-nowrap"
                                    onClick={() => handleDropdownClick('task')}
                                    onMouseEnter={() => handleMouseEnter('task')}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    Temukan Tugas Anda
                                    <ChevronDown
                                        size={16}
                                        className={`transition-transform duration-200 ${
                                            openDropdown === 'task' ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>
                                <DropdownMenu
                                    isOpen={openDropdown === 'task'}
                                    onMouseEnter={handleDropdownHover}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    {task.map((service: MenuItem, index: number) => (
                                        <a
                                            key={index}
                                            href={service.href}
                                            className="block px-4 py-2 text-sm hover:bg-blue-50 transition"
                                        >
                                            {service.name}
                                        </a>
                                    ))}
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>
                </div>
                <nav className="flex gap-4">
                    <button className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition text-sm whitespace-nowrap">
                        Login
                    </button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-600 transition text-sm whitespace-nowrap">
                        Signup
                    </button>
                </nav>
            </header>
        </>
    );
}
