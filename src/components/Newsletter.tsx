import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const {
    toast
  } = useToast();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      toast({
        title: "Successfully subscribed!",
        description: "Welcome to the Plantify community. Check your email for exclusive offers."
      });
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };
  return <section className="py-20 bg-gradient-hero relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.1),transparent)] pointer-events-none"></div>
      <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-2xl animate-float"></div>
      <div className="absolute bottom-10 left-10 w-16 h-16 bg-white/10 rounded-full blur-xl animate-float" style={{
      animationDelay: '1.5s'
    }}></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30 mb-6">
            <Mail className="h-4 w-4 text-white" />
            <span className="text-sm font-medium text-white">Join Our Community</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Stay Connected with Nature
          </h2>
          
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get exclusive terrarium care tips, new product launches, and special offers delivered to your inbox.
          </p>

          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input type="email" placeholder="Enter your email address" value={email} onChange={e => setEmail(e.target.value)} className="flex-1 bg-white/90 backdrop-blur-sm border-white/30 placeholder:text-gray-500 text-gray-900" required />
              <Button type="submit" variant="glass" size="lg" className="sm:px-8 bg-white/25 border-white/40 text-white hover:bg-white/40 backdrop-blur-lg" disabled={isSubscribed}>
                {isSubscribed ? <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Subscribed!
                  </> : "Subscribe"}
              </Button>
            </div>
            
            <p className="text-sm text-white/70">Join plant lovers. Unsubscribe anytime.</p>
          </form>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/20">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/25 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-3 transform hover:scale-110 transition-all duration-300 ease-out">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Care Tips</h3>
              <p className="text-white/80 text-sm">Expert advice to keep your terrariums thriving</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white/25 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-3 transform hover:scale-110 transition-all duration-300 ease-out">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="font-semibold text-white mb-2">New Arrivals</h3>
              <p className="text-white/80 text-sm">Be first to see our latest terrarium designs</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white/25 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-3 transform hover:scale-110 transition-all duration-300 ease-out">
                <span className="text-2xl">🎁</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Exclusive Offers</h3>
              <p className="text-white/80 text-sm">Special discounts just for subscribers</p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};