import AkreditasSection from "@/Sections/AkreditasSection";
import MainSection from "@/Sections/MainSection";
import Header from "@/Layouts/Header";
import CourseSection from "@/Sections/CourseSection";
import { usePage } from "@inertiajs/react";
import Footer from "@/Sections/Footer";

export default function Main() {
    const { props } = usePage();
    const { materi } = props;

    return (
        <div className="relative">
            <Header />
            <div className="relative pt-24 overflow-hidden">
                <MainSection />
            </div>

            <div className="relative -mt-48">
                <AkreditasSection />
                <CourseSection />
                <Footer/>
            </div>
        </div>
    );
}
