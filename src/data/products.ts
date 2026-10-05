import { ToyProduct } from '../types';

export const TOY_PRODUCTS: ToyProduct[] = [
  {
    id: 'wonder-train-01',
    name: 'Alpen Express Heirloom Train',
    subtitle: 'Magnetic Beechwood Locomotive & Saloon Cars',
    category: 'wooden',
    categoryLabel: 'Handcrafted Wooden',
    ageRange: '3-5',
    ageRangeLabel: 'Ages 3–6',
    price: 68.0,
    originalPrice: 78.0,
    rating: 4.9,
    reviewsCount: 38,
    image: '/src/assets/images/toy_wooden_train_1791180760328.jpg',
    materials: 'FSC-Certified Alpine Beechwood, Solid Brass Axles, Neodymium Safety Magnets',
    dimensions: '38 cm × 6.5 cm × 8.2 cm',
    pieceCount: 5,
    inStock: true,
    featured: true,
    editorialTag: 'Artisan Heirloom',
    shortDescription: 'Turned by hand in the Bavarian foothills, this timeless locomotive glides smoothly with rolling solid brass wheels and rounded edges.',
    fullDescription: 'Every car in the Alpen Express is precision-turned from solid European beechwood harvested from sustainably managed forests. Natural beeswax polish protects the honeyed grain while allowing children to feel the organic texture of timber. Integrated magnetic couplings allow smooth assembly with all standard wooden rail tracks.',
    craftsmanshipNotes: 'Hand-sanded to 400-grit smoothness; dip-treated in organic linoleic wood oil and certified non-toxic plant wax.',
    safetyStandard: 'EN71-1, ASTM F963-17 & CE Compliant (No small swallowable detached parts)',
    interactiveFeature: {
      type: 'train',
      label: 'Whistle & Chug',
      actionPrompt: 'Sound Train Whistle',
      hint: 'Click to hear the acoustic steam whistle chime.'
    },
    reviews: [
      {
        id: 'rev-01',
        author: 'Eleanor Vance',
        city: 'Copenhagen, Denmark',
        rating: 5,
        date: 'October 12, 2025',
        comment: 'The weight of this wooden train is astonishing. My four-year-old hasn’t put it down for three weeks, and it looks like a sculpture on the living room shelf.',
        verified: true
      },
      {
        id: 'rev-02',
        author: 'Marcus Lindqvist',
        city: 'Stockholm, Sweden',
        rating: 5,
        date: 'December 2, 2025',
        comment: 'Smooth magnetic links and zero plastic. Truly heirloom quality that will be passed down to grandchildren.',
        verified: true
      }
    ]
  },
  {
    id: 'music-box-02',
    name: 'Clockmaker’s Celestial Music Box',
    subtitle: 'Wind-up Brass Planetary Movement in Birch Inlay',
    category: 'musical',
    categoryLabel: 'Musical & Sound',
    ageRange: '6-8',
    ageRangeLabel: 'Ages 6+',
    price: 84.0,
    rating: 4.95,
    reviewsCount: 42,
    image: '/src/assets/images/toy_music_box_1791180771187.jpg',
    materials: 'Baltic Birch, Tempered Steel Comb, Cast Brass Pinion & Gears',
    dimensions: '14 cm × 11 cm × 9 cm',
    pieceCount: 1,
    inStock: true,
    featured: true,
    editorialTag: 'Limited Workshop Run',
    shortDescription: 'A hand-cranked mechanical music box revealing rotating brass escapements playing an 18-note lullaby.',
    fullDescription: 'The Celestial Music Box celebrates the romantic age of mechanical clockwork. Under a crystal-clear acrylic viewing vault, young curious minds can observe how winding the brass barrel transfers torque through calibrated reduction gears to the tuned steel comb, generating resonant acoustic vibrations.',
    craftsmanshipNotes: '18-note tuned Japanese movement encased in a hand-dovetailed birch resonant soundbox.',
    safetyStandard: 'Safety-shielded gear enclosure; finger-pinch safe spring governor.',
    interactiveFeature: {
      type: 'music_box',
      label: 'Wind Up Box',
      actionPrompt: 'Wind Mechanism',
      hint: 'Crank the spring to play the acoustic music box arpeggio.'
    },
    reviews: [
      {
        id: 'rev-03',
        author: 'Julian Thorne',
        city: 'Edinburgh, UK',
        rating: 5,
        date: 'January 14, 2026',
        comment: 'Mesmerizing to watch the gears turn. The tone is clear and soothing, not tinny like mass-produced toys.',
        verified: true
      }
    ]
  },
  {
    id: 'plush-bear-03',
    name: 'Barnaby the Atelier Hearth Bear',
    subtitle: 'Hand-Stitched Organic Alpaca & Merino Companion',
    category: 'plush',
    categoryLabel: 'Gentle Companions',
    ageRange: '0-2',
    ageRangeLabel: 'All Ages (0+)',
    price: 54.0,
    rating: 4.88,
    reviewsCount: 56,
    image: '/src/assets/images/toy_plush_bear_1791180781581.jpg',
    materials: '100% GOTS Organic Cotton Sherpa, Recycled Wool Fill, Hand-Embroidered Features',
    dimensions: '32 cm Height',
    pieceCount: 1,
    inStock: true,
    featured: true,
    editorialTag: 'Newborn Safe',
    shortDescription: 'Gentle, hypoallergenic bear crafted with vegetable-dyed wool yarns and an extra-soft huggable posture.',
    fullDescription: 'Designed without hard plastic safety eyes or button parts, Barnaby features completely hand-embroidered facial expressions created with unbleached silk floss. Filled with clean organic carded sheep wool that naturally holds warmth and familiar scent, making it an enduring bedtime confidant.',
    craftsmanshipNotes: 'Stitched by women artisans cooperative using double-lock French seams for lasting cuddles.',
    safetyStandard: 'GOTS Organic Certified, OEKO-TEX Standard 100 Class I (safe for infant mouth contact).',
    interactiveFeature: {
      type: 'plush',
      label: 'Gentle Hug',
      actionPrompt: 'Give Barnaby a Squeeze',
      hint: 'Click to hear the soft plush chirping squeak.'
    },
    reviews: [
      {
        id: 'rev-04',
        author: 'Astrid Olsen',
        city: 'Bergen, Norway',
        rating: 5,
        date: 'February 20, 2026',
        comment: 'So soft and comforting. We gave it as a christening gift and it has become the baby’s favorite object in the crib.',
        verified: true
      }
    ]
  },
  {
    id: 'solar-rover-04',
    name: 'Helios Solar Explorer Rover',
    subtitle: 'Modular Timber STEAM Kit with Monocrystalline Cell',
    category: 'steam',
    categoryLabel: 'STEAM & Discovery',
    ageRange: '6-8',
    ageRangeLabel: 'Ages 7–12',
    price: 62.0,
    rating: 4.92,
    reviewsCount: 31,
    image: '/src/assets/images/toy_solar_rover_1791180792790.jpg',
    materials: 'Laser-Cut Aircraft Birch Ply, Brass Bushings, High-Efficiency Photovoltaic Panel',
    dimensions: '22 cm × 14 cm × 11 cm',
    pieceCount: 64,
    inStock: true,
    featured: true,
    editorialTag: 'STEM Certified',
    shortDescription: 'Build a working 4-wheel rover powered purely by sunlight or room lamps. No soldering or batteries required.',
    fullDescription: 'The Helios Explorer teaches children clean energy mechanics through tactile assembly. Includes friction-fit wooden chassis components, brass axle mounts, differential steering pulleys, and an adjustable solar tilt cradle. Children observe immediate cause-and-effect as changing lighting conditions accelerate or steer the rover.',
    craftsmanshipNotes: 'Precision 0.1mm laser-cut joints with snap-fit interlocking tolerances.',
    safetyStandard: 'Low-voltage (1.5V DC maximum), safe for child assembly without tools.',
    interactiveFeature: {
      type: 'gears',
      label: 'Engage Motor',
      actionPrompt: 'Spin Solar Pulley',
      hint: 'Test the motor and watch the gears mesh.'
    },
    reviews: [
      {
        id: 'rev-05',
        author: 'Dr. Aaron Meyer',
        city: 'Zurich, Switzerland',
        rating: 5,
        date: 'March 8, 2026',
        comment: 'Superb pedagogical kit. The instructions are illustrated like a renaissance manuscript and it runs vigorously under direct sunlight.',
        verified: true
      }
    ]
  },
  {
    id: 'wooden-blocks-05',
    name: 'Architect’s Cathedral Block Set',
    subtitle: '54 Master Building Units with Roman Arches & Columns',
    category: 'wooden',
    categoryLabel: 'Handcrafted Wooden',
    ageRange: '3-5',
    ageRangeLabel: 'Ages 3–10',
    price: 76.0,
    originalPrice: 88.0,
    rating: 4.94,
    reviewsCount: 29,
    image: '/src/assets/images/hero_toy_atelier_1791180746147.jpg',
    materials: 'Solid Hard Maple, Smoked Walnut Accents, Solid Beech Wooden Tray',
    dimensions: '32 cm × 32 cm × 5 cm Tray',
    pieceCount: 54,
    inStock: true,
    featured: false,
    editorialTag: 'Enduring Classic',
    shortDescription: 'Balanced architectural shapes inspired by classical arches, spires, and keystone lintels for open-ended structural play.',
    fullDescription: 'Based on Friedrich Froebel’s foundational kindergarten play gifts, this master block set features mathematically proportionate unit blocks. Every face is milled to exact 25mm unit increments so towers and bridges balance with structural stability.',
    craftsmanshipNotes: 'Unfinished silky tactile maple with natural antimicrobial properties.',
    safetyStandard: 'Conforms to European Toy Safety Directive 2009/48/EC.',
    interactiveFeature: {
      type: 'xylophone',
      label: 'Stack & Tap',
      actionPrompt: 'Tap Wooden Blocks',
      hint: 'Hear the crisp resonance of hard maple wood blocks.'
    },
    reviews: [
      {
        id: 'rev-06',
        author: 'Clara Dubois',
        city: 'Lyon, France',
        rating: 5,
        date: 'January 28, 2026',
        comment: 'The tactile feeling of real untreated hardwood cannot be beaten. My kids build elaborate castles every single afternoon.',
        verified: true
      }
    ]
  },
  {
    id: 'puzzle-geo-06',
    name: 'Kandinsky Tangram Mosaic Prism',
    subtitle: 'Magnetic Geometric Color Theory Puzzle',
    category: 'puzzles',
    categoryLabel: 'Puzzles & Logic',
    ageRange: '6-8',
    ageRangeLabel: 'Ages 5–12',
    price: 46.0,
    rating: 4.86,
    reviewsCount: 19,
    image: '/src/assets/images/toy_music_box_1791180771187.jpg',
    materials: 'Sycamore Wood, Natural Mineral Pigments, Powder-Coated Steel Display Easel',
    dimensions: '24 cm × 24 cm Frame',
    pieceCount: 36,
    inStock: true,
    featured: false,
    editorialTag: 'Design Award',
    shortDescription: 'Explore geometry, optical balance, and chromatic harmony with magnetic precision-cut polygons in a desktop display frame.',
    fullDescription: 'A modern evolution of the ancient Chinese tangram, the Mosaic Prism introduces children to color gradations and spatial symmetry. Pieces are dyed using traditional water-soluble vegetable stains that let the natural wood grain show through.',
    craftsmanshipNotes: 'Hand-beveled edges allow effortless lifting and flipping.',
    safetyStandard: 'EN71-3 Heavy Metals migration certified non-hazardous.',
    interactiveFeature: {
      type: 'chime',
      label: 'Tune Puzzle',
      actionPrompt: 'Harmonize Prism',
      hint: 'Click to trigger resonant chord notes.'
    },
    reviews: [
      {
        id: 'rev-07',
        author: 'Soren Kirk',
        city: 'Aarhus, Denmark',
        rating: 5,
        date: 'March 18, 2026',
        comment: 'Even as an adult designer, I find myself arranging this on my desk during phone calls. Exquisite balance.',
        verified: true
      }
    ]
  },
  {
    id: 'steam-astrolabe-07',
    name: 'Stargazer Brass Optical Sextant',
    subtitle: 'Working Brass & Ash Celestial Navigation Instrument',
    category: 'steam',
    categoryLabel: 'STEAM & Discovery',
    ageRange: '9+',
    ageRangeLabel: 'Ages 9–14',
    price: 89.0,
    originalPrice: 98.0,
    rating: 4.97,
    reviewsCount: 24,
    image: '/src/assets/images/toy_solar_rover_1791180792790.jpg',
    materials: 'Aged Brass Vernier, European Ashwood Handle, Convex Glass Lenses',
    dimensions: '20 cm × 18 cm × 6 cm',
    pieceCount: 3,
    inStock: true,
    featured: false,
    editorialTag: 'Explorer Series',
    shortDescription: 'A functional, kid-safe optical instrument with calibrated vernier scale for measuring star angles and horizon altitudes.',
    fullDescription: 'Introduce young adventurers to real navigation science before GPS existed. Features dual mirror ray paths, index arm with thumb lock, and an illustrated sky chart booklet detailing how maritime explorers traversed uncharted oceans.',
    craftsmanshipNotes: 'Solid cast brass treated with an antique patina finish.',
    safetyStandard: 'Shatter-resistant tempered optics; rounded safety pivot points.',
    interactiveFeature: {
      type: 'gears',
      label: 'Calibrate Vernier',
      actionPrompt: 'Rotate Index Dial',
      hint: 'Rotate the optical gear assembly.'
    },
    reviews: [
      {
        id: 'rev-08',
        author: 'Matteo Rossi',
        city: 'Florence, Italy',
        rating: 5,
        date: 'February 11, 2026',
        comment: 'Astonishing optical clarity. We took it camping in the Dolomites and measured the elevation of the North Star together.',
        verified: true
      }
    ]
  },
  {
    id: 'musical-glockenspiel-08',
    name: 'Sonata Pentatonic Wood Chime Box',
    subtitle: 'Acoustic Maple Tonebars Tuned to 432 Hz',
    category: 'musical',
    categoryLabel: 'Musical & Sound',
    ageRange: '0-2',
    ageRangeLabel: 'Ages 1–5',
    price: 58.0,
    rating: 4.91,
    reviewsCount: 33,
    image: '/src/assets/images/toy_wooden_train_1791180760328.jpg',
    materials: 'Air-Dried Mountain Maple, Felt Mallets, Natural Beeswax Finish',
    dimensions: '28 cm × 16 cm × 7 cm',
    pieceCount: 3,
    inStock: true,
    featured: false,
    editorialTag: 'Waldorf Inspired',
    shortDescription: 'Tuned strictly to the pentatonic scale so every combination of strikes creates sweet, harmonious melodies with zero discord.',
    fullDescription: 'The pentatonic scale is universally recognized in early childhood pedagogy because no two notes clash. Toddlers and young children can explore rhythm, volume, and resonance freely without discordant intervals, building innate acoustic confidence.',
    craftsmanshipNotes: 'Acoustically tuned with stroboscopic precision by master instrument tuners.',
    safetyStandard: 'Felt mallet head securely bonded with non-toxic timber dowel.',
    interactiveFeature: {
      type: 'xylophone',
      label: 'Play Chimes',
      actionPrompt: 'Strike Tonebar',
      hint: 'Click to play tuned pentatonic chimes.'
    },
    reviews: [
      {
        id: 'rev-09',
        author: 'Lina Weber',
        city: 'Munich, Germany',
        rating: 5,
        date: 'March 25, 2026',
        comment: 'A true relief for parents’ ears! It sounds like gentle rain or a wind chime rather than abrasive noise.',
        verified: true
      }
    ]
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'All Collections' },
  { id: 'wooden', label: 'Handcrafted Wooden' },
  { id: 'steam', label: 'STEAM & Discovery' },
  { id: 'musical', label: 'Musical & Sound' },
  { id: 'plush', label: 'Gentle Companions' },
  { id: 'puzzles', label: 'Puzzles & Logic' }
] as const;

export const AGE_RANGES = [
  { id: 'all', label: 'All Ages' },
  { id: '0-2', label: 'Ages 0–2 (Infant & Toddler)' },
  { id: '3-5', label: 'Ages 3–5 (Early Explorer)' },
  { id: '6-8', label: 'Ages 6–8 (Curious Builder)' },
  { id: '9+', label: 'Ages 9+ (Junior Scientist)' }
] as const;
