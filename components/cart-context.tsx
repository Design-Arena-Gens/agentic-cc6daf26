'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import type { ReactNode } from "react";
import type { Product } from "@/lib/products";

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
};

type CartAction =
  | { type: "ADD"; payload: Product }
  | { type: "REMOVE"; payload: { id: string } }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR" }
  | { type: "TOGGLE" }
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "HYDRATE"; payload: CartItem[] };

type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  cartCount: number;
  total: number;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
};

const initialState: CartState = {
  items: [],
  isOpen: false
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find((item) => item.product.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          isOpen: true,
          items: state.items.map((item) =>
            item.product.id === action.payload.id
              ? { ...item, quantity: Math.min(item.quantity + 1, 9) }
              : item
          )
        };
      }
      return {
        ...state,
        isOpen: true,
        items: [...state.items, { product: action.payload, quantity: 1 }]
      };
    }
    case "REMOVE":
      return {
        ...state,
        items: state.items.filter((item) => item.product.id !== action.payload.id)
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.product.id === action.payload.id
              ? { ...item, quantity: Math.max(1, Math.min(action.payload.quantity, 9)) }
              : item
          )
          .filter((item) => item.quantity > 0)
      };
    case "CLEAR":
      return { ...state, items: [] };
    case "TOGGLE":
      return { ...state, isOpen: !state.isOpen };
    case "OPEN":
      return { ...state, isOpen: true };
    case "CLOSE":
      return { ...state, isOpen: false };
    case "HYDRATE":
      return { ...state, items: action.payload };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("agentic-cart");
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[];
        if (Array.isArray(parsed)) {
          dispatch({ type: "HYDRATE", payload: parsed });
        }
      }
    } catch (error) {
      console.error("فشل تحميل السلة", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("agentic-cart", JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = useCallback((product: Product) => dispatch({ type: "ADD", payload: product }), []);
  const removeFromCart = useCallback((id: string) => dispatch({ type: "REMOVE", payload: { id } }), []);
  const updateQuantity = useCallback(
    (id: string, quantity: number) => dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } }),
    []
  );
  const clearCart = useCallback(() => dispatch({ type: "CLEAR" }), []);
  const toggleCart = useCallback(() => dispatch({ type: "TOGGLE" }), []);
  const openCart = useCallback(() => dispatch({ type: "OPEN" }), []);
  const closeCart = useCallback(() => dispatch({ type: "CLOSE" }), []);

  const cartCount = useMemo(
    () => state.items.reduce((total, item) => total + item.quantity, 0),
    [state.items]
  );
  const total = useMemo(
    () => state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [state.items]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items: state.items,
      isOpen: state.isOpen,
      cartCount,
      total,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleCart,
      openCart,
      closeCart
    }),
    [state.items, state.isOpen, cartCount, total, addToCart, removeFromCart, updateQuantity, clearCart, toggleCart, openCart, closeCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart يجب أن يُستخدم داخل CartProvider");
  }
  return context;
}
