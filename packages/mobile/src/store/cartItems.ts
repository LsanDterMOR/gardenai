import create from "zustand";

interface Item {
  name: string;
  code: string;
  quantity: number;
}

interface CartItemsState {
  items: Item[];
  quantity: Item["quantity"];
  setCartItems: (newItems: Item[]) => void;
  setPlantQuantity: (newQuantity: number) => void;
}

export const useCartItem = create<CartItemsState>()((set) => ({
  items: [],
  quantity: 0,
  setCartItems: (newItems) => set({ items: newItems }),
  setPlantQuantity(newQuantity) {
    set({ quantity: newQuantity });
  },
}));
