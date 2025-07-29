import AkreditasSection from "@/Sections/main/AkreditasSection";
import MainSection from "@/Sections/main/MainSection";
import Header from "@/Layouts/Header";
import CourseSection from "@/Sections/main/CourseSection";
import { usePage } from "@inertiajs/react";
import Footer from "@/Layouts/Footer";
import Materi from "@/Sections/main/Materi";
import FirstSection from "@/Sections/main/FirstSection";
import Perusahaan from "@/Sections/main/Perusahaan";
import BottomSection from "@/Sections/main/BottomSection";

export default function Main() {
    const { props } = usePage();
    const { materi } = props;

    return (
        <div className="relative">
            <Header />
            <div className="relative pt-24 overflow-hidden">
                <FirstSection/>
                <MainSection />
            </div>

            <div className="relative -mt-28">
                <AkreditasSection />
                <CourseSection />
                <Materi/>
                <Perusahaan/>
                <BottomSection/>
                <Footer/>
            </div>
        </div>
    );
}
