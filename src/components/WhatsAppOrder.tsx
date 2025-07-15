import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/contexts/CartContext';
import { MessageCircle, Plus, Minus, X } from 'lucide-react';

interface WhatsAppOrderProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppOrder = ({ isOpen, onClose }: WhatsAppOrderProps) => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart();
  const [userName, setUserName] = useState('');

  const phoneNumber = '7337036132';

  const generateWhatsAppMessage = () => {
    let message = `🌿 *Plantify.app Order Request* 🌿\n\n`;
    
    if (userName.trim()) {
      message += `👤 *Customer:* ${userName}\n\n`;
    }
    
    message += `📦 *Order Details:*\n`;
    
    cartItems.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`;
      message += `   Quantity: ${item.quantity}\n`;
      message += `   Price: ₹${item.price} each\n`;
      message += `   Subtotal: ₹${(item.price * item.quantity).toFixed(2)}\n\n`;
    });
    
    message += `💰 *Total Amount: ₹${getCartTotal().toFixed(2)}*\n\n`;
    message += `Please confirm this order and provide delivery details. Thank you! 🙏`;
    
    return encodeURIComponent(message);
  };

  const handleWhatsAppClick = () => {
    const encodedMessage = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    clearCart();
    onClose();
  };

  if (cartItems.length === 0) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Your Cart is Empty</DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">Add some beautiful terrariums to your cart!</p>
            <Button onClick={onClose} variant="outline">Continue Shopping</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-botanical flex items-center">
            🛒 Your Order Summary
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Name */}
          <div className="space-y-2">
            <Label htmlFor="customerName">Your Name (Optional)</Label>
            <Input
              id="customerName"
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="border-botanical/30 focus:border-botanical"
            />
          </div>

          {/* Cart Items */}
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 p-4 border border-botanical/20 rounded-lg bg-gradient-card">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">₹{item.price} each</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>

                {/* Price & Remove */}
                <div className="text-right">
                  <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeFromCart(item.id)}
                    className="text-destructive hover:text-destructive p-0 h-auto"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="border-t border-botanical/20 pt-4">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total:</span>
              <span className="text-botanical">₹{getCartTotal().toFixed(2)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Continue Shopping
            </Button>
            <Button 
              onClick={handleWhatsAppClick}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Order via WhatsApp
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};