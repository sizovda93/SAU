import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import IntegrationSection from "@/components/IntegrationSection";
import PartnerCabinetSection from "@/components/PartnerCabinetSection";
import LeadCaptureSection from "@/components/LeadCaptureSection";
import CabinetSection from "@/components/CabinetSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <IntegrationSection />
      <PartnerCabinetSection />
      <LeadCaptureSection />
      <CabinetSection />
      <Footer />
    </div>
  );
};

export default Index;
