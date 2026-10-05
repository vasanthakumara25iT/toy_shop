import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, Check, RotateCcw } from 'lucide-react';
import { ToyProduct } from '../types';
import { TOY_PRODUCTS } from '../data/products';
import { sound } from '../utils/audio';

interface GiftFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: ToyProduct) => void;
  onAddToCart: (product: ToyProduct) => void;
}

export const GiftFinderModal: React.FC<GiftFinderModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onAddToCart,
}) => {
  const [selectedAge, setSelectedAge] = useState<string>('3-5');
  const [selectedInterest, setSelectedInterest] = useState<string>('wooden');
  const [selectedBudget, setSelectedBudget] = useState<string>('all');

  if (!isOpen) return null;

  // Filter recommendations based on criteria
  const recommendations = TOY_PRODUCTS.filter((product) => {
    const ageMatch = selectedAge === 'all' || product.ageRange === selectedAge || (selectedAge === '0-2' && product.ageRange === '0-2');
    const interestMatch =
      selectedInterest === 'all' ||
      (selectedInterest === 'wooden' && (product.category === 'wooden' || product.id.includes('train') || product.id.includes('block'))) ||
      (selectedInterest === 'musical' && (product.category === 'musical' || product.id.includes('music') || product.id.includes('chime'))) ||
      (selectedInterest === 'steam' && (product.category === 'steam' || product.id.includes('rover') || product.id.includes('astrolabe'))) ||
      (selectedInterest === 'plush' && product.category === 'plush') ||
      (selectedInterest === 'puzzles' && product.category === 'puzzles');

    const budgetMatch =
      selectedBudget === 'all' ||
      (selectedBudget === 'under60' && product.price <= 60) ||
      (selectedBudget === 'over60' && product.price > 60);

    return (ageMatch && interestMatch && budgetMatch) || (interestMatch && budgetMatch);
  }).slice(0, 3);

  // Fallback to top rated if too strict
  const finalResults = recommendations.length > 0 ? recommendations : TOY_PRODUCTS.slice(0, 3);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="gift-finder-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200 bg-[#FAF8F5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <h2 id="gift-finder-title" className="font-serif text-lg font-bold text-stone-900">
              The Wonder Matcher Gift Guide
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close gift guide"
            className="p-1.5 text-stone-400 hover:text-stone-800 rounded-lg hover:bg-stone-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Questionnaire Form */}
        <div className="p-6 space-y-6 max-h-[82vh] overflow-y-auto">
          {/* Question 1: Age */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-800 uppercase tracking-wider">
              1. Who are you gifting for? (Child’s Age)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: '0-2', label: '0–2 Years', sub: 'Sensory & Soft' },
                { id: '3-5', label: '3–5 Years', sub: 'Early Explorer' },
                { id: '6-8', label: '6–8 Years', sub: 'Curious Builder' },
                { id: '9+', label: '9+ Years', sub: 'Junior Maker' },
              ].map((age) => (
                <button
                  key={age.id}
                  type="button"
                  onClick={() => {
                    sound.playBlockTap();
                    setSelectedAge(age.id);
                  }}
                  className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                    selectedAge === age.id
                      ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                      : 'border-stone-200 bg-stone-50 hover:bg-white text-stone-800'
                  }`}
                >
                  <div className="text-xs font-bold">{age.label}</div>
                  <div
                    className={`text-[10px] ${
                      selectedAge === age.id ? 'text-stone-300' : 'text-stone-500'
                    }`}
                  >
                    {age.sub}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Question 2: Play Interest */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-800 uppercase tracking-wider">
              2. What sparks their curiosity?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'wooden', label: 'Building & Architecture', desc: 'Blocks & Trains' },
                { id: 'musical', label: 'Acoustic Sound', desc: 'Chimes & Music Boxes' },
                { id: 'steam', label: 'Science & Invention', desc: 'Solar & Optics' },
                { id: 'plush', label: 'Gentle Companions', desc: 'Hearth & Cuddle' },
                { id: 'puzzles', label: 'Color & Geometry', desc: 'Tangrams & Logic' },
                { id: 'all', label: 'Surprise Me', desc: 'Workshop Favorites' },
              ].map((interest) => (
                <button
                  key={interest.id}
                  type="button"
                  onClick={() => {
                    sound.playBlockTap();
                    setSelectedInterest(interest.id);
                  }}
                  className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                    selectedInterest === interest.id
                      ? 'border-amber-700 bg-amber-50/80 text-amber-950 font-semibold'
                      : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-800'
                  }`}
                >
                  <div className="text-xs font-bold">{interest.label}</div>
                  <div className="text-[10px] text-stone-500">{interest.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Matched Curated Recommendations */}
          <div className="pt-4 border-t border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-base font-bold text-stone-900">
                Curated Atelier Matches ({finalResults.length})
              </h3>
              <span className="text-[11px] text-amber-800 font-medium">
                Handpicked for this developmental stage
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {finalResults.map((toy) => (
                <div
                  key={toy.id}
                  className="bg-[#FAF8F5] border border-stone-200 rounded-xl overflow-hidden flex flex-col justify-between p-3 space-y-2"
                >
                  <div className="relative aspect-4/3 rounded-lg overflow-hidden bg-white border border-stone-200/60">
                    <img
                      src={toy.image}
                      alt={toy.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <div className="text-[10px] text-stone-500 font-mono">
                      {toy.ageRangeLabel}
                    </div>
                    <h4 className="font-serif text-xs font-bold text-stone-900 line-clamp-1">
                      {toy.name}
                    </h4>
                    <span className="font-mono text-xs font-bold text-stone-900">
                      ${toy.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="pt-1 flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        sound.playChime(659.25, 0.2);
                        onClose();
                        onSelectProduct(toy);
                      }}
                      className="flex-1 bg-white hover:bg-stone-100 text-stone-800 text-[11px] font-semibold py-1.5 rounded border border-stone-300 transition-colors cursor-pointer"
                    >
                      View
                    </button>
                    <button
                      onClick={() => {
                        sound.playChime(783.99, 0.2);
                        onAddToCart(toy);
                      }}
                      className="bg-stone-900 hover:bg-stone-800 text-white text-[11px] font-semibold px-2.5 py-1.5 rounded transition-colors cursor-pointer"
                    >
                      + Bag
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
