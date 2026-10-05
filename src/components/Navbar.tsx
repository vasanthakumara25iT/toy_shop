import React, { useState } from 'react';
import { Volume2, VolumeX, Heart, ShoppingBag, Search, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

interface NavbarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenGiftFinder: () => void;
  onSearchToggle: () => void;
  isSearching: boolean;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenGiftFinder,
  onSearchToggle,
  isSearching,
  searchQuery,
  setSearchQuery,
}) => {
  const [isMuted, setIsMuted] = useState(sound.getMuted());
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      sound.playChime(659.25, 0.4);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200/80 transition-all">
      {/* Slim Promotional Bar (<= 40px) */}
      {!bannerDismissed && (
        <div className="bg-[#1C2723] text-stone-200 text-xs px-4 py-1.5 flex items-center justify-between border-b border-stone-800">
          <div className="mx-auto flex items-center gap-2">
            <span className="text-amber-300">✦</span>
            <span>Artisan gift-wrapping & handwritten card included on all orders over $50</span>
          </div>
          <button
            onClick={() => setBannerDismissed(true)}
            aria-label="Dismiss banner"
            className="text-stone-400 hover:text-white text-xs px-1 cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>
      )}

      {/* Strict 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            sound.playChime(523.25, 0.5);
            onSelectTab('catalog');
          }}
          className="font-display text-2xl font-bold tracking-tight text-stone-900 hover:text-amber-800 transition-colors whitespace-nowrap"
        >
          Wonderhaus
        </a>

        {/* Zone 2: 4–6 text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <button
            onClick={() => {
              sound.playChime(587.33, 0.2);
              onSelectTab('catalog');
            }}
            className={`cursor-pointer transition-colors hover:text-stone-900 ${
              activeTab === 'catalog' ? 'text-stone-900 font-semibold underline underline-offset-8 decoration-amber-600 decoration-2' : ''
            }`}
          >
            Catalog
          </button>
          <button
            onClick={() => {
              sound.playChime(659.25, 0.2);
              onOpenGiftFinder();
            }}
            className="cursor-pointer transition-colors hover:text-stone-900 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Gift Finder</span>
          </button>
          <button
            onClick={() => {
              sound.playChime(783.99, 0.3);
              onSelectTab('playground');
            }}
            className={`cursor-pointer transition-colors hover:text-stone-900 ${
              activeTab === 'playground' ? 'text-stone-900 font-semibold underline underline-offset-8 decoration-amber-600 decoration-2' : ''
            }`}
          >
            Playroom
          </button>
          <button
            onClick={() => {
              sound.playChime(523.25, 0.2);
              onSelectTab('atelier');
            }}
            className={`cursor-pointer transition-colors hover:text-stone-900 ${
              activeTab === 'atelier' ? 'text-stone-900 font-semibold underline underline-offset-8 decoration-amber-600 decoration-2' : ''
            }`}
          >
            Our Workshop
          </button>
          <button
            onClick={() => {
              sound.playChime(659.25, 0.2);
              onSelectTab('orders');
            }}
            className={`cursor-pointer transition-colors hover:text-stone-900 ${
              activeTab === 'orders' ? 'text-stone-900 font-semibold underline underline-offset-8 decoration-amber-600 decoration-2' : ''
            }`}
          >
            Orders
          </button>
        </nav>

        {/* Zone 3: 1–2 primary actions + functional icons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search toggle */}
          <div className="relative flex items-center">
            {isSearching ? (
              <div className="flex items-center bg-white border border-stone-300 rounded-lg px-2.5 py-1 text-xs shadow-xs">
                <Search className="w-3.5 h-3.5 text-stone-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search toys, wood, age..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="outline-none text-stone-800 placeholder-stone-400 w-36 sm:w-48 bg-transparent"
                />
                <button
                  onClick={onSearchToggle}
                  className="text-stone-400 hover:text-stone-700 ml-1 text-xs"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={onSearchToggle}
                aria-label="Search toys"
                className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 rounded-lg transition-colors cursor-pointer"
                title="Search toys"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sound Synthesizer Mute / Unmute */}
          <button
            onClick={toggleSound}
            aria-label={isMuted ? 'Unmute sound effects' : 'Mute sound effects'}
            className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 rounded-lg transition-colors cursor-pointer"
            title={isMuted ? 'Sound off' : 'Acoustic sound enabled'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-stone-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-amber-700" />
            )}
          </button>

          {/* Wishlist */}
          <button
            onClick={() => {
              sound.playChime(659.25, 0.2);
              onOpenWishlist();
            }}
            aria-label="Saved toys"
            className="relative p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 rounded-lg transition-colors cursor-pointer"
            title="Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-600 text-white font-mono text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Bag Button (Action) */}
          <button
            onClick={() => {
              sound.playChime(783.99, 0.3);
              onOpenCart();
            }}
            className="flex items-center gap-2 bg-[#1C2723] hover:bg-[#273832] text-stone-100 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors shadow-xs cursor-pointer whitespace-nowrap"
          >
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Toy Bag</span>
            <span className="bg-amber-500/20 text-amber-300 font-mono text-xs px-1.5 py-0.5 rounded-sm tabular-nums font-semibold">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
