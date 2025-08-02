import Footer from '@/Layouts/Footer'
import Header from '@/Layouts/Header'
import MainSection from '@/Sections/materi/Main'
import { MapelType } from "@/types/main/mapel";
import { MateriType } from "@/types/main/materi";

interface MateriProps {
  mapel: MapelType[];
  materi: MateriType[];
}

export default function MateriPage({mapel, materi}: MateriProps) {
    return (
        <div className="relative">
            <Header />

            <div className="relative pt-24 overflow-hidden">
                <MainSection mapel={mapel} materi={materi} />
            </div>

                <Footer/>
        </div>
    )
}
