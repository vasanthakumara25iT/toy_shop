export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface InteractivePlayFeature {
  type: 'music_box' | 'chime' | 'train' | 'plush' | 'gears' | 'xylophone';
  label: string;
  actionPrompt: string;
  hint: string;
}

export interface ToyProduct {
  id: string;
  name: string;
  subtitle: string;
  category: 'wooden' | 'steam' | 'plush' | 'puzzles' | 'musical' | 'creative';
  categoryLabel: string;
  ageRange: '0-2' | '3-5' | '6-8' | '9+';
  ageRangeLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  materials: string;
  dimensions: string;
  pieceCount?: number;
  inStock: boolean;
  featured?: boolean;
  editorialTag?: string; // Subtle unboxed tag (e.g. "Artisan Heirloom", "Master Carver Choice")
  shortDescription: string;
  fullDescription: string;
  craftsmanshipNotes: string;
  safetyStandard: string;
  interactiveFeature: InteractivePlayFeature;
  reviews: Review[];
}

export interface CartItem {
  product: ToyProduct;
  quantity: number;
  giftWrap: boolean;
  giftMessage?: string;
}

export interface OrderCustomer {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  paymentMethod: 'card' | 'cod' | 'digital';
  giftNote?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  giftWrapFee: number;
  shippingFee: number;
  total: number;
  customer: OrderCustomer;
  status: 'In Atelier Workshop' | 'Hand-Inspected & Packed' | 'Dispatched' | 'Delivered';
  estimatedDelivery: string;
}
