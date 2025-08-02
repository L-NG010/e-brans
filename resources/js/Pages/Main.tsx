import AkreditasSection from "@/Sections/main/AkreditasSection";
import MainSection from "@/Sections/main/MainSection";
import Header from "@/Layouts/Header";
import CourseSection from "@/Sections/main/CourseSection";
import Footer from "@/Layouts/Footer";
import Materi from "@/Sections/main/Materi";
import FirstSection from "@/Sections/main/FirstSection";
import Perusahaan from "@/Sections/main/Perusahaan";
import BottomSection from "@/Sections/main/BottomSection";
import {MapelType} from "@/types/main/mapel";
import { MateriType } from "@/types/main/materi";
import { log } from "console";

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
