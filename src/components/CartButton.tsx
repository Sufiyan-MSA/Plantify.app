import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { WhatsAppOrder } from './WhatsAppOrder';

export const CartButton = () => {
  const { getCartItemsCount } = useCart();
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const itemsCount = getCartItemsCount();

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOrderModalOpen(true)}
        className="relative"
      >
        <ShoppingCart className="h-5 w-5" />
        {itemsCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-botanical text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {itemsCount}
          </span>
        )}
      </Button>
      
      <WhatsAppOrder 
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />
    </>
  );
};