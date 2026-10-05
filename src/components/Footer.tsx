import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, TreePine, MapPin } from 'lucide-react';
import { sound } from '../utils/audio';

interface FooterProps {
  onSelectTab: (tab: string) => void;
  onOpenGiftFinder: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  onOpenGiftFinder,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      sound.playChime(783.99, 0.3);
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#18201E] text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-display text-2xl font-bold tracking-tight text-stone-100">
              Wonderhaus
            </span>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              An independent artisan toy workshop founded in the Bavarian foothills. Dedicated to slow, tactile play, non-toxic plant pigments, and heirloom woodcraft built to survive childhood and be passed down to the next generation.
            </p>
            <div className="flex items-center gap-2 text-xs text-stone-400 pt-1">
              <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Fraunhoferstraße 18, 80469 München, Germany</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onSelectTab('catalog')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Handcrafted Wooden
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('catalog')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  STEAM & Discovery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('catalog')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Musical & Sound
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('catalog')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Gentle Companions
                </button>
              </li>
            </ul>
          </div>

          {/* Experience Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
              Experience
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={onOpenGiftFinder}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Gift Finder by Age
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('playground')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Digital Playroom
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('atelier')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Our Sustainability
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('orders')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Order Status
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">
              The Atelier Gazette
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Seasonal workshop dispatches, toy carving blueprints, and early access to limited seasonal runs.
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-950/60 border border-emerald-700/60 rounded-lg text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Thank you. You’re on the workshop guest ledger.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="parent@example.com"
                  required
                  className="flex-1 text-xs px-3 py-2 bg-stone-900 border border-stone-700 rounded-lg text-stone-200 outline-none focus:border-amber-500 placeholder-stone-500"
                />
                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}

            <div className="pt-2 flex items-center gap-3 text-[11px] text-stone-500">
              <span className="flex items-center gap-1">
                <TreePine className="w-3.5 h-3.5 text-emerald-500" />
                <span>1 Tree Planted / Order</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                <span>CE & ASTM F963 Compliant</span>
              </span>
            </div>
          </div>

        </div>

        {/* Quiet Bottom Copyright */}
        <div className="pt-8 border-t border-stone-800 text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Wonderhaus Atelier GmbH. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <span>Safety Directives</span>
            <span>·</span>
            <span>Privacy Standard</span>
            <span>·</span>
            <span>Heirloom Warranty</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
