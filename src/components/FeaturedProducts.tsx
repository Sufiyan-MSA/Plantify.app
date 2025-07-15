import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart, Product } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import terrarium1 from "@/assets/terrarium-1.jpg";
import terrarium2 from "@/assets/terrarium-2.jpg";
import terrarium3 from "@/assets/terrarium-3.jpg";
import terrarium4 from "@/assets/terrarium-4.jpg";
import terrarium5 from "@/assets/terrarium-5.jpg";
import terrarium6 from "@/assets/terrarium-6.jpg";
function getImageUrl(image: string) {
  if (!image) return '';
  if (image.startsWith('/uploads/')) {
    return `http://localhost:5000${image}`;
  }
  return image;
}
export const FeaturedProducts = () => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products/featured')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => setProducts([]));
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`
    });
  };
  return <section id="products" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">Featured Terrariums</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hand-picked premium terrariums that bring nature's beauty into your space
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => <Card key={product._id} className="group overflow-hidden border-botanical/10 hover:border-botanical/30 transition-all duration-500 hover:shadow-hover animate-slide-up bg-gradient-card" style={{
          animationDelay: `${index * 0.1}s`
        }}>
              <CardContent className="p-0">
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <img src={getImageUrl(product.image)} alt={product.name} className="w-full h-64 object-cover group-hover:scale-110 transition-all duration-700 ease-out" />
                  {/* Overlay Buttons */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out flex items-center justify-center space-x-3">
                    <Button variant="glass" size="icon" className="transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-100">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="terrarium" className="transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-200" onClick={() => handleAddToCart(product)}>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                  {/* Tags */}
                  <div className="absolute top-3 left-3 space-y-1">
                    {product.tags && product.tags.map((tag: string, tagIndex: number) => <span key={tagIndex} className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${tag === "Best Seller" ? "bg-accent text-accent-foreground" : "bg-glass/80 backdrop-blur-sm text-foreground"}`}>
                        {tag}
                      </span>)}
                  </div>
                  {/* Discount Badge */}
                  {product.originalPrice && <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground px-2 py-1 rounded-full text-xs font-medium">
                      {Math.round((product.originalPrice - product.price) / product.originalPrice * 100)}% OFF
                    </div>}
                </div>
                {/* Product Info */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-botanical transition-colors">
                    {product.name}
                  </h3>
                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`} />)}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.rating} ({product.numberOfReviews} reviews)
                    </span>
                  </div>
                  {/* Price */}
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-botanical">
                      ₹{product.price}
                    </span>
                    {product.originalPrice && <span className="text-lg text-muted-foreground line-through">
                        ₹{product.originalPrice}
                      </span>}
                  </div>
                </div>
              </CardContent>
            </Card>)}
        </div>
        {/* View All Button */}
        <div className="text-center mt-12 animate-fade-in">
          <Link to="/terrariums">
            <Button variant="outline" size="lg" className="hover:bg-botanical hover:text-white hover:border-botanical">
              View All Terrariums
            </Button>
          </Link>
        </div>
      </div>
    </section>;
}