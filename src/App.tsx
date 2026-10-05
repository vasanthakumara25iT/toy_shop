import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  SlidersHorizontal,
  Search,
  Check,
  Package,
  Heart,
  ShoppingBag,
  ArrowRight,
  Filter
} from 'lucide-react';
import { ToyProduct, CartItem, Order } from './types';
import { TOY_PRODUCTS, CATEGORIES, AGE_RANGES } from './data/products';
import { sound } from './utils/audio';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { GiftFinderModal } from './components/GiftFinderModal';
import { PlaygroundLab } from './components/PlaygroundLab';
import { AtelierStorySection } from './components/AtelierStorySection';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { WishlistModal } from './components/WishlistModal';
import { Footer } from './components/Footer';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<string>('catalog');

  // Persistence: Cart, Wishlist, Orders
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('wonderhaus_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('wonderhaus_wishlist');
      return saved ? JSON.parse(saved) : ['wonder-train-01'];
    } catch {
      return ['wonder-train-01'];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('wonderhaus_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('wonderhaus_cart', JSON.stringify(cart));
    } catch {
      // storage quota or private mode
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('wonderhaus_wishlist', JSON.stringify(wishlistIds));
    } catch {
      // ignore
    }
  }, [wishlistIds]);

  useEffect(() => {
    try {
      localStorage.setItem('wonderhaus_orders', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  // Filtering & Sorting
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAge, setSelectedAge] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState<ToyProduct | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isGiftFinderOpen, setIsGiftFinderOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);

  // Subtle Feedback Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Cart operations
  const handleAddToCart = (
    product: ToyProduct,
    quantity: number = 1,
    giftWrap: boolean = false,
    giftMessage?: string
  ) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex((item) => item.product.id === product.id);
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        if (giftWrap) {
          next[existingIdx].giftWrap = true;
          if (giftMessage) next[existingIdx].giftMessage = giftMessage;
        }
        return next;
      }
      return [...prev, { product, quantity, giftWrap, giftMessage }];
    });
    showToast(`Added ${quantity} × ${product.name} to Toy Bag`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Wishlist operations
  const handleToggleWishlist = (product: ToyProduct) => {
    setWishlistIds((prev) => {
      if (prev.includes(product.id)) {
        showToast(`Removed ${product.name} from Toy Chest`);
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Saved ${product.name} to Toy Chest`);
        return [...prev, product.id];
      }
    });
  };

  const handleOrderSuccess = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]); // Clear cart upon successful order
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    let result = [...TOY_PRODUCTS];

    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedAge !== 'all') {
      result = result.filter((p) => p.ageRange === selectedAge);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.materials.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // featured: keep featured items near top
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [selectedCategory, selectedAge, sortBy, searchQuery]);

  const wishlistProducts = useMemo(() => {
    return TOY_PRODUCTS.filter((p) => wishlistIds.includes(p.id));
  }, [wishlistIds]);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-amber-200">
      {/* Navbar with 3-Zone Contract */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'orders') setIsOrdersOpen(true);
        }}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenGiftFinder={() => setIsGiftFinderOpen(true)}
        onSearchToggle={() => setIsSearching(!isSearching)}
        isSearching={isSearching}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'catalog' && (
          <>
            {/* Campaign Hero Showcase */}
            <HeroSection
              onExploreCatalog={() => {
                const el = document.getElementById('catalog-grid');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenGiftFinder={() => setIsGiftFinderOpen(true)}
            />

            {/* Catalog & Filter Section */}
            <section id="catalog-grid" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
              
              {/* Filter and Control Bar */}
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-4">
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                      The Atelier Collection
                    </h2>
                    <p className="text-xs text-stone-500 font-medium">
                      Showing {filteredProducts.length} handcrafted toys
                    </p>
                  </div>

                  {/* Age Range Filter & Sort Controls */}
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Age Filter Selector */}
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="text-stone-500 font-medium hidden sm:inline">Age:</span>
                      <select
                        value={selectedAge}
                        onChange={(e) => {
                          sound.playBlockTap();
                          setSelectedAge(e.target.value);
                        }}
                        aria-label="Filter by age"
                        className="bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs text-stone-800 outline-none focus:border-stone-900 cursor-pointer shadow-2xs"
                      >
                        {AGE_RANGES.map((age) => (
                          <option key={age.id} value={age.id}>
                            {age.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Sort Selector */}
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="text-stone-500 font-medium hidden sm:inline">Sort:</span>
                      <select
                        value={sortBy}
                        onChange={(e) => {
                          sound.playBlockTap();
                          setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc' | 'rating');
                        }}
                        aria-label="Sort products"
                        className="bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs text-stone-800 outline-none focus:border-stone-900 cursor-pointer shadow-2xs"
                      >
                        <option value="featured">Featured Atelier Run</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="rating">Highest Rated</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Category Segmented Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        sound.playBlockTap();
                        setSelectedCategory(cat.id);
                      }}
                      className={`px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                        selectedCategory === cat.id
                          ? 'bg-stone-900 text-stone-100 shadow-2xs font-semibold'
                          : 'bg-white border border-stone-200/90 text-stone-600 hover:text-stone-900 hover:border-stone-300'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Grid */}
              {filteredProducts.length === 0 ? (
                <div className="py-16 text-center space-y-3 bg-white rounded-2xl border border-stone-200 p-8">
                  <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                    <Filter className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-stone-800">
                    No toys match this combination
                  </h3>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto">
                    Try resetting your filters or search terms to view all handcrafted toys from our workshop.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedAge('all');
                      setSearchQuery('');
                    }}
                    className="inline-flex items-center gap-1.5 bg-stone-900 text-white text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onSelect={(p) => setSelectedProduct(p)}
                      onAddToCart={(p) => handleAddToCart(p, 1)}
                      isWishlisted={wishlistIds.includes(product.id)}
                      onToggleWishlist={handleToggleWishlist}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Atelier Story Section */}
            <AtelierStorySection
              onExploreCatalog={() => {
                const el = document.getElementById('catalog-grid');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </>
        )}

        {/* Dedicated Playground Lab Tab */}
        {activeTab === 'playground' && (
          <PlaygroundLab />
        )}

        {/* Dedicated Atelier Craftsmanship Tab */}
        {activeTab === 'atelier' && (
          <div className="space-y-12">
            <AtelierStorySection
              onExploreCatalog={() => {
                setActiveTab('catalog');
                setTimeout(() => {
                  const el = document.getElementById('catalog-grid');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
              <div className="p-8 bg-white border border-stone-200 rounded-2xl shadow-xs space-y-4">
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  Our Toymaker’s Oath
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed max-w-3xl">
                  “We promise never to use toxic petrochemical finishes, never to design planned obsolescence into gears or joints, and never to forget that a child’s toy is their first tactile instrument of human culture.”
                </p>
                <div className="pt-2 flex items-center gap-3 text-xs text-stone-500 font-mono">
                  <span>Signed by the Wonderhaus Guild of Woodturners & Luthiers</span>
                  <span>·</span>
                  <span>München, 2026</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dedicated Orders Tab */}
        {activeTab === 'orders' && (
          <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div>
                <h2 className="font-serif text-3xl font-bold text-stone-900">
                  Order Status & Atelier Dispatch
                </h2>
                <p className="text-xs text-stone-500">
                  Track your handcrafted packages and wax-sealed certificates
                </p>
              </div>
              <button
                onClick={() => setActiveTab('catalog')}
                className="text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
              >
                ← Back to Catalog
              </button>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-16 bg-white border border-stone-200 rounded-2xl p-8 space-y-4">
                <Package className="w-12 h-12 text-stone-300 mx-auto" />
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  No active orders found
                </h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  When you purchase an item from our workshop, you can view your parcel status and invoice receipt here.
                </p>
                <button
                  onClick={() => setActiveTab('catalog')}
                  className="bg-stone-900 text-white text-xs font-semibold px-5 py-2.5 rounded-lg cursor-pointer"
                >
                  Explore Heirloom Collection
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-white border border-stone-200 rounded-2xl p-6 shadow-2xs space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
                      <div>
                        <span className="font-bold font-mono text-stone-900 text-sm">
                          Order {ord.orderNumber}
                        </span>
                        <span className="text-stone-400 mx-2">·</span>
                        <span className="text-xs text-stone-500">{ord.date}</span>
                      </div>
                      <span className="bg-emerald-50 text-emerald-800 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-200">
                        {ord.status}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {ord.items.map((it) => (
                        <div key={it.product.id} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <img
                              src={it.product.image}
                              alt={it.product.name}
                              referrerPolicy="no-referrer"
                              className="w-10 h-10 object-cover rounded-md border border-stone-200"
                            />
                            <div>
                              <div className="font-semibold text-stone-900">{it.product.name}</div>
                              <div className="text-[11px] text-stone-500">
                                Qty: {it.quantity} {it.giftWrap ? '· Gift Wrapped' : ''}
                              </div>
                            </div>
                          </div>
                          <span className="font-mono tabular-nums font-bold text-stone-900">
                            ${(it.product.price * it.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="text-stone-600">
                        Estimated arrival: <strong>{ord.estimatedDelivery}</strong>
                      </div>
                      <div className="font-mono font-bold text-sm text-stone-900">
                        Total: ${ord.total.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onExploreCatalog={() => setActiveTab('catalog')}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Gift Finder Modal */}
      <GiftFinderModal
        isOpen={isGiftFinderOpen}
        onClose={() => setIsGiftFinderOpen(false)}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onAddToCart={(p) => handleAddToCart(p, 1)}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onMoveToCart={(p) => {
          handleAddToCart(p, 1);
          handleToggleWishlist(p);
        }}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onExploreCatalog={() => {
          setIsWishlistOpen(false);
          setActiveTab('catalog');
        }}
      />

      {/* Order History Modal (from Navbar link) */}
      <OrderHistoryModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        orders={orders}
        onExploreCatalog={() => {
          setIsOrdersOpen(false);
          setActiveTab('catalog');
        }}
      />

      {/* Subtle Feedback Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1C2723] text-stone-100 text-xs px-4 py-2.5 rounded-lg shadow-lg border border-stone-700/80 flex items-center gap-2 transition-all">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Quiet Anti-Slop Footer */}
      <Footer
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenGiftFinder={() => setIsGiftFinderOpen(true)}
      />
    </div>
  );
}
