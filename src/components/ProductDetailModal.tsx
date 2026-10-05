import React, { useState } from 'react';
import {
  X,
  Star,
  Heart,
  ShoppingBag,
  ShieldCheck,
  TreePine,
  Sparkles,
  Gift,
  CheckCircle,
  Play,
  RotateCw
} from 'lucide-react';
import { ToyProduct } from '../types';
import { sound } from '../utils/audio';

interface ProductDetailModalProps {
  product: ToyProduct | null;
  onClose: () => void;
  onAddToCart: (product: ToyProduct, quantity: number, giftWrap: boolean, giftMessage?: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: ToyProduct) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'craft' | 'reviews'>('details');

  if (!product) return null;

  const handleInteractivePlay = () => {
    setIsPlayingSound(true);
    const feature = product.interactiveFeature;

    if (feature.type === 'train') {
      sound.playTrainWhistle();
    } else if (feature.type === 'music_box') {
      sound.playMusicBoxMelody();
    } else if (feature.type === 'plush') {
      sound.playPlushSqueak();
    } else if (feature.type === 'gears') {
      sound.playGearClick();
      setTimeout(() => sound.playGearClick(), 120);
      setTimeout(() => sound.playGearClick(), 240);
    } else {
      sound.playChime(659.25, 0.8);
      setTimeout(() => sound.playChime(783.99, 0.8), 200);
      setTimeout(() => sound.playChime(1046.5, 1.0), 400);
    }

    setTimeout(() => {
      setIsPlayingSound(false);
    }, 1500);
  };

  const handleAdd = () => {
    sound.playChime(783.99, 0.3);
    onAddToCart(product, quantity, giftWrap, giftWrap ? giftMessage : undefined);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close product modal"
          className="absolute top-4 right-4 z-20 p-2 text-stone-500 hover:text-stone-900 bg-white/90 backdrop-blur-xs rounded-full border border-stone-200/80 shadow-xs cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left: Gallery & Interactive Play Station */}
            <div className="md:col-span-6 space-y-4">
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-[#F5F2EC] border border-stone-200/80 shadow-xs">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                
                {product.editorialTag && (
                  <span className="absolute top-3 left-3 text-xs font-medium tracking-wide text-stone-700 bg-white/95 px-2.5 py-1 rounded-sm border border-stone-200 shadow-2xs">
                    {product.editorialTag}
                  </span>
                )}
              </div>

              {/* Interactive Acoustic Play Station Simulator */}
              <div className="p-4 bg-[#FAF8F5] border border-stone-200 rounded-xl space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                      Interactive Play Simulator
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-500 font-mono">Acoustic Audio</span>
                </div>

                <p className="text-xs text-stone-600">
                  {product.interactiveFeature.hint}
                </p>

                <button
                  onClick={handleInteractivePlay}
                  disabled={isPlayingSound}
                  className="w-full flex items-center justify-center gap-2 bg-white hover:bg-stone-50 active:bg-amber-50 text-stone-800 border border-stone-300 px-4 py-2.5 rounded-lg text-xs font-semibold shadow-2xs transition-all cursor-pointer group"
                >
                  {isPlayingSound ? (
                    <>
                      <RotateCw className="w-4 h-4 text-amber-600 animate-spin" />
                      <span>Sounding in Progress...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-amber-600 text-amber-600 group-hover:scale-110 transition-transform" />
                      <span>{product.interactiveFeature.actionPrompt}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Craftsmanship Trust Callout */}
              <div className="p-3.5 bg-stone-50 border border-stone-200/60 rounded-xl space-y-1.5 text-xs text-stone-600">
                <div className="flex items-center gap-2 font-medium text-stone-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Certified Non-Toxic & Safety Verified</span>
                </div>
                <p className="text-[11px] leading-relaxed text-stone-500">
                  {product.safetyStandard}
                </p>
              </div>
            </div>

            {/* Right: Contiguous Purchase Module */}
            <div className="md:col-span-6 space-y-5">
              {/* Unboxed Header Metadata */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <span>{product.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>{product.ageRangeLabel}</span>
                  {product.pieceCount && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{product.pieceCount} Pieces</span>
                    </>
                  )}
                </div>

                <h2 id="product-modal-title" className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                  {product.name}
                </h2>
                <p className="text-xs text-stone-500 font-medium">
                  {product.subtitle}
                </p>
              </div>

              {/* Price & Rating */}
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold font-mono tabular-nums text-stone-900">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm font-mono tabular-nums text-stone-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-xs font-semibold text-stone-800">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-mono tabular-nums">{product.rating}</span>
                  </div>
                  <span className="text-xs text-stone-400 font-mono">
                    ({product.reviewsCount} reviews)
                  </span>
                </div>
              </div>

              {/* Tabs for Details, Craft, and Reviews */}
              <div className="space-y-3">
                <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg text-xs font-medium">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`flex-1 py-1.5 rounded-md transition-colors cursor-pointer ${
                      activeTab === 'details'
                        ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('craft')}
                    className={`flex-1 py-1.5 rounded-md transition-colors cursor-pointer ${
                      activeTab === 'craft'
                        ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Materials & Specs
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`flex-1 py-1.5 rounded-md transition-colors cursor-pointer ${
                      activeTab === 'reviews'
                        ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Reviews ({product.reviews.length})
                  </button>
                </div>

                <div className="min-h-32 text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {activeTab === 'details' && (
                    <div className="space-y-2">
                      <p>{product.fullDescription}</p>
                      <div className="pt-2 flex items-center gap-2 text-xs text-emerald-800">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>In stock at Bavarian Atelier — ships within 24 hours</span>
                      </div>
                    </div>
                  )}

                  {activeTab === 'craft' && (
                    <div className="space-y-2.5 text-xs">
                      <div>
                        <span className="font-semibold text-stone-900">Materials: </span>
                        <span>{product.materials}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-stone-900">Dimensions: </span>
                        <span className="font-mono">{product.dimensions}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-stone-900">Crafting Technique: </span>
                        <span>{product.craftsmanshipNotes}</span>
                      </div>
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-3 max-h-44 overflow-y-auto pr-1">
                      {product.reviews.map((rev) => (
                        <div key={rev.id} className="p-3 bg-stone-50 rounded-lg space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-stone-900">{rev.author}</span>
                            <span className="text-[11px] text-stone-400">{rev.date}</span>
                          </div>
                          <div className="flex items-center gap-1 text-[11px] text-stone-500">
                            <span>{rev.city}</span>
                            <span>·</span>
                            <span className="text-emerald-700">Verified Purchase</span>
                          </div>
                          <p className="text-xs text-stone-700 italic">“{rev.comment}”</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Gift Wrapping Add-on */}
              <div className="p-3.5 bg-[#FAF8F5] border border-stone-200/80 rounded-xl space-y-2">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-amber-700" />
                    <span className="text-xs font-semibold text-stone-900">
                      Include Artisan Gift Wrapping & Handwritten Card (+$4.50)
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={giftWrap}
                    onChange={(e) => setGiftWrap(e.target.checked)}
                    className="accent-amber-600 w-4 h-4 rounded cursor-pointer"
                  />
                </label>

                {giftWrap && (
                  <input
                    type="text"
                    placeholder="Enter gift message (e.g. Happy 4th Birthday Theo! With love, Grandma)"
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded-lg outline-none focus:border-amber-600 text-stone-800"
                  />
                )}
              </div>

              {/* Quantity Stepper & Actions */}
              <div className="pt-2 flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50 overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-stone-700 hover:bg-stone-200 cursor-pointer font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-mono font-bold tabular-nums text-stone-900 min-w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-stone-700 hover:bg-stone-200 cursor-pointer font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Primary Buy CTA */}
                <button
                  onClick={handleAdd}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#1C2723] hover:bg-[#273832] text-stone-100 py-3 px-5 rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-400" />
                  <span>
                    Add to Bag · ${(product.price * quantity + (giftWrap ? 4.5 : 0)).toFixed(2)}
                  </span>
                </button>

                {/* Wishlist toggle */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  aria-label="Wishlist toggle"
                  className="p-3 border border-stone-300 rounded-lg hover:bg-stone-50 text-stone-700 cursor-pointer transition-colors"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isWishlisted ? 'fill-red-600 text-red-600' : 'text-stone-600'
                    }`}
                  />
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
