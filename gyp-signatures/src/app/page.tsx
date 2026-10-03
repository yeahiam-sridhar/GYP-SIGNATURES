import Navigation from '@/components/Navigation';
import HeroVideo from '@/components/HeroVideo';
import Introduction from '@/components/Introduction';
import ThreeWorlds from '@/components/ThreeWorlds';
import AboutSection from '@/components/AboutSection';
import InteriorDesignSection from '@/components/InteriorDesignSection';
import ProjectsSection from '@/components/ProjectsSection';
import FurnitureCollection from '@/components/FurnitureCollection';
import HomeElementsSection from '@/components/HomeElementsSection';
import ArtworkSection from '@/components/ArtworkSection';
import RoomsSection from '@/components/RoomsSection';
import MaterialsSection from '@/components/MaterialsSection';
import CustomSection from '@/components/CustomSection';
import DesignProcess from '@/components/DesignProcess';
import FounderSection from '@/components/FounderSection';
import InspirationSection from '@/components/InspirationSection';
import StudioSection from '@/components/StudioSection';
import OffersSection from '@/components/OffersSection';
import ClientStoriesSection from '@/components/ClientStoriesSection';
import FaqSection from '@/components/FaqSection';
import ConsultationSection from '@/components/ConsultationSection';
import ConsultationModal from '@/components/ConsultationModal';
import FloatingContact from '@/components/FloatingContact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <ConsultationModal />
      <FloatingContact />
      <main>
        {/* 01 Hero Video / High Quality Canvas Scroll */}
        <HeroVideo />

        {/* 02 Introduction: What is GYP Signatures */}
        <Introduction />

        {/* 03 Three Worlds: Interior Design, Furniture, Home Elements */}
        <ThreeWorlds />

        {/* 04 About GYP Signatures: Pillars & Philosophy */}
        <AboutSection />

        {/* 05 Interior Design Services */}
        <InteriorDesignSection />

        {/* 06 Projects: Complete Spaces */}
        <ProjectsSection />

        {/* 07 Furniture Collection */}
        <FurnitureCollection />

        {/* 08 Artwork Feature */}
        <ArtworkSection />

        {/* 09 Home Elements */}
        <HomeElementsSection />

        {/* 10 Rooms / Curated Spaces */}
        <RoomsSection />

        {/* 11 Materials & Craft */}
        <MaterialsSection />

        {/* 12 Custom / Bespoke Tailoring */}
        <CustomSection />

        {/* 13 The 7-Step Design Process */}
        <DesignProcess />

        {/* 14 Founder Story: P. Gayathri */}
        <FounderSection />

        {/* 15 The Inspiration: Guiding Influence */}
        <InspirationSection />

        {/* 16 Visit the Studio: Srikalahasthi Experience Center */}
        <StudioSection />

        {/* 17 Signature Editions: Curated Special Campaigns */}
        <OffersSection />

        {/* 18 Client Stories: Spaces That Become Part of Your Story */}
        <ClientStoriesSection />

        {/* 19 Frequently Asked Questions */}
        <FaqSection />

        {/* 20 Book a Consultation */}
        <ConsultationSection />
      </main>
      <Footer />
    </>
  );
}
