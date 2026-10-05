import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Truck,
  CreditCard,
  Banknote,
  Sparkles,
  ArrowRight,
  Package,
  Printer
} from 'lucide-react';
import { CartItem, Order, OrderCustomer } from '../types';
import { sound } from '../utils/audio';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
}) => {
  const [step, setStep] = useState<'details' | 'success'>('details');
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  // Form State
  const [fullName, setFullName] = useState('Helena Lind');
  const [email, setEmail] = useState('helena.lind@example.com');
  const [phone, setPhone] = useState('+49 89 2442 819');
  const [street, setStreet] = useState('Maximilianstraße 42');
  const [city, setCity] = useState('Munich');
  const [postalCode, setPostalCode] = useState('80539');
  const [country, setCountry] = useState('Germany');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod' | 'digital'>('card');
  const [giftNote, setGiftNote] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const giftWrapFee = items.reduce(
    (sum, item) => sum + (item.giftWrap ? 4.5 * item.quantity : 0),
    0
  );
  const shippingFee = subtotal >= 50 ? 0 : 4.90;
  const grandTotal = subtotal + giftWrapFee + shippingFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!fullName.trim()) errors.fullName = 'Full name is required';
    if (!email.trim() || !email.includes('@')) errors.email = 'Valid email is required';
    if (!street.trim()) errors.street = 'Street address is required';
    if (!city.trim()) errors.city = 'City is required';
    if (!postalCode.trim()) errors.postalCode = 'Postal code is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const orderNumber = `WH-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      items: [...items],
      subtotal,
      giftWrapFee,
      shippingFee,
      total: grandTotal,
      customer: {
        fullName,
        email,
        phone,
        street,
        city,
        postalCode,
        country,
        paymentMethod,
        giftNote: giftNote.trim() || undefined,
      },
      status: 'In Atelier Workshop',
      estimatedDelivery: '3–5 Business Days (Inspected & Wax-Sealed)',
    };

    sound.playMusicBoxMelody();
    setCreatedOrder(newOrder);
    onOrderSuccess(newOrder);
    setStep('success');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-stone-200 bg-[#FAF8F5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-display text-lg font-bold text-stone-900">Wonderhaus</span>
            <span className="text-stone-300">/</span>
            <h2 id="checkout-modal-title" className="text-sm font-semibold text-stone-700">
              {step === 'details' ? 'Atelier Dispatch & Checkout' : 'Order Confirmed'}
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close checkout"
            className="p-1.5 text-stone-400 hover:text-stone-800 rounded-lg hover:bg-stone-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        {step === 'details' ? (
          <form onSubmit={handlePlaceOrder} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Delivery Details */}
            <div className="space-y-4">
              <h3 className="font-serif text-base font-bold text-stone-900 flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-700" />
                <span>Recipient & Shipping Address</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded-lg outline-none focus:border-stone-900 focus:bg-white text-stone-900"
                    placeholder="e.g. Helena Lind"
                  />
                  {formErrors.fullName && (
                    <p className="text-[11px] text-red-600 mt-0.5">{formErrors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded-lg outline-none focus:border-stone-900 focus:bg-white text-stone-900"
                    placeholder="helena@example.com"
                  />
                  {formErrors.email && (
                    <p className="text-[11px] text-red-600 mt-0.5">{formErrors.email}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded-lg outline-none focus:border-stone-900 focus:bg-white text-stone-900"
                    placeholder="e.g. Maximilianstraße 42, Apt 3B"
                  />
                  {formErrors.street && (
                    <p className="text-[11px] text-red-600 mt-0.5">{formErrors.street}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded-lg outline-none focus:border-stone-900 focus:bg-white text-stone-900"
                    placeholder="Munich"
                  />
                  {formErrors.city && (
                    <p className="text-[11px] text-red-600 mt-0.5">{formErrors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded-lg outline-none focus:border-stone-900 focus:bg-white text-stone-900"
                    placeholder="80539"
                  />
                  {formErrors.postalCode && (
                    <p className="text-[11px] text-red-600 mt-0.5">{formErrors.postalCode}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Phone for Courier Updates
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded-lg outline-none focus:border-stone-900 focus:bg-white text-stone-900"
                    placeholder="+49 89 2442 819"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-3 pt-3 border-t border-stone-200">
              <h3 className="font-serif text-base font-bold text-stone-900 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-amber-700" />
                <span>Payment Preference</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <label
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition-colors ${
                    paymentMethod === 'card'
                      ? 'border-stone-900 bg-stone-50/80 shadow-2xs'
                      : 'border-stone-200 bg-white hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-900">Credit / Debit</span>
                    <input
                      type="radio"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="accent-stone-900"
                    />
                  </div>
                  <span className="text-[11px] text-stone-500 mt-1">
                    Visa, Mastercard, Amex
                  </span>
                </label>

                <label
                  onClick={() => setPaymentMethod('digital')}
                  className={`p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition-colors ${
                    paymentMethod === 'digital'
                      ? 'border-stone-900 bg-stone-50/80 shadow-2xs'
                      : 'border-stone-200 bg-white hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-900">Apple Pay / Pay</span>
                    <input
                      type="radio"
                      checked={paymentMethod === 'digital'}
                      onChange={() => setPaymentMethod('digital')}
                      className="accent-stone-900"
                    />
                  </div>
                  <span className="text-[11px] text-stone-500 mt-1">
                    Instant 1-Click Pay
                  </span>
                </label>

                <label
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition-colors ${
                    paymentMethod === 'cod'
                      ? 'border-stone-900 bg-stone-50/80 shadow-2xs'
                      : 'border-stone-200 bg-white hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-900">Cash on Delivery</span>
                    <input
                      type="radio"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-stone-900"
                    />
                  </div>
                  <span className="text-[11px] text-stone-500 mt-1">
                    Pay at your doorstep
                  </span>
                </label>
              </div>

              {paymentMethod === 'cod' && (
                <div className="p-3 bg-amber-50/60 border border-amber-200/70 rounded-lg text-xs text-amber-900 flex items-center gap-2">
                  <Banknote className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>
                    Cash on delivery is supported. Please have exact cash of <strong>${grandTotal.toFixed(2)}</strong> ready at the time of delivery.
                  </span>
                </div>
              )}
            </div>

            {/* Order Summary Recap */}
            <div className="pt-3 border-t border-stone-200 space-y-2 text-xs text-stone-600 bg-stone-50 p-4 rounded-xl">
              <div className="flex justify-between">
                <span>Items ({items.length})</span>
                <span className="font-mono tabular-nums font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              {giftWrapFee > 0 && (
                <div className="flex justify-between text-amber-800">
                  <span>Gift Wrapping & Message</span>
                  <span className="font-mono tabular-nums font-semibold">${giftWrapFee.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Carbon-Neutral Delivery</span>
                <span className="font-mono tabular-nums font-semibold">
                  {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="pt-2 border-t border-stone-200 flex justify-between text-sm font-bold text-stone-900">
                <span>Total Due</span>
                <span className="font-mono tabular-nums text-base">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#1C2723] hover:bg-[#273832] text-stone-100 py-3.5 px-6 rounded-lg text-sm font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <span>Confirm & Place Order · ${grandTotal.toFixed(2)}</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </form>
        ) : (
          /* Step 2: Order Receipt & Tracking Confirmation */
          <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Your heirloom package is being crafted!
              </h3>
              <p className="text-xs text-stone-600 max-w-md mx-auto">
                Thank you, {createdOrder?.customer.fullName}. Order{' '}
                <strong className="font-mono text-stone-900 font-bold">{createdOrder?.orderNumber}</strong> has been received by our Bavarian atelier.
              </p>
            </div>

            {/* Status Steps */}
            <div className="p-4 bg-stone-50 border border-stone-200/80 rounded-xl space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-stone-900">Fulfillment Status</span>
                <span className="text-emerald-800 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {createdOrder?.status}
                </span>
              </div>
              <p className="text-[11px] text-stone-500">
                Estimated Delivery: <strong>{createdOrder?.estimatedDelivery}</strong>
              </p>
            </div>

            {/* Itemized Receipt Table */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Itemized Receipt
              </h4>
              <div className="divide-y divide-stone-100 border border-stone-200 rounded-xl overflow-hidden">
                {createdOrder?.items.map((it) => (
                  <div key={it.product.id} className="p-3 bg-white flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-stone-900">{it.product.name}</div>
                      <div className="text-[11px] text-stone-500">Qty: {it.quantity} {it.giftWrap ? '· Gift Wrapped' : ''}</div>
                    </div>
                    <span className="font-mono tabular-nums font-bold text-stone-900">
                      ${(it.product.price * it.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="p-3 bg-stone-50 flex items-center justify-between text-xs font-bold text-stone-900">
                  <span>Grand Total</span>
                  <span className="font-mono tabular-nums text-sm">${createdOrder?.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Delivery address details */}
            <div className="text-xs text-stone-600 space-y-1 bg-stone-50 p-3.5 rounded-xl border border-stone-200/60">
              <span className="font-semibold text-stone-900">Dispatched to:</span>
              <p>{createdOrder?.customer.street}, {createdOrder?.customer.city}, {createdOrder?.customer.postalCode}</p>
              <p className="text-stone-500">Confirmation sent to: {createdOrder?.customer.email}</p>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="flex-1 inline-flex items-center justify-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold py-3 px-4 rounded-lg cursor-pointer transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print Invoice</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-[#1C2723] hover:bg-[#273832] text-stone-100 text-xs font-semibold py-3 px-4 rounded-lg cursor-pointer transition-colors"
              >
                Back to Toy Shop
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
