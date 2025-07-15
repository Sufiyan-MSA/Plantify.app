import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import categoryIndoor from "@/assets/category-indoor.jpg";
import categoryHanging from "@/assets/category-hanging.jpg";
import categoryLarge from "@/assets/category-large.jpg";
const categories = [{
  id: 1,
  name: "Desktop Terrariums",
  description: "Perfect for your workspace or home office",
  image: categoryIndoor,
  count: "25+ designs",
  startingPrice: "$39"
}, {
  id: 2,
  name: "Hanging Gardens",
  description: "Beautiful suspended ecosystems for any space",
  image: categoryHanging,
  count: "18+ designs",
  startingPrice: "$54"
}, {
  id: 3,
  name: "Large Ecosystems",
  description: "Statement pieces for living rooms and offices",
  image: categoryLarge,
  count: "12+ designs",
  startingPrice: "$89"
}];
export const Categories = () => {
  return;
};