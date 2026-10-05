import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, TreePine, Award } from 'lucide-react';
import { sound } from '../utils/audio';
import heroToyAtelier from '../assets/images/hero_toy_atelier_1791180746147.jpg';

interface HeroSectionProps {
  onExploreCatalog: () => void;
  onOpenGiftFinder: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCatalog,
  onOpenGiftFinder,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#F6F3EE] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Value Propositions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800">
              <span className="w-2 h-2 rounded-full bg-amber-600"></span>
              <span>Bavarian Craftsmanship · Heirloom Edition 2026</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.1] [text-wrap:balance]">
              Toys crafted for childhood wonder & generations to come.
            </h1>

            <p className="text-stone-600 text-base sm:text-lg max-w-xl leading-relaxed">
              We hand-turn sustainably harvested Alpine beechwood, tune acoustic brass chimes, and stitch organic wool companions—giving children tactile play that outlasts fleeting screens.
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={() => {
                  sound.playChime(659.25, 0.3);
                  onExploreCatalog();
                }}
                className="inline-flex items-center gap-2.5 bg-[#1C2723] hover:bg-[#273832] text-stone-100 px-6 py-3.5 rounded-lg text-sm font-medium transition-all shadow-sm cursor-pointer whitespace-nowrap group"
              >
                <span>Explore the Workshop Collection</span>
                <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  sound.playChime(783.99, 0.3);
                  onOpenGiftFinder();
                }}
                className="inline-flex items-center gap-2 bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 px-5 py-3.5 rounded-lg text-sm font-medium transition-all shadow-2xs cursor-pointer whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Gift Finder by Age</span>
              </button>
            </div>

            {/* Proof Marker Adjacent to Claim */}
            <div className="pt-6 border-t border-stone-200/80 grid grid-cols-3 gap-4 text-xs text-stone-600">
              <div className="flex items-start gap-2">
                <TreePine className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-900">100% FSC Beech</div>
                  <div className="text-stone-500">Sustainably forested</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-900">Baby Safe Finishes</div>
                  <div className="text-stone-500">Organic beeswax & oils</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Award className="w-4 h-4 text-stone-800 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-900">Enduring Durability</div>
                  <div className="text-stone-500">10-year repair pledge</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Atelier Hero Imagery */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-stone-200/70 bg-stone-100 aspect-4/3 sm:aspect-16/11">
              <img
                src={heroToyAtelier}
                alt="Sunlit Wonderhaus toy artisan atelier workshop with wooden trains and brass telescopes"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              {/* Subtle natural lighting vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-3 left-3 right-3 p-3 bg-white/90 backdrop-blur-md rounded-xl border border-stone-200/60 shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-stone-900">The Wonderhaus Studio</p>
                  <p className="text-[11px] text-stone-500">Where each toy is calibrated & tested by hand</p>
                </div>
                <span className="text-[11px] font-mono text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                  Est. 1984
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
