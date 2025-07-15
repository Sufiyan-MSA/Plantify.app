import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { RoomTransformation } from "@/components/RoomTransformation";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Categories } from "@/components/Categories";
import { Benefits } from "@/components/Benefits";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <RoomTransformation />
      <FeaturedProducts />
      <Categories />
      <Benefits />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
