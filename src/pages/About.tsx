import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Heart, Recycle, Award, Users, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import heroTerrarium from "@/assets/hero-terrarium.jpg";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-hero">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                About Terrariums
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Discover the fascinating world of miniature ecosystems and learn how these self-sustaining gardens can transform your living space while connecting you with nature.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/terrariums">
                  <Button variant="terrarium" size="lg">
                    Shop Now
                  </Button>
                </Link>
                <Button variant="glass" size="lg">
                  Care Guide
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={heroTerrarium} 
                alt="Beautiful terrarium" 
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What are Terrariums */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-foreground">
                What are Terrariums?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Terrariums are enclosed glass containers that house plants in a controlled environment. They create their own water cycle through condensation and evaporation, making them nearly self-sustaining ecosystems.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Originally invented in the 1800s by botanist Nathaniel Bagshaw Ward, terrariums were used to transport exotic plants during long sea voyages. Today, they've become popular decorative pieces that bring nature indoors.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-botanical">200+</div>
                  <div className="text-sm text-muted-foreground">Years of History</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-botanical">99%</div>
                  <div className="text-sm text-muted-foreground">Self-Sustaining</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src={heroTerrarium} 
                alt="Terrarium ecosystem" 
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Choose Terrariums?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Terrariums offer unique benefits that make them perfect for modern living
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Leaf className="h-8 w-8 text-botanical" />,
                title: "Low Maintenance",
                description: "Self-watering ecosystem requires minimal care, perfect for busy lifestyles"
              },
              {
                icon: <Heart className="h-8 w-8 text-botanical" />,
                title: "Stress Relief",
                description: "Studies show that viewing plants reduces stress and improves mental wellbeing"
              },
              {
                icon: <Recycle className="h-8 w-8 text-botanical" />,
                title: "Eco-Friendly",
                description: "Sustainable decoration that purifies air and connects you with nature"
              },
              {
                icon: <Award className="h-8 w-8 text-botanical" />,
                title: "Educational",
                description: "Learn about plant biology and ecosystems through hands-on observation"
              },
              {
                icon: <Users className="h-8 w-8 text-botanical" />,
                title: "Great Gifts",
                description: "Unique, thoughtful presents that keep giving joy for years to come"
              },
              {
                icon: <Truck className="h-8 w-8 text-botanical" />,
                title: "Space Efficient",
                description: "Bring nature indoors without taking up much space or making a mess"
              }
            ].map((benefit, index) => (
              <Card key={index} className="bg-background border-botanical/10 hover:border-botanical/30 transition-all duration-300">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="flex justify-center">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold text-foreground">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Types of Terrariums */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Types of Terrariums
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Each type offers unique benefits and aesthetic appeal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card className="bg-gradient-card border-botanical/10">
              <CardContent className="p-8 space-y-6">
                <h3 className="text-2xl font-bold text-foreground">Closed Terrariums</h3>
                <p className="text-muted-foreground">
                  Completely sealed ecosystems that create their own water cycle. Perfect for tropical plants that love humidity.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Self-watering through condensation</li>
                  <li>• High humidity environment</li>
                  <li>• Ideal for ferns, moss, and tropical plants</li>
                  <li>• Minimal maintenance required</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-botanical/10">
              <CardContent className="p-8 space-y-6">
                <h3 className="text-2xl font-bold text-foreground">Open Terrariums</h3>
                <p className="text-muted-foreground">
                  Partially open containers that allow air circulation. Great for succulents and plants that prefer drier conditions.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Better air circulation</li>
                  <li>• Lower humidity levels</li>
                  <li>• Perfect for succulents and cacti</li>
                  <li>• Easy to access and maintain</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Care Instructions */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Basic Care Instructions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Simple steps to keep your terrarium thriving
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Light",
                description: "Place in bright, indirect sunlight. Avoid direct sun which can overheat the container."
              },
              {
                step: "2",
                title: "Watering",
                description: "Closed: Rarely needed. Open: Mist lightly when soil feels dry."
              },
              {
                step: "3",
                title: "Pruning",
                description: "Trim overgrown plants to maintain shape and prevent overcrowding."
              },
              {
                step: "4",
                title: "Cleaning",
                description: "Wipe glass clean and remove dead leaves to prevent mold growth."
              }
            ].map((step, index) => (
              <Card key={index} className="bg-background border-botanical/10 text-center">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-botanical text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Terrarium Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Explore our collection of premium terrariums and bring the wonder of nature into your home today.
          </p>
          <Link to="/terrariums">
            <Button variant="terrarium" size="lg">
              Shop Terrariums Now
            </Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;