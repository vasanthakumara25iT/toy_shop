import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { ToyProduct } from '../types';
import { sound } from '../utils/audio';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: ToyProduct[];
  onRemoveFromWishlist: (product: ToyProduct) => void;
  onMoveToCart: (product: ToyProduct) => void;
  onSelectProduct: (product: ToyProduct) => void;
  onExploreCatalog: () => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onMoveToCart,
  onSelectProduct,
  onExploreCatalog,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="wishlist-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
    >
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200 bg-[#FAF8F5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-600 fill-red-600" />
            <h2 id="wishlist-modal-title" className="font-serif text-lg font-bold text-stone-900">
              Saved in Your Toy Chest
            </h2>
            <span className="font-mono text-xs text-stone-500 bg-white px-2 py-0.5 rounded-full border border-stone-200">
              {wishlistProducts.length}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close wishlist"
            className="p-1.5 text-stone-400 hover:text-stone-800 rounded-lg hover:bg-stone-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-4">
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto">
                <Heart className="w-6 h-6" />
              </div>
              <p className="font-serif text-base font-bold text-stone-900">
                Your toy chest is currently empty
              </p>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Tap the heart on any heirloom train, music box, or plush companion to save it for upcoming birthdays and holidays.
              </p>
              <button
                onClick={() => {
                  sound.playChime(659.25, 0.2);
                  onClose();
                  onExploreCatalog();
                }}
                className="bg-[#1C2723] hover:bg-[#273832] text-stone-100 text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                Browse Heirloom Collection
              </button>
            </div>
          ) : (
            <div className="divide-y divide-stone-100">
              {wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="py-3.5 flex items-center justify-between gap-3"
                >
                  <div
                    onClick={() => {
                      onClose();
                      onSelectProduct(product);
                    }}
                    className="flex items-center gap-3 cursor-pointer group flex-1 min-w-0"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 object-cover rounded-lg bg-stone-100 border border-stone-200/80 shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="min-w-0">
                      <div className="text-[11px] text-stone-500 font-mono">
                        {product.ageRangeLabel}
                      </div>
                      <h4 className="font-serif text-xs sm:text-sm font-bold text-stone-900 group-hover:text-amber-800 transition-colors truncate">
                        {product.name}
                      </h4>
                      <span className="font-mono text-xs font-bold text-stone-900">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        sound.playChime(783.99, 0.2);
                        onMoveToCart(product);
                      }}
                      className="flex items-center gap-1 bg-[#1C2723] hover:bg-[#273832] text-stone-100 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                      <span>Move to Bag</span>
                    </button>
                    <button
                      onClick={() => onRemoveFromWishlist(product)}
                      aria-label="Remove from chest"
                      className="p-1.5 text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
