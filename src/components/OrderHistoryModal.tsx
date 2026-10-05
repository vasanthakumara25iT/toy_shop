import React from 'react';
import { X, Package, Clock, CheckCircle2, Truck, ArrowRight } from 'lucide-react';
import { Order } from '../types';
import { sound } from '../utils/audio';

interface OrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onExploreCatalog: () => void;
}

export const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({
  isOpen,
  onClose,
  orders,
  onExploreCatalog,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-history-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200 bg-[#FAF8F5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-amber-700" />
            <h2 id="order-history-title" className="font-serif text-lg font-bold text-stone-900">
              Your Atelier Orders & Dispatches
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close orders"
            className="p-1.5 text-stone-400 hover:text-stone-800 rounded-lg hover:bg-stone-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto">
                <Package className="w-6 h-6" />
              </div>
              <p className="font-serif text-base font-bold text-stone-900">
                No orders placed yet
              </p>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Once you select an heirloom train, music box, or plush companion, your package tracking and wax-sealed certificate will appear here.
              </p>
              <button
                onClick={() => {
                  sound.playChime(659.25, 0.2);
                  onClose();
                  onExploreCatalog();
                }}
                className="bg-[#1C2723] hover:bg-[#273832] text-stone-100 text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                Browse Heirloom Collection
              </button>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="border border-stone-200 rounded-xl p-4 bg-stone-50/50 space-y-3"
              >
                {/* Order Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-stone-200/80 text-xs">
                  <div>
                    <span className="font-bold font-mono text-stone-900">
                      {order.orderNumber}
                    </span>
                    <span className="text-stone-400 mx-2">·</span>
                    <span className="text-stone-500">{order.date}</span>
                  </div>

                  <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200 text-[11px]">
                    <Clock className="w-3 h-3" />
                    <span>{order.status}</span>
                  </div>
                </div>

                {/* Items in this order */}
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="w-8 h-8 rounded object-cover border border-stone-200"
                        />
                        <div>
                          <span className="font-medium text-stone-900">{item.product.name}</span>
                          <span className="text-stone-500 text-[11px] ml-1.5 font-mono">
                            × {item.quantity}
                          </span>
                        </div>
                      </div>
                      <span className="font-mono tabular-nums font-semibold text-stone-800">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Order Footer & Tracking */}
                <div className="pt-2 border-t border-stone-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="text-[11px] text-stone-500">
                    Dispatched to: <strong>{order.customer.fullName}</strong> ({order.customer.city})
                  </div>
                  <div className="font-bold text-stone-900 font-mono">
                    Total: ${order.total.toFixed(2)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
