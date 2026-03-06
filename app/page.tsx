import WhyChooseAdvancedGrohair from "@/components/comparison-section";
import FAQ from "@/components/faq";
import RedTopAnnouncementBar from "@/components/first";
import ContactFooterReplica from "@/components/footer";
import GrohairTopBar from "@/components/header";
import ImageCarousel from "@/components/hero-section";
import AdvanceHairVideoSection from "@/components/logoslider";
import NewHairConsultationCardExact from "@/components/newform";
import VideoTestimonials from "@/components/newvideo";
import VideoResultsCarousel from "@/components/offer-highlight";
import HairTreatmentsGrid from "@/components/results-section";
import HairConsultationCardExact from "@/components/skinpopup";
import ImageCarouselGrid from "@/components/video";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <RedTopAnnouncementBar />
      <GrohairTopBar />

      <section id="hero">
        <ImageCarousel />
      </section>
      {/* <HairConsultationCardExact /> */}
   
      <HairTreatmentsGrid />
   <section id="form">
        <NewHairConsultationCardExact />
      </section>
      <section id="why">
        <ImageCarouselGrid />
      </section>

      <AdvanceHairVideoSection />
      <VideoTestimonials />
      {/* <VideoResultsCarousel /> */}
      <section id="services">
        <WhyChooseAdvancedGrohair />
      </section>
      <section id="faq">
        <FAQ />
      </section>
      <ContactFooterReplica />
    </main>
  );
}
