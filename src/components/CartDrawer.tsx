import React from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, Gift, Truck } from 'lucide-react';
import { CartItem } from '../types';
import { sound } from '../utils/audio';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  onExploreCatalog: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onExploreCatalog,
}) => {
  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 50;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const giftWrapFee = items.reduce(
    (sum, item) => sum + (item.giftWrap ? 4.5 * item.quantity : 0),
    0
  );

  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(
    100,
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100
  );

  const total = subtotal + giftWrapFee;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 overflow-hidden bg-stone-950/50 backdrop-blur-xs flex justify-end"
    >
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-700" />
            <h2 id="cart-drawer-title" className="font-serif text-lg font-bold text-stone-900">
              Your Toy Bag
            </h2>
            <span className="font-mono text-xs text-stone-500 bg-white px-2 py-0.5 rounded-full border border-stone-200">
              {items.reduce((acc, item) => acc + item.quantity, 0)} items
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close cart drawer"
            className="p-1.5 text-stone-400 hover:text-stone-800 rounded-lg hover:bg-stone-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="px-5 py-3 bg-[#F6F3EE] border-b border-stone-200/80">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <div className="flex items-center gap-1.5 font-medium text-stone-700">
              <Truck className="w-3.5 h-3.5 text-emerald-700" />
              {amountToFreeShipping > 0 ? (
                <span>
                  Add <strong className="font-mono tabular-nums font-semibold">${amountToFreeShipping.toFixed(2)}</strong> more for free carbon-neutral shipping
                </span>
              ) : (
                <span className="text-emerald-800 font-semibold">
                  You unlocked free carbon-neutral shipping!
                </span>
              )}
            </div>
          </div>
          <div className="w-full bg-stone-200 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-emerald-600 h-full transition-all duration-300 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Itemized List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-stone-100">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <p className="font-serif text-lg font-bold text-stone-900">Your bag is empty</p>
                <p className="text-xs text-stone-500 max-w-xs leading-relaxed">
                  Discover heirloom wooden trains, celestial music boxes, and handcrafted play wonders in our atelier.
                </p>
              </div>
              <button
                onClick={() => {
                  sound.playChime(659.25, 0.2);
                  onClose();
                  onExploreCatalog();
                }}
                className="bg-[#1C2723] hover:bg-[#273832] text-stone-100 text-xs font-semibold px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="py-4 flex gap-3.5 items-start">
                {/* Product Thumbnail */}
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-18 h-18 object-cover rounded-lg bg-stone-100 border border-stone-200/80 shrink-0"
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif text-sm font-bold text-stone-900 leading-snug line-clamp-1">
                      {item.product.name}
                    </h3>
                    <button
                      onClick={() => {
                        sound.playBlockTap();
                        onRemoveItem(item.product.id);
                      }}
                      aria-label="Remove item"
                      className="text-stone-400 hover:text-red-600 transition-colors p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-[11px] text-stone-500">
                    {item.product.ageRangeLabel}
                  </p>

                  {item.giftWrap && (
                    <div className="flex items-center gap-1 text-[11px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/50">
                      <Gift className="w-3 h-3 text-amber-600 shrink-0" />
                      <span className="truncate">
                        Gift Wrapped {item.giftMessage ? `("${item.giftMessage}")` : ''}
                      </span>
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-between">
                    {/* Stepper */}
                    <div className="flex items-center border border-stone-300 rounded-md bg-stone-50 text-xs">
                      <button
                        onClick={() => {
                          sound.playBlockTap();
                          onUpdateQuantity(item.product.id, item.quantity - 1);
                        }}
                        className="px-2 py-1 hover:bg-stone-200 text-stone-700 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2 py-1 font-mono tabular-nums font-bold text-stone-900 min-w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => {
                          sound.playBlockTap();
                          onUpdateQuantity(item.product.id, item.quantity + 1);
                        }}
                        className="px-2 py-1 hover:bg-stone-200 text-stone-700 cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-mono text-sm font-bold tabular-nums text-stone-900">
                      ${(item.product.price * item.quantity + (item.giftWrap ? 4.5 * item.quantity : 0)).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout Trigger */}
        {items.length > 0 && (
          <div className="p-5 border-t border-stone-200 bg-[#FAF8F5] space-y-3">
            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-mono tabular-nums font-semibold text-stone-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              {giftWrapFee > 0 && (
                <div className="flex justify-between text-amber-800">
                  <span className="flex items-center gap-1">
                    <Gift className="w-3 h-3" />
                    Artisan Gift Wrapping
                  </span>
                  <span className="font-mono tabular-nums font-semibold">
                    ${giftWrapFee.toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-mono tabular-nums font-semibold text-stone-900">
                  {amountToFreeShipping === 0 ? 'FREE' : '$4.90'}
                </span>
              </div>

              <div className="pt-2 border-t border-stone-200 flex justify-between text-sm font-bold text-stone-900">
                <span>Total</span>
                <span className="font-mono tabular-nums text-base">
                  ${(total + (amountToFreeShipping === 0 ? 0 : 4.90)).toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playChime(783.99, 0.3);
                onProceedToCheckout();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#1C2723] hover:bg-[#273832] text-stone-100 py-3.5 px-4 rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer group"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-[11px] text-center text-stone-400">
              Secure checkout · 30-day gentle play return guarantee
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
