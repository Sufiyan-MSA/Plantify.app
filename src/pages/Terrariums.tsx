import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Heart, Star, Filter, SlidersHorizontal } from "lucide-react";
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

const categories = ["All", "Closed", "Open", "Hanging", "Desktop", "Mini", "Kit", "Large"];

const Terrariums = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [products, setProducts] = useState<any[]>([]);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => setProducts([]));
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const filteredProducts = products.filter(product =>
    selectedCategory === "All" || product.category === selectedCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "reviews":
        return b.numberOfReviews - a.numberOfReviews;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-hero">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            Shop Terrariums
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Discover our complete collection of premium terrariums, from beginner-friendly kits to stunning statement pieces
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-background border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "terrarium" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="text-sm"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex items-center space-x-4">
              <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviews</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {sortedProducts.length} of {products.length} terrariums
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProducts.map((product, index) => (
              <Card 
                key={product.id} 
                className="group overflow-hidden border-botanical/10 hover:border-botanical/30 transition-all duration-500 hover:shadow-hover animate-slide-up bg-gradient-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  {/* Image Container */}
                  <div className="relative overflow-hidden">
                    <img
                      src={getImageUrl(product.image)}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-all duration-700 ease-out"
                    />
                    
                    {/* Overlay Buttons */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out flex items-center justify-center space-x-3">
                      <Button variant="glass" size="icon" className="transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-100">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="terrarium" 
                        className="transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-200"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>

                    {/* Tags */}
                    <div className="absolute top-3 left-3 space-y-1">
                      {product.tags.map((tag: string, tagIndex: number) => (
                        <span
                          key={tagIndex}
                          className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                            tag === "Best Seller" 
                              ? "bg-accent text-accent-foreground" 
                              : "bg-glass/80 backdrop-blur-sm text-foreground"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Discount Badge */}
                    {product.originalPrice && (
                      <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground px-2 py-1 rounded-full text-xs font-medium">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-botanical transition-colors">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating) 
                                ? "text-yellow-400 fill-current" 
                                : "text-gray-300"
                            }`} 
                          />
                        ))}
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
                      {product.originalPrice && (
                        <span className="text-lg text-muted-foreground line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Terrariums;