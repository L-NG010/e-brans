const Footer = () => {
    const logo: string = "/assets/img/smkbraka-icon.png";

    return (
        <footer className="w-full bg-[#0B2441] border-t border-gray-200 py-4 mt-10">
            <div className="flex justify-center items-center space-x-4 text-sm text-white">
                <span> JL. LOLARAS 14 65165 Sumberpucung Malang   (0341) 385876&copy; {new Date().getFullYear()} SMK Brantas Karangkates. Hak Cipta Dilindungi.</span>
            </div>
        </footer>
    );
};

export default Footer;