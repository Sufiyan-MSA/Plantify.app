import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Heart, Lightbulb, Gift, Shield, Truck } from "lucide-react";
const benefits = [{
  icon: Leaf,
  title: "Improved Air Quality",
  description: "Our terrariums naturally purify the air in your space, creating a healthier environment for you and your family."
}, {
  icon: Heart,
  title: "Stress Relief",
  description: "Studies show that caring for plants reduces stress and anxiety while boosting mood and mental wellbeing."
}, {
  icon: Lightbulb,
  title: "Low Maintenance",
  description: "Self-sustaining ecosystems require minimal care, perfect for busy lifestyles while still bringing nature indoors."
}, {
  icon: Gift,
  title: "Perfect Gifts",
  description: "Thoughtful presents that keep giving. Our terrariums make memorable gifts for any occasion."
}, {
  icon: Shield,
  title: "Quality Guarantee",
  description: "Premium materials and expert craftsmanship backed by our 30-day satisfaction guarantee."
}, {
  icon: Truck,
  title: "Safe Delivery",
  description: "Specially designed packaging ensures your terrarium arrives safely, complete with care instructions."
}];
export const Benefits = () => {
  return <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Why Choose Plantify?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            More than just decoration, our terrariums bring life, health, and happiness to your space
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
          const IconComponent = benefit.icon;
          return <Card key={index} className="group border-botanical/10 hover:border-botanical/30 transition-all duration-500 hover:shadow-hover animate-slide-up bg-gradient-card" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <CardContent className="p-8 text-center space-y-4">
                  {/* Icon */}
                  <div className="mx-auto w-16 h-16 bg-botanical-light rounded-full flex items-center justify-center group-hover:bg-botanical group-hover:scale-110 transition-all duration-300">
                    <IconComponent className="h-8 w-8 text-botanical group-hover:text-white transition-colors duration-300" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-botanical transition-colors">
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>;
        })}
        </div>

        {/* Bottom Stats */}
        
      </div>
    </section>;
};