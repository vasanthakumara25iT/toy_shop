import React, { useState } from 'react';
import { Music, Layers, RotateCcw, Play, Volume2, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

const XYLOPHONE_KEYS = [
  { note: 'C5', freq: 523.25, color: '#C05621', height: 'h-48', label: '1 · Do' },
  { note: 'D5', freq: 587.33, color: '#DD6B20', height: 'h-44', label: '2 · Re' },
  { note: 'E5', freq: 659.25, color: '#D69E2E', height: 'h-40', label: '3 · Mi' },
  { note: 'F5', freq: 698.46, color: '#38A169', height: 'h-36', label: '4 · Fa' },
  { note: 'G5', freq: 783.99, color: '#319795', height: 'h-32', label: '5 · Sol' },
  { note: 'A5', freq: 880.0, color: '#3182CE', height: 'h-28', label: '6 · La' },
  { note: 'B5', freq: 987.77, color: '#805AD5', height: 'h-24', label: '7 · Ti' },
  { note: 'C6', freq: 1046.5, color: '#D53F8C', height: 'h-20', label: '8 · Do' },
];

const MELODIES: Record<string, number[]> = {
  twinkle: [523.25, 523.25, 783.99, 783.99, 880.0, 880.0, 783.99, 698.46, 698.46, 659.25, 659.25, 587.33, 587.33, 523.25],
  lullaby: [659.25, 659.25, 783.99, 659.25, 659.25, 783.99, 659.25, 783.99, 1046.5, 987.77, 880.0, 783.99],
  joy: [659.25, 659.25, 698.46, 783.99, 783.99, 698.46, 659.25, 587.33, 523.25, 523.25, 587.33, 659.25, 659.25, 587.33],
};

interface BlockItem {
  id: string;
  type: 'base' | 'arch' | 'column' | 'cube' | 'spire';
  label: string;
  heightCm: number;
}

export const PlaygroundLab: React.FC = () => {
  const [activePlayMode, setActivePlayMode] = useState<'xylophone' | 'blocks'>('xylophone');
  const [struckNote, setStruckNote] = useState<string | null>(null);
  const [isPlayingMelody, setIsPlayingMelody] = useState(false);

  // Block Tower State
  const [tower, setTower] = useState<BlockItem[]>([
    { id: '1', type: 'base', label: 'Heavy Beech Plinth', heightCm: 15 },
    { id: '2', type: 'arch', label: 'Roman Keystone Arch', heightCm: 20 },
    { id: '3', type: 'column', label: 'Doric Fluted Column', heightCm: 18 },
  ]);

  const handleStrikeNote = (freq: number, note: string) => {
    sound.playChime(freq, 1.2);
    setStruckNote(note);
    setTimeout(() => {
      setStruckNote(null);
    }, 200);
  };

  const handlePlayMelody = (songKey: 'twinkle' | 'lullaby' | 'joy') => {
    if (isPlayingMelody) return;
    setIsPlayingMelody(true);
    const notes = MELODIES[songKey];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        sound.playChime(freq, 0.7);
        const match = XYLOPHONE_KEYS.find((k) => Math.abs(k.freq - freq) < 5);
        if (match) {
          setStruckNote(match.note);
          setTimeout(() => setStruckNote(null), 180);
        }
        if (idx === notes.length - 1) {
          setIsPlayingMelody(false);
        }
      }, idx * 320);
    });
  };

  const handleAddBlock = (type: 'cube' | 'column' | 'arch' | 'spire') => {
    if (tower.length >= 10) return;
    sound.playBlockTap();
    const heights = { cube: 12, column: 18, arch: 20, spire: 24 };
    const labels = {
      cube: 'Solid Maple Cube',
      column: 'Twin Beech Pillar',
      arch: 'Gothic Portico Arch',
      spire: 'Atelier Cathedral Spire',
    };
    setTower((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random()}`,
        type,
        label: labels[type],
        heightCm: heights[type],
      },
    ]);
  };

  const handleResetTower = () => {
    sound.playBlockTap();
    setTower([{ id: '1', type: 'base', label: 'Heavy Beech Plinth', heightCm: 15 }]);
  };

  const totalHeight = tower.reduce((sum, b) => sum + b.heightCm, 0);

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Digital Atelier Playroom</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            Experience our toys before they arrive.
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-2xl">
            Test acoustic wood resonances, compose lullabies on tuned tonebars, or balance architectural building blocks.
          </p>
        </div>

        {/* Segmented Switcher for Playroom */}
        <div className="flex items-center gap-1 p-1 bg-stone-200/70 rounded-lg text-xs font-medium self-start sm:self-auto">
          <button
            onClick={() => setActivePlayMode('xylophone')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-md transition-colors cursor-pointer ${
              activePlayMode === 'xylophone'
                ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Music className="w-3.5 h-3.5 text-amber-600" />
            <span>Acoustic Chime Box</span>
          </button>
          <button
            onClick={() => setActivePlayMode('blocks')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-md transition-colors cursor-pointer ${
              activePlayMode === 'blocks'
                ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-amber-600" />
            <span>Architectural Tower</span>
          </button>
        </div>
      </div>

      {/* Main Play Area */}
      {activePlayMode === 'xylophone' ? (
        <div className="bg-[#FAF8F5] border border-stone-200 rounded-2xl p-6 sm:p-10 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Hand-Tuned Mountain Maple Chime Bars
              </h3>
              <p className="text-xs text-stone-500">
                Click any wooden bar or tap numbered melodies below
              </p>
            </div>

            {/* Quick Song Players */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500 font-medium hidden sm:inline">
                Play Melody:
              </span>
              <button
                disabled={isPlayingMelody}
                onClick={() => handlePlayMelody('twinkle')}
                className="inline-flex items-center gap-1 bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 text-xs px-3 py-1.5 rounded-md shadow-2xs cursor-pointer font-medium disabled:opacity-50"
              >
                <Play className="w-3 h-3 text-amber-600" />
                <span>Twinkle Star</span>
              </button>
              <button
                disabled={isPlayingMelody}
                onClick={() => handlePlayMelody('lullaby')}
                className="inline-flex items-center gap-1 bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 text-xs px-3 py-1.5 rounded-md shadow-2xs cursor-pointer font-medium disabled:opacity-50"
              >
                <Play className="w-3 h-3 text-amber-600" />
                <span>Brahms Lullaby</span>
              </button>
              <button
                disabled={isPlayingMelody}
                onClick={() => handlePlayMelody('joy')}
                className="inline-flex items-center gap-1 bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 text-xs px-3 py-1.5 rounded-md shadow-2xs cursor-pointer font-medium disabled:opacity-50"
              >
                <Play className="w-3 h-3 text-amber-600" />
                <span>Ode to Joy</span>
              </button>
            </div>
          </div>

          {/* Acoustic Wooden Glockenspiel Bar Rack */}
          <div className="py-6 px-4 bg-stone-100/80 rounded-2xl border border-stone-200 shadow-inner flex items-end justify-center gap-2 sm:gap-4 overflow-x-auto min-h-64">
            {XYLOPHONE_KEYS.map((key) => {
              const isStruck = struckNote === key.note;
              return (
                <button
                  key={key.note}
                  onClick={() => handleStrikeNote(key.freq, key.note)}
                  className={`group relative flex flex-col justify-between items-center w-12 sm:w-16 rounded-xl border border-stone-300/80 transition-all duration-150 cursor-pointer shadow-md select-none ${
                    key.height
                  } ${
                    isStruck
                      ? '-translate-y-1 shadow-lg ring-2 ring-amber-500 brightness-110'
                      : 'hover:-translate-y-0.5 active:translate-y-0'
                  }`}
                  style={{
                    backgroundColor: '#EFE9DF',
                    backgroundImage: 'linear-gradient(180deg, #FAF6EE 0%, #E8DFC8 100%)',
                  }}
                >
                  {/* Brass Felt Mount Peg Top */}
                  <div className="w-3 h-3 rounded-full bg-amber-700/80 shadow-inner mt-3 border border-amber-900/40" />

                  {/* Note Label */}
                  <div className="text-center mb-4">
                    <span className="font-serif text-sm font-bold text-stone-800 block">
                      {key.note}
                    </span>
                    <span className="text-[10px] text-stone-500 font-mono block">
                      {key.label}
                    </span>
                  </div>

                  {/* Brass Felt Mount Peg Bottom */}
                  <div className="w-3 h-3 rounded-full bg-amber-700/80 shadow-inner mb-3 border border-amber-900/40" />
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-stone-500 border-t border-stone-200/80 pt-3">
            <span className="flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-amber-700" />
              <span>Resonances synthesized with natural harmonic overtones</span>
            </span>
            <span className="font-mono">Tuned to 432 Hz Chamber Standard</span>
          </div>
        </div>
      ) : (
        /* Block Tower Simulation */
        <div className="bg-[#FAF8F5] border border-stone-200 rounded-2xl p-6 sm:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Controls & Block Shelf */}
          <div className="md:col-span-6 space-y-5">
            <div className="space-y-1">
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Architectural Timber Balancer
              </h3>
              <p className="text-xs text-stone-500">
                Add hand-milled hardwood units to construct balanced Froebel spires.
              </p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3 p-3 bg-white rounded-xl border border-stone-200">
              <div>
                <span className="text-[11px] text-stone-500">Constructed Height</span>
                <div className="font-mono text-xl font-bold tabular-nums text-stone-900">
                  {totalHeight} cm
                </div>
              </div>
              <div>
                <span className="text-[11px] text-stone-500">Total Timber Units</span>
                <div className="font-mono text-xl font-bold tabular-nums text-stone-900">
                  {tower.length} / 10
                </div>
              </div>
            </div>

            {/* Add Block Palette */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Choose Unit to Stack:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleAddBlock('cube')}
                  disabled={tower.length >= 10}
                  className="p-3 bg-white hover:bg-stone-50 border border-stone-300 rounded-lg text-left text-xs font-medium cursor-pointer disabled:opacity-40 transition-colors"
                >
                  <div className="font-bold text-stone-900">Solid Maple Cube</div>
                  <div className="text-[10px] text-stone-500">+12 cm · Stable base</div>
                </button>
                <button
                  onClick={() => handleAddBlock('column')}
                  disabled={tower.length >= 10}
                  className="p-3 bg-white hover:bg-stone-50 border border-stone-300 rounded-lg text-left text-xs font-medium cursor-pointer disabled:opacity-40 transition-colors"
                >
                  <div className="font-bold text-stone-900">Fluted Column</div>
                  <div className="text-[10px] text-stone-500">+18 cm · Classic pillar</div>
                </button>
                <button
                  onClick={() => handleAddBlock('arch')}
                  disabled={tower.length >= 10}
                  className="p-3 bg-white hover:bg-stone-50 border border-stone-300 rounded-lg text-left text-xs font-medium cursor-pointer disabled:opacity-40 transition-colors"
                >
                  <div className="font-bold text-stone-900">Roman Keystone Arch</div>
                  <div className="text-[10px] text-stone-500">+20 cm · Load-bearing</div>
                </button>
                <button
                  onClick={() => handleAddBlock('spire')}
                  disabled={tower.length >= 10}
                  className="p-3 bg-white hover:bg-stone-50 border border-stone-300 rounded-lg text-left text-xs font-medium cursor-pointer disabled:opacity-40 transition-colors"
                >
                  <div className="font-bold text-stone-900">Cathedral Spire</div>
                  <div className="text-[10px] text-stone-500">+24 cm · Crown pinnacle</div>
                </button>
              </div>
            </div>

            <button
              onClick={handleResetTower}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer pt-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Dismantle & Rebuild Tower</span>
            </button>
          </div>

          {/* Visual Tower Stack Display */}
          <div className="md:col-span-6 bg-[#F5F1E8] rounded-2xl p-6 border border-stone-200/90 flex flex-col justify-end items-center min-h-[380px] relative overflow-hidden shadow-inner">
            <div className="w-full flex flex-col-reverse items-center gap-1.5 max-w-xs transition-all duration-300">
              {tower.map((block) => (
                <div
                  key={block.id}
                  className="w-full flex items-center justify-center font-serif text-xs font-semibold text-amber-950 border border-amber-900/30 rounded shadow-xs transition-all animate-bounce"
                  style={{
                    backgroundColor:
                      block.type === 'base'
                        ? '#D2B48C'
                        : block.type === 'arch'
                        ? '#DEB887'
                        : block.type === 'spire'
                        ? '#C29B38'
                        : '#E3C16F',
                    height: `${block.heightCm * 1.8}px`,
                  }}
                >
                  {block.label}
                </div>
              ))}
            </div>

            {/* Atelier Tabletop Surface */}
            <div className="w-full h-4 bg-[#8B5A2B] rounded-t-sm shadow-md mt-2 border-t border-amber-900/50" />
          </div>
        </div>
      )}
    </section>
  );
};
