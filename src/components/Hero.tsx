import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroTerrarium from "@/assets/hero-terrarium.jpg";
export const Hero = () => {
  return <section className="relative min-h-screen flex items-center bg-gradient-hero overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)] pointer-events-none"></div>
      <div className="absolute top-20 right-20 w-32 h-32 bg-botanical/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-moss/10 rounded-full blur-2xl animate-float" style={{
      animationDelay: '1s'
    }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-glass/30 backdrop-blur-sm rounded-full px-4 py-2 border border-botanical/20">
            <Sparkles className="h-4 w-4 text-botanical" />
            <span className="text-sm font-medium text-botanical">Best Terrarium Collection</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
            Bring Nature
            <span className="block bg-gradient-to-r from-white to-glass bg-clip-text text-transparent">
              Into Your Space
            </span>
          </h1>
          
          <p className="text-xl text-white/90 leading-relaxed max-w-lg">
            Discover our curated collection of premium terrariums and create your own miniature ecosystem. 
            Perfect for homes, offices, and gifts that bring lasting joy.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link to="/terrariums">
              <Button variant="terrarium" size="lg" className="group">
                Shop Terrariums
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="glass" size="lg">
                Learn More
              </Button>
            </Link>
          </div>

          {/* Stats */}
          
        </div>

        {/* Right Content - Hero Image */}
        <div className="relative animate-scale-in" style={{
        animationDelay: '0.3s'
      }}>
          <div className="relative">
            <img src={heroTerrarium} alt="Beautiful terrarium collection" className="w-full h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-700 ease-out filter hover:brightness-110" />
            
            {/* Floating badges */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-xl px-3 py-2 shadow-lg animate-float">
              <div className="text-sm font-medium text-botanical">Get The Best</div>
              <div className="text-xs text-muted-foreground">Terrariums</div>
            </div>
            
            <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md rounded-xl px-3 py-2 shadow-lg animate-float" style={{
            animationDelay: '0.5s'
          }}>
              <div className="text-sm font-medium text-botanical">Care Guide</div>
              <div className="text-xs text-muted-foreground">Included with every order</div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};