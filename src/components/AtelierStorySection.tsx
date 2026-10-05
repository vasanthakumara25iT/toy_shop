import React from 'react';
import { TreePine, HeartHandshake, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import { sound } from '../utils/audio';

interface AtelierStorySectionProps {
  onExploreCatalog: () => void;
}

export const AtelierStorySection: React.FC<AtelierStorySectionProps> = ({
  onExploreCatalog,
}) => {
  return (
    <section className="py-16 bg-[#F5F2EC] border-t border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800">
            <Compass className="w-4 h-4 text-amber-700" />
            <span>Philosophy & Sustainable Stewardship</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight [text-wrap:balance]">
            Crafted slowly from fallen alpine timber, not disposable petro-plastics.
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            In an era of disposable plastic novelties designed for landfills within days, Wonderhaus preserves the quiet dignity of slow play. We believe a child’s first playthings shape their sensory intuition for natural harmony.
          </p>
        </div>

        {/* 3 Columns of Craftsmanship & Evidence */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200/90 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <TreePine className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Responsible Alpine Forestry
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every timber block and locomotive chassis is milled from PEFC & FSC certified Bavarian beechwood and mountain maple. For every mature tree harvested, our cooperative replants two saplings in the Oberpfalz woodlands.
            </p>
            <div className="pt-2 text-[11px] font-mono text-emerald-800 font-semibold">
              100% Traceable Wood Batch #BY-2026
            </div>
          </div>

          {/* Column 2 */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200/90 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Edible-Grade Plant Stains
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Babies explore with their hands and mouths. Our colors are derived from beet extracts, walnut hulls, turmeric, and indigo plants, sealed in warm beeswax and cold-pressed linseed oil.
            </p>
            <div className="pt-2 text-[11px] font-mono text-amber-800 font-semibold">
              Certified EN71-3 Safe for Teething
            </div>
          </div>

          {/* Column 3 */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200/90 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Heirloom Repair Guarantee
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              If an axle loosens or a train car needs fresh oil after years of spirited bedroom adventures, send it back to our Munich bench. We re-tune, sand, and re-wax your family heirloom free of charge.
            </p>
            <div className="pt-2 text-[11px] font-mono text-stone-700 font-semibold">
              Lifetime Care & Restoration Pledge
            </div>
          </div>
        </div>

        {/* Workshop Invitation Banner */}
        <div className="bg-[#1C2723] rounded-2xl p-8 sm:p-10 text-stone-100 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif text-2xl font-bold text-white">
              Visiting Bavaria? Stop by the Atelier.
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
              Children and families are welcome to test prototypes, observe master woodturners at the lathe, and tune their own glockenspiel tonebars.
            </p>
          </div>

          <button
            onClick={() => {
              sound.playChime(659.25, 0.3);
              onExploreCatalog();
            }}
            className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold text-xs px-6 py-3 rounded-lg transition-colors cursor-pointer whitespace-nowrap shadow-xs"
          >
            Explore Workshop Products
          </button>
        </div>

      </div>
    </section>
  );
};
