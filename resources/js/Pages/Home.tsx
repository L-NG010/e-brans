import React, { useState, useEffect } from 'react';
import { Home, Calendar, TrendingUp, MapPin } from 'lucide-react';
import { MdPayment } from "react-icons/md";
import Header from '../Layouts/Header';
import Footer from '../Layouts/Footer';
import HeroSection from '@/Components/HeroSection';
import NavigationCard from '@/Components/NavigationCard'
import MobileMenu from '@/Components/MobileMenu'

interface NavigationCardType {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  route: string;
}


const SakuraHotelApp: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const navigationCards: NavigationCardType[] = [
    {
      id: 'rooms',
      title: 'Room Management',
      description: 'Monitor room availability, bookings, housekeeping status, and guest check-ins/check-outs in real-time.',
      icon: <Home />,
      gradient: 'bg-gradient-to-br from-green-400 to-green-600',
      route: '/rooms'
    },
    {
      id: 'income',
      title: "Today's Income",
      description: 'Track daily revenue, payment processing, outstanding balances, and financial performance metrics.',
      icon: <TrendingUp />,
      gradient: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
      route: '/income'
    },
    {
      id: 'activities',
      title: "Today's Activities",
      description: 'View guest activities, staff schedules, maintenance tasks, and operational events happening today.',
      icon: <Calendar />,
      gradient: 'bg-gradient-to-br from-teal-400 to-teal-600',
      route: '/activities'
    },
    {
      id: 'payment',
      title: 'Payment',
      description: 'Plan upcoming events, manage reservations, schedule maintenance, and strategize business growth.',
      icon: <MdPayment />,
      gradient: 'bg-gradient-to-br from-green-500 to-green-700',
      route: '/plans'
    }
  ];

  const handleCardClick = (route: string): void => {
    setSelectedCard(route);
    console.log(`Navigating to: ${route}`);
  };

  const handleMenuToggle = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="min-h-screen bg-white">
      <Header
        onMenuToggle={handleMenuToggle}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <main>
        <HeroSection />
        <NavigationCard
          cards={navigationCards}
          onCardClick={handleCardClick}
        />
      </main>

      <Footer />
    </div>
  );
};

export default SakuraHotelApp;
