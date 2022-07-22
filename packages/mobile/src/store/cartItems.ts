import create from "zustand";

interface Item {
  name: string;
  code: string;
}

interface CartItemsState {
  items: Item[];
  setCartItems: (newItems: Item[]) => void;
}

export const useCartItem = create<CartItemsState>()((set) => ({
  items: [],
  setCartItems: (newItems) => set({ items: newItems }),
}));
