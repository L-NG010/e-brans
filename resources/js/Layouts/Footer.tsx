const Footer = () => {
    const logo: string = "/assets/img/smkbraka-icon.png";

    return (
        <footer className="w-full bg-gray-100 border-t border-gray-200 py-12 mt-20">
            <div className="max-w-6xl mx-auto px-4">
                {/* Footer Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">
                            SMK Brantas Karangkates
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Memberikan pendidikan berkualitas untuk membentuk
                            generasi unggul dan siap menghadapi tantangan masa
                            depan.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">
                            Tautan Cepat
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-600 hover:text-blue-600 text-sm transition"
                                >
                                    Beranda
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-600 hover:text-blue-600 text-sm transition"
                                >
                                    Tentang Kami
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-600 hover:text-blue-600 text-sm transition"
                                >
                                    Jurusan
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-600 hover:text-blue-600 text-sm transition"
                                >
                                    Kontak
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">
                            Kontak
                        </h3>
                        <ul className="space-y-2 text-gray-600 text-sm">
                            <li>JL. LOLARAS 14 65165 Sumberpucung Malang</li>
                            <li>(0341) 385876</li>
                            <li>Email: info@sekolah.sch.id</li>
                        </ul>
                    </div>

                    {/* Social Media / Logo Placeholder */}
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">
                            Ikuti Kami
                        </h3>
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                aria-label="Facebook"
                                className="text-gray-600 hover:text-blue-600 transition"
                            >
                                {/* Replace with actual icons if needed */}
                                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs">
                                    FB
                                </div>
                            </a>
                            <a
                                href="#"
                                aria-label="Instagram"
                                className="text-gray-600 hover:text-pink-600 transition"
                            >
                                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs">
                                    IG
                                </div>
                            </a>
                            <a
                                href="#"
                                aria-label="Twitter"
                                className="text-gray-600 hover:text-blue-400 transition"
                            >
                                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs">
                                    X
                                </div>
                            </a>
                        </div>
                        {/* Logo Placeholder */}
                        <div className="mt-8 w-24 h-10 flex items-center justify-center text-xs text-gray-500">
                            <img src={logo} alt="logo sekolah" />
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-200 mt-10 pt-6 text-center">
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} SMK Brantas Karangkates. Hak
                        Cipta Dilindungi.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
