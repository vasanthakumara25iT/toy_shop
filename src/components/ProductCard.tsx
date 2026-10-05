import React, { useState } from 'react';
import { Heart, Star, Sparkles, Plus, Eye } from 'lucide-react';
import { ToyProduct } from '../types';
import { sound } from '../utils/audio';

interface ProductCardProps {
  product: ToyProduct;
  onSelect: (product: ToyProduct) => void;
  onAddToCart: (product: ToyProduct) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: ToyProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playChime(783.99, 0.25);
    onAddToCart(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playChime(659.25, 0.2);
    onToggleWishlist(product);
  };

  const handleCardClick = () => {
    sound.playChime(523.25, 0.2);
    onSelect(product);
  };

  return (
    <article
      onClick={handleCardClick}
      className="group relative flex flex-col bg-white border border-stone-200/90 rounded-xl overflow-hidden hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
    >
      {/* Visual Slot (65-70% visual prominence) */}
      <div className="relative aspect-4/3 w-full bg-[#F5F2EC] overflow-hidden">
        {/* Editorial Text Tag (single quiet tag, no pill sandwich) */}
        {product.editorialTag && (
          <div className="absolute top-3 left-3 z-10">
            <span className="text-[11px] font-medium tracking-wide text-stone-700 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-sm border border-stone-200 shadow-2xs">
              {product.editorialTag}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 backdrop-blur-xs text-stone-600 hover:text-amber-800 border border-stone-200/80 shadow-2xs transition-transform active:scale-90 hover:scale-105 cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? 'fill-red-600 text-red-600' : 'text-stone-600'
            }`}
          />
        </button>

        {/* Image with fallback container */}
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-103 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 text-stone-400 p-4 text-center">
            <Sparkles className="w-8 h-8 text-amber-600/50 mb-2" />
            <span className="text-xs font-serif text-stone-600 font-semibold">{product.name}</span>
            <span className="text-[10px] text-stone-400 mt-1">Handcrafted in Atelier</span>
          </div>
        )}

        {/* Quick View / Play overlay prompt */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
          <span className="bg-stone-900/90 text-stone-100 text-xs font-medium px-3 py-1.5 rounded-md shadow-xs backdrop-blur-xs flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>Inspect & Test Play</span>
          </span>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        {/* Unboxed Metadata with Typographic Separator */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>{product.ageRangeLabel}</span>
            {product.pieceCount && (
              <>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span>{product.pieceCount} pcs</span>
              </>
            )}
          </div>

          <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 group-hover:text-amber-900 transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold font-mono tabular-nums text-stone-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs font-mono tabular-nums text-stone-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Rating display */}
            <div className="hidden sm:flex items-center gap-1 text-xs text-stone-500">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-mono tabular-nums">{product.rating}</span>
            </div>

            {/* Quick Add Button */}
            <button
              onClick={handleQuickAdd}
              aria-label={`Add ${product.name} to bag`}
              className="inline-flex items-center gap-1 bg-stone-100 hover:bg-stone-900 hover:text-white text-stone-800 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
