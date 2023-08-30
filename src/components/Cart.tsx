import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';

const Cart = () => {
    return (
        <Sheet>
      <SheetContent className="overflow-auto relative">
        <SheetHeader>
          <SheetTitle>WishList</SheetTitle>
        </SheetHeader>
        <div className="space-y-5">
        </div>
      </SheetContent>
    </Sheet>
    );
};

export default Cart;