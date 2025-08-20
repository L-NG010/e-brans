import AkreditasSection from "@/Sections/Main/AkreditasSection";
import MainSection from "@/Sections/Main/MainSection";
import Header from "@/Layouts/Header";
import CourseSection from "@/Sections/Main/CourseSection";
import Footer from "@/Layouts/Footer";
import Materi from "@/Sections/Main/Materi";
import FirstSection from "@/Sections/Main/FirstSection";
import Perusahaan from "@/Sections/Main/Perusahaan";
import BottomSection from "@/Sections/Main/BottomSection";
import {MapelType} from "@/types/Main/mapel";
import { MateriType } from "@/types/Main/materi";

interface MainProps {
  mapel: MapelType[];
  materi: MateriType[];
}

export default function Main({mapel,materi}:MainProps) {


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
                <Materi mapel={mapel} materi={materi}/>
                <Perusahaan/>
                <BottomSection/>
                <Footer/>
            </div>
        </div>
    );
}
