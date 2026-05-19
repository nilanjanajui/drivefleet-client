import HeroBanner from "@/components/home/HeroBanner";
import AvailableCars from "@/components/home/AvailableCars";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CustomerReviews from "@/components/home/CustomerReviews";
import CTASection from "@/components/home/CTASection";

export const metadata = {
  title: "DriveFleet — Drive Your Journey with Premium Rentals",
  description: "Explore and book premium cars easily with DriveFleet",
};

export default function HomePage() {
  return (
    <main className="bg-white">
      <HeroBanner />
      <AvailableCars />
      <WhyChooseUs />
      <CustomerReviews />
      <CTASection />
    </main>
  );
}