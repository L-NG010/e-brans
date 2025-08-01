import Footer from '@/Layouts/Footer'
import Header from '@/Layouts/Header'
import MainSection from '@/Sections/materi/MainSection'
import React from 'react'

export default function MateriPage() {
    return (
        <div className="relative">
            <Header />

            <div className="relative pt-24 overflow-hidden">
                <MainSection />
            </div>

            <div className="relative -mt-28">
                <Footer/>
            </div>
        </div>
    )
}
