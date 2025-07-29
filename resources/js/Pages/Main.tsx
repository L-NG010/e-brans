import AkreditasSection from "@/Sections/AkreditasSection";
import MainSection from "@/Sections/MainSection";
import Header from "@/Layouts/Header";
import CourseSection from "@/Sections/CourseSection";
import { usePage } from "@inertiajs/react";
import Footer from "@/Layouts/Footer";
import Materi from "@/Sections/Materi";
import FirstSection from "@/Sections/FirstSection";
import Perusahaan from "@/Sections/Perusahaan";

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
                <Footer/>
            </div>
        </div>
    );
}
